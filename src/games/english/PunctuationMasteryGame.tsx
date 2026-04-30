import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle } from '../../utils/questionShuffle';
import { PUNCTUATION_MASTERY_QUESTIONS, PunctuationSlot } from '../../systems/content/english/satsSpec';

type PunctuationMasteryGameProps = {
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
const TOTAL_TIME = 130;

const starsForAccuracy = (correct: number, total: number, lives: number) => {
  const accuracy = total > 0 ? correct / total : 0;
  if (accuracy >= 0.9 && lives >= 2) return 3;
  if (accuracy >= 0.7) return 2;
  return 1;
};

const isSlot = (part: string | PunctuationSlot): part is PunctuationSlot => typeof part !== 'string';

const PunctuationMasteryGame: React.FC<PunctuationMasteryGameProps> = ({
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const sessionQuestions = useMemo(() => (
    shuffle(PUNCTUATION_MASTERY_QUESTIONS).map((q) => ({
      ...q,
      parts: q.parts.map((part) => {
        if (!isSlot(part)) return part;
        const shuffled = shuffle([...part.options]);
        return { ...part, options: shuffled };
      }),
    }))
  ), []);

  const [status, setStatus] = useState<'playing' | 'resolved' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [slotValues, setSlotValues] = useState<Record<string, string>>({});
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [localLives, setLocalLives] = useState(MAX_LIVES);
  const [localTimeLeft, setLocalTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const activeQuestion = sessionQuestions[Math.min(questionIndex, Math.max(0, sessionQuestions.length - 1))];
  const lives = sessionState?.lives ?? localLives;
  const timeLeft = sessionState?.timeLeft ?? localTimeLeft;

  const initialSlotState = useMemo(() => {
    if (!activeQuestion) return {};
    const state: Record<string, string> = {};
    activeQuestion.parts.forEach((part) => {
      if (!isSlot(part)) return;
      state[part.id] = part.options[0] ?? '';
    });
    return state;
  }, [activeQuestion]);

  useEffect(() => {
    setSlotValues(initialSlotState);
    setLocked(false);
    setFeedback('');
    setStatus('playing');
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

  const canSubmit = status === 'playing' && !locked && Boolean(activeQuestion);
  const isResolved = status === 'resolved' || status === 'complete' || status === 'gameover';

  const cycleSlot = useCallback((slot: PunctuationSlot) => {
    if (locked || status !== 'playing') return;
    setSlotValues((prev) => {
      const current = prev[slot.id] ?? slot.options[0] ?? '';
      const idx = slot.options.indexOf(current);
      const next = slot.options[(idx + 1) % slot.options.length] ?? current;
      return { ...prev, [slot.id]: next };
    });
  }, [locked, status]);

  const buildSentence = useCallback((values: Record<string, string>) => {
    if (!activeQuestion) return '';
    return activeQuestion.parts.map((part) => {
      if (typeof part === 'string') return part;
      return values[part.id] ?? part.options[0] ?? '';
    }).join('');
  }, [activeQuestion]);

  const correctSentence = useMemo(() => {
    if (!activeQuestion) return '';
    const values: Record<string, string> = {};
    activeQuestion.parts.forEach((part) => {
      if (!isSlot(part)) return;
      values[part.id] = part.correct;
    });
    return buildSentence(values);
  }, [activeQuestion, buildSentence]);

  const currentSentence = useMemo(() => buildSentence(slotValues), [buildSentence, slotValues]);

  const handleSubmit = useCallback(() => {
    if (!activeQuestion || !canSubmit) return;
    setLocked(true);

    const allCorrect = activeQuestion.parts.every((part) => {
      if (!isSlot(part)) return true;
      return (slotValues[part.id] ?? '') === part.correct;
    });

    const nextScore = score + (allCorrect ? 180 : 0);
    setScore(nextScore);

    const nextCorrect = correctCount + (allCorrect ? 1 : 0);
    setCorrectCount(nextCorrect);

    const nextLives = sessionState ? lives : Math.max(0, lives - (allCorrect ? 0 : 1));
    if (!sessionState && !allCorrect) setLocalLives(nextLives);

    setFeedback(allCorrect ? 'Correct!' : `Incorrect. Correct answer: ${correctSentence}`);
    setStatus('resolved');

    emitMiniGameSessionEvent(sessionEvents, 'puzzle_complete', {
      score: nextScore,
      metadata: { questionId: activeQuestion.id, questionIndex, correct: allCorrect },
    });

    queueAdvance(questionIndex + 1, nextCorrect, nextScore, nextLives);
  }, [activeQuestion, canSubmit, correctCount, correctSentence, lives, questionIndex, queueAdvance, score, sessionEvents, sessionState, slotValues]);

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

  return (
    <GameScreenLayout
      main={(
        <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4">
          <GameQuestionCard title="Punctuation Mastery" subtitle={headerSubtitle}>
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">
                {activeQuestion?.prompt}
              </div>
              <div className="rounded-2xl border border-white/15 bg-slate-950/35 px-4 py-3 text-base font-semibold text-white md:text-lg">
                {currentSentence}
              </div>
              <div className="text-sm font-semibold text-white/80">Tap the chips to change punctuation.</div>
            </div>
          </GameQuestionCard>

          <div className="rounded-[1.2rem] border border-white/15 bg-white/6 p-3">
            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/70">Punctuation chips</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(activeQuestion?.parts ?? []).map((part) => {
                if (!isSlot(part)) return null;
                const value = slotValues[part.id] ?? part.options[0] ?? '';
                const showCorrect = isResolved && value === part.correct;
                const showIncorrect = isResolved && value !== part.correct;
                const surfaceClass = showCorrect
                  ? 'border-emerald-200/55 bg-emerald-300/15'
                  : showIncorrect
                    ? 'border-rose-200/55 bg-rose-300/12'
                    : 'border-amber-200/35 bg-amber-200/10';

                return (
                  <button
                    key={`slot-${part.id}`}
                    type="button"
                    disabled={locked || status !== 'playing'}
                    onClick={() => cycleSlot(part)}
                    className={[
                      'min-h-[48px] rounded-full border px-5 text-base font-black text-white',
                      'shadow-[0_10px_18px_rgba(2,6,23,0.28)] transition-[transform,filter,background] duration-150',
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
            <FeedbackStrip tone={status === 'resolved' && feedback === 'Correct!' ? 'success' : 'neutral'}>
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

export default PunctuationMasteryGame;

