import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle } from '../../utils/questionShuffle';
import { PUNCTUATION_PANIC_QUESTIONS, PunctuationSlot } from '../../systems/content/english/satsSpec';

type PunctuationPatrolGameProps = {
  levelId: number;
  avatarId: string;
  useSharedTopHud?: boolean;
  isPractice?: boolean;
  gameTitle?: string;
  onVictory: (stars: number, xpGained: number) => void;
  onGameOver: (xpGained: number) => void;
  onBack: () => void;
  sessionState?: GameplaySessionState;
  sessionEvents?: GameplaySessionEventHandlers;
};

const MAX_LIVES = 3;
const TOTAL_TIME = 120;

const starsForAccuracy = (correct: number, total: number, lives: number) => {
  const accuracy = total > 0 ? correct / total : 0;
  if (accuracy >= 0.9 && lives >= 2) return 3;
  if (accuracy >= 0.7) return 2;
  return 1;
};

const isSlot = (part: string | PunctuationSlot): part is PunctuationSlot => typeof part !== 'string';

const PunctuationPatrolGame: React.FC<PunctuationPatrolGameProps> = ({
  levelId: _levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const sessionQuestions = useMemo(() => shuffle(PUNCTUATION_PANIC_QUESTIONS), []);
  const maxEnemyHealth = Math.max(1, sessionQuestions.length);

  const [status, setStatus] = useState<'playing' | 'resolved' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [localLives, setLocalLives] = useState(MAX_LIVES);
  const [localTimeLeft, setLocalTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [enemyHealth, setEnemyHealth] = useState(maxEnemyHealth);

  const activeQuestion = sessionQuestions[Math.min(questionIndex, Math.max(0, sessionQuestions.length - 1))];
  const lives = sessionState?.lives ?? localLives;
  const timeLeft = sessionState?.timeLeft ?? localTimeLeft;

  const initialSlotState = useMemo(() => {
    const state: Record<string, string> = {};
    (activeQuestion?.parts ?? []).forEach((part) => {
      if (!isSlot(part)) return;
      state[part.id] = part.options[0] ?? '';
    });
    return state;
  }, [activeQuestion?.parts]);

  const [slotValues, setSlotValues] = useState<Record<string, string>>({});

  useEffect(() => {
    setSlotValues(initialSlotState);
  }, [initialSlotState]);

  useEffect(() => {
    if (sessionState) return;
    setLocalTimeLeft(TOTAL_TIME);
    const timerId = window.setInterval(() => {
      setLocalTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [sessionState]);

  useEffect(() => {
    if (sessionState) {
      if (sessionState.timeLeft <= 0 || sessionState.lives <= 0) {
        setStatus('gameover');
        emitMiniGameSessionEvent(sessionEvents, 'game_failed', {
          score,
          reason: sessionState.timeLeft <= 0 ? 'time' : 'lives',
          metadata: { questionId: activeQuestion?.id, questionIndex },
        });
        onGameOver(score);
      }
      return;
    }

    if (timeLeft <= 0 || lives <= 0) {
      setStatus('gameover');
      emitMiniGameSessionEvent(sessionEvents, 'game_failed', {
        score,
        reason: timeLeft <= 0 ? 'time' : 'lives',
        metadata: { questionId: activeQuestion?.id, questionIndex },
      });
      onGameOver(score);
    }
  }, [activeQuestion?.id, lives, onGameOver, questionIndex, score, sessionEvents, sessionState, timeLeft]);

  const resetForNext = useCallback(() => {
    setLocked(false);
    setFeedback('');
    setStatus('playing');
  }, []);

  const queueAdvance = useCallback((nextQuestionIndex: number, nextCorrect: number, nextScore: number, nextLives: number) => {
    window.setTimeout(() => {
      if (nextLives <= 0) return;

      if (nextQuestionIndex >= sessionQuestions.length) {
        setStatus('complete');
        const earnedStars = starsForAccuracy(nextCorrect, sessionQuestions.length, nextLives);
        emitMiniGameSessionEvent(sessionEvents, 'game_complete', {
          score: nextScore,
          stars: earnedStars,
          metadata: { correct: nextCorrect, total: sessionQuestions.length },
        });
        onVictory(earnedStars, nextScore);
        return;
      }

      setQuestionIndex(nextQuestionIndex);
      resetForNext();
    }, 1200);
  }, [onVictory, resetForNext, sessionEvents, sessionQuestions.length]);

  const slotsCorrect = useMemo(() => {
    const parts = activeQuestion?.parts ?? [];
    return parts.every((part) => (
      !isSlot(part) || (slotValues[part.id] ?? '') === part.correct
    ));
  }, [activeQuestion?.parts, slotValues]);

  const canSubmit = status === 'playing' && !locked;

  const handleSubmit = useCallback(() => {
    if (!activeQuestion || !canSubmit) return;
    setLocked(true);

    const isCorrect = slotsCorrect;
    const nextScore = score + (isCorrect ? 160 : 0);
    setScore(nextScore);

    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    const nextLives = sessionState ? lives : Math.max(0, lives - (isCorrect ? 0 : 1));
    const nextQuestionIndex = questionIndex + 1;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setEnemyHealth((prev) => Math.max(0, prev - 1));
      setFeedback('Punctuation fixed.');
      emitMiniGameSessionEvent(sessionEvents, 'correct_answer', {
        score: nextScore,
        metadata: { questionId: activeQuestion.id, questionIndex },
      });
    } else {
      setFeedback('Not quite. Correct choices are highlighted.');
      emitMiniGameSessionEvent(sessionEvents, 'incorrect_answer', {
        score: nextScore,
        metadata: { questionId: activeQuestion.id, questionIndex },
      });
      if (!sessionState) {
        setLocalLives((prev) => Math.max(0, prev - 1));
      }
    }

    emitMiniGameSessionEvent(sessionEvents, 'puzzle_complete', {
      score: nextScore,
      metadata: { questionId: activeQuestion.id, questionIndex, correct: isCorrect },
    });

    setStatus('resolved');
    queueAdvance(nextQuestionIndex, nextCorrect, nextScore, nextLives);
  }, [activeQuestion, canSubmit, correctCount, lives, questionIndex, queueAdvance, score, sessionEvents, sessionState, slotsCorrect]);

  const headerSubtitle = useMemo(() => (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-black text-white/90">
        Question {Math.min(questionIndex + 1, sessionQuestions.length)}/{sessionQuestions.length}
      </span>
      <span className="font-black text-white/80">
        Lives: {lives}{typeof timeLeft === 'number' ? ` | Time: ${timeLeft}s` : ''}
      </span>
    </div>
  ), [lives, questionIndex, sessionQuestions.length, timeLeft]);

  const isResolved = status === 'resolved' || status === 'complete' || status === 'gameover';
  const enemyHealthPct = useMemo(() => (
    maxEnemyHealth > 0 ? Math.max(0, Math.min(1, enemyHealth / maxEnemyHealth)) : 0
  ), [enemyHealth, maxEnemyHealth]);

  return (
    <GameScreenLayout
      main={(
        <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4">
          <GameQuestionCard title="Punctuation Panic" subtitle={headerSubtitle}>
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">
                {activeQuestion?.prompt}
              </div>
              <div className="text-base font-semibold text-white md:text-lg">
                Insert the missing punctuation and capital letters.
              </div>
            </div>
          </GameQuestionCard>

          <div className="rounded-[1.4rem] border border-white/15 bg-white/8 px-4 py-3 shadow-[0_18px_34px_rgba(2,6,23,0.32)]">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/70">Enemy</div>
                <div className="mt-0.5 truncate text-sm font-black text-white/90 md:text-base">
                  Punctuation Phantom
                </div>
              </div>
              <div className="shrink-0 text-xs font-black uppercase tracking-[0.18em] text-white/75">
                HP {enemyHealth}/{maxEnemyHealth}
              </div>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full border border-white/15 bg-slate-950/55">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#f97316_0%,#ef4444_55%,#be123c_100%)] transition-[width] duration-300"
                style={{ width: `${enemyHealthPct * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-white/15 bg-white/8 p-4 shadow-[0_18px_34px_rgba(2,6,23,0.35)]">
            <div className="text-sm font-semibold leading-relaxed text-white/95 md:text-base">
              {(activeQuestion?.parts ?? []).map((part) => {
                if (!isSlot(part)) return <span key={part}>{part}</span>;
                const value = slotValues[part.id] ?? part.options[0] ?? '';
                const isCorrect = value === part.correct;
                const showCorrect = isResolved && isCorrect;
                const showIncorrect = isResolved && !isCorrect;

                const surfaceClass = showCorrect
                  ? 'border-emerald-200/55 bg-emerald-300/15 text-emerald-50'
                  : showIncorrect
                    ? 'border-rose-200/55 bg-rose-300/12 text-rose-50'
                    : 'border-amber-200/55 bg-amber-200/10 text-amber-50 hover:bg-amber-200/15';

                return (
                  <button
                    key={part.id}
                    type="button"
                    disabled={locked || status !== 'playing'}
                    onClick={() => {
                      if (locked || status !== 'playing') return;
                      setSlotValues((prev) => {
                        const current = prev[part.id] ?? part.options[0] ?? '';
                        const idx = Math.max(0, part.options.indexOf(current));
                        const next = part.options[(idx + 1) % part.options.length] ?? current;
                        return { ...prev, [part.id]: next };
                      });
                    }}
                    className={[
                      'mx-0.5 inline-flex min-h-[48px] items-center justify-center rounded-xl border px-3 font-black',
                      'shadow-[0_10px_18px_rgba(2,6,23,0.22)] transition-[transform,filter,background] duration-150',
                      'disabled:cursor-not-allowed disabled:opacity-70',
                      surfaceClass,
                    ].join(' ')}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>

          {feedback ? (
            <FeedbackStrip tone={status === 'resolved' && slotsCorrect ? 'success' : 'neutral'}>
              {feedback}
            </FeedbackStrip>
          ) : null}
        </div>
      )}
      bottom={(
        <div className="flex w-full flex-col gap-2 md:flex-row md:gap-3">
          <PrimaryActionButton
            onClick={status === 'playing' ? handleSubmit : undefined}
            disabled={!canSubmit}
            className="h-14 w-full rounded-2xl text-base md:h-16 md:flex-1 md:text-lg"
          >
            {status === 'playing' ? 'Submit' : '...'}
          </PrimaryActionButton>
          <SecondaryActionButton
            onClick={onBack}
            className="h-14 w-full rounded-2xl text-base md:h-16 md:w-auto md:px-8 md:text-lg"
          >
            Exit
          </SecondaryActionButton>
        </div>
      )}
    />
  );
};

export default PunctuationPatrolGame;
