import { ReactNode, useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { DEFAULT_AVATAR_ID } from '../assets/characters';
import splashPoster from '../assets/casual_ui/splashrep1.png';
import { useProgressionStore } from '../store/useProgressionStore';
import type { PlayerData } from '../types';
import { createDefaultPlayer, PLAYER_STORAGE_KEY } from './usePlayerProgression';
import { EnglishSaveContext } from './EnglishSaveContext';

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
const supabase = url && key && /^https?:\/\//.test(url) ? createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
}) : null;

type ProgressionSnapshot = Pick<ReturnType<typeof useProgressionStore.getState>, 'player' | 'levels' | 'totalStars'>;
type Snapshot = { player: PlayerData; progression: ProgressionSnapshot };
type Attempt = Snapshot & { requestId: string };
type Outbox = { revision: number; attempt: Attempt | null; latest: Snapshot | null };
type SaveRow = { player: Partial<PlayerData>; progression: Partial<ProgressionSnapshot>; revision: number; last_request_id: string | null };
type Child = { id: string; nickname: string };
type Gate = { kind: 'loading' | 'login' | 'subscription' | 'profile' | 'error' | 'conflict'; message?: string; childId?: string }
  | { kind: 'ready'; child: Child; saved: SaveRow | null; outbox: Outbox | null };

const outboxKey = (childId: string) => `legends-outbox:${childId}:english`;
const readOutbox = (childId: string): Outbox | null => {
  try { return JSON.parse(localStorage.getItem(outboxKey(childId)) || 'null'); } catch { return null; }
};

function GateMessage({ title, message, children }: { title: string; message?: string; children?: ReactNode }) {
  const clipId = useId();
  return <main className="english-access-gate">
    <section className="english-access-card" aria-labelledby="english-access-title">
      <a className="english-access-brand" href="/" aria-label="SATs Legends home">
        <svg viewBox="138 198 742 448" aria-hidden="true" focusable="false">
          <defs><clipPath id={clipId} clipPathUnits="userSpaceOnUse"><path d="M510 202 L551 240 Q615 243 667 264 Q713 247 746 268 Q779 280 772 309 L758 372 L818 380 L815 389 L866 398 Q874 400 870 408 L835 467 L870 540 Q874 549 862 551 L787 548 Q801 566 776 578 L732 570 L610 566 L509 636 L415 564 L254 574 Q228 584 220 561 L219 548 L159 552 Q144 550 147 539 L181 469 L151 411 Q146 400 158 397 L204 388 L208 380 L254 372 Q244 341 249 312 Q246 292 271 274 Q303 252 354 258 L466 240 Z" /></clipPath></defs>
          <image href={splashPoster} width="1024" height="1536" clipPath={`url(#${clipId})`} />
        </svg>
      </a>
      <p className="english-access-eyebrow">English adventure <span aria-hidden="true">✦</span> Lexcoria</p>
      <h1 id="english-access-title">{title}</h1>
      {message && <p className="english-access-message" role="status">{message}</p>}
      {children && <div className="english-access-actions">{children}</div>}
      <a className="english-access-return" href="/">← Back to SATs Legends</a>
    </section>
  </main>;
}

export default function EnglishAccessGate({ children }: { children: ReactNode }) {
  const [gate, setGate] = useState<Gate>({ kind: 'loading' });
  const generation = useRef(0);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    const request = ++generation.current;
    const load = async () => {
      setGate({ kind: 'loading' });
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (!alive || request !== generation.current) return;
        if (sessionError) throw sessionError;
        if (!session) { setGate({ kind: 'login' }); return; }
        const [access, profiles] = await Promise.all([
          supabase.rpc('has_game_access', { product: 'english' }),
          supabase.from('child_profiles').select('id,nickname').order('created_at'),
        ]);
        if (!alive || request !== generation.current) return;
        if (access.error || profiles.error) throw new Error('Unable to check your family account. Please try again.');
        if (access.data !== true) { setGate({ kind: 'subscription' }); return; }
        const selectedId = sessionStorage.getItem(`legends-child:${session.user.id}`);
        const child = profiles.data.find(profile => profile.id === selectedId) ?? (profiles.data.length === 1 ? profiles.data[0] : null);
        if (!child) { setGate({ kind: 'profile' }); return; }
        const result = await supabase.from('child_progress').select('player,progression,revision,last_request_id')
          .eq('child_id', child.id).eq('product_code', 'english').maybeSingle();
        if (!alive || request !== generation.current) return;
        if (result.error) throw new Error('Unable to load English progress. Please try again.');
        const saved = result.data as SaveRow | null;
        const outbox = readOutbox(child.id);
        if (outbox?.attempt?.requestId === saved?.last_request_id) {
          outbox.attempt = null;
          outbox.revision = saved.revision;
          if (!outbox.latest) localStorage.removeItem(outboxKey(child.id));
        }
        if (outbox && outbox.revision !== Number(saved?.revision ?? 0)) {
          setGate({ kind: 'conflict', childId: child.id, message: 'This device has unsaved changes, but another device saved a newer version.' });
          return;
        }
        setGate({ kind: 'ready', child, saved, outbox });
      } catch (caught) {
        if (alive && request === generation.current) setGate({ kind: 'error', message: caught instanceof Error ? caught.message : 'Unable to open Lexcoria.' });
      }
    };
    void load();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') setGate({ kind: 'login' });
    });
    return () => { alive = false; generation.current++; subscription.unsubscribe(); };
  }, [reload]);

  useEffect(() => {
    if (!supabase || gate.kind !== 'ready') return;
    const check = window.setInterval(async () => {
      const result = await supabase.rpc('has_game_access', { product: 'english' });
      if (result.data !== true) setGate({ kind: result.error ? 'error' : 'subscription', message: result.error ? 'Unable to verify your subscription.' : undefined });
    }, 300000);
    return () => window.clearInterval(check);
  }, [gate.kind]);

  if (!supabase) {
    if (import.meta.env.DEV || import.meta.env.VITE_ALLOW_GAME_PREVIEW === 'true') return children;
    return <GateMessage title="Lexcoria is being connected" message="Parent accounts and subscriptions are not configured for this release yet."><a href="/subscriptions?product=english">Explore English plans</a></GateMessage>;
  }
  if (gate.kind === 'loading') return <GateMessage title="Opening Lexcoria…" message="Checking your family account and saved progress." />;
  if (gate.kind === 'login') return <GateMessage title="Parent login needed" message="Log in to the parent account that holds your English subscription."><a href="/login?next=/parent">Log in</a></GateMessage>;
  if (gate.kind === 'subscription') return <GateMessage title="Choose your English adventure" message="Lexcoria is included with an English or combined subscription."><a href="/subscriptions?product=english">See plans</a></GateMessage>;
  if (gate.kind === 'profile') return <GateMessage title="Choose a child profile" message="Select or create your child’s profile in the parent account first."><a href="/parent">Open parent account</a></GateMessage>;
  if (gate.kind === 'error') return <GateMessage title="Let’s reconnect" message={gate.message}><button onClick={() => setReload(value => value + 1)}>Try again</button></GateMessage>;
  if (gate.kind === 'conflict') return <GateMessage title="Progress changed on another device" message={gate.message}><button onClick={() => { if (gate.childId) localStorage.removeItem(outboxKey(gate.childId)); setReload(value => value + 1); }}>Use latest cloud save</button></GateMessage>;
  return <SavedEnglishGame child={gate.child} saved={gate.saved} pending={gate.outbox}>{children}</SavedEnglishGame>;
}

function SavedEnglishGame({ child, saved, pending, children }: { child: Child; saved: SaveRow | null; pending: Outbox | null; children: ReactNode }) {
  const initial = pending?.latest ?? pending?.attempt;
  const initialPlayer = useRef(createDefaultPlayer({ ...(initial?.player ?? saved?.player), playerName: child.nickname }));
  const initialProgression = useRef(initial?.progression ?? saved?.progression);
  const outbox = useRef<Outbox>(pending ?? { revision: Number(saved?.revision ?? 0), attempt: null, latest: null });
  const saveTimer = useRef<number | null>(null);
  const inFlight = useRef(false);
  const blocked = useRef(false);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState(pending ? 'Syncing progress…' : 'Progress saved');

  const cache = useCallback(() => {
    try {
      if (outbox.current.attempt || outbox.current.latest) localStorage.setItem(outboxKey(child.id), JSON.stringify(outbox.current));
      else localStorage.removeItem(outboxKey(child.id));
    } catch { setStatus('Device storage is full. Keep this page open while progress syncs.'); }
  }, [child.id]);

  const flush = useCallback(async () => {
    if (!supabase || inFlight.current || blocked.current || (!outbox.current.attempt && !outbox.current.latest)) return;
    inFlight.current = true;
    if (!outbox.current.attempt && outbox.current.latest) {
      outbox.current.attempt = { ...outbox.current.latest, requestId: crypto.randomUUID() };
      outbox.current.latest = null;
    }
    const sending = outbox.current.attempt!;
    cache(); setStatus('Saving progress…');
    try {
      const result = await supabase.rpc('save_child_progress', {
        target_child: child.id, game_code: 'english', expected_revision: outbox.current.revision,
        request_id: sending.requestId, player_data: sending.player, progression_data: sending.progression,
      });
      if (result.error) {
        if (result.error.message.includes('PROGRESS_CONFLICT')) {
          blocked.current = true;
          throw new Error('Another device saved progress. Reopen Lexcoria to choose the latest save.');
        }
        throw new Error('Saved on this device. Cloud sync will retry when connected.');
      }
      outbox.current.revision = Number(result.data);
      outbox.current.attempt = null;
      cache(); setStatus(outbox.current.latest ? 'Progress waiting to sync' : 'Progress saved');
    } catch (caught) { setStatus(caught instanceof Error ? caught.message : 'Unable to sync progress.'); }
    finally { inFlight.current = false; }
  }, [cache, child.id]);

  const queue = useCallback((player: PlayerData) => {
    const state = useProgressionStore.getState();
    outbox.current.latest = { player, progression: { player: state.player, levels: state.levels, totalStars: state.totalStars } };
    setStatus('Progress waiting to sync');
    cache();
    if (saveTimer.current !== null) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => { saveTimer.current = null; void flush(); }, 1200);
  }, [cache, flush]);
  const context = useMemo(() => ({ initialPlayer: initialPlayer.current, storageKey: `${PLAYER_STORAGE_KEY}:english:${child.id}`, queue }), [child.id, queue]);

  useLayoutEffect(() => {
    useProgressionStore.persist.setOptions({ name: `sats-legends-save:english:${child.id}` });
    const progression = initialProgression.current;
    useProgressionStore.setState({
      player: progression?.player ?? { avatarId: initialPlayer.current.avatarId || DEFAULT_AVATAR_ID, level: initialPlayer.current.level, currentXp: initialPlayer.current.xp, totalXpEarned: 0 },
      levels: progression?.levels ?? {}, totalStars: progression?.totalStars ?? 0,
    });
    setReady(true);
  }, [child.id]);

  useEffect(() => {
    const online = () => { void flush(); };
    const hidden = () => { if (document.visibilityState === 'hidden') void flush(); };
    window.addEventListener('online', online);
    document.addEventListener('visibilitychange', hidden);
    const first = window.setTimeout(() => void flush(), 1500);
    const retry = window.setInterval(() => void flush(), 30000);
    return () => { window.clearTimeout(first); window.clearInterval(retry); if (saveTimer.current !== null) window.clearTimeout(saveTimer.current); window.removeEventListener('online', online); document.removeEventListener('visibilitychange', hidden); void flush(); };
  }, [flush]);

  if (!ready) return <GateMessage title="Preparing your adventure…" />;
  return <EnglishSaveContext.Provider value={context}>{children}{status !== 'Progress saved' && <div className="english-save-status" role="status" aria-label={status} title={status}>{status === 'Saving progress…' ? 'Saving…' : 'Sync delayed'}</div>}</EnglishSaveContext.Provider>;
}
