import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';

export type EnglishSelectTwoQuestion = {
  id: string;
  prompt: string;
  question: string;
  choices: string[];
  answerIndices: [number, number];
};

type EnglishSelectTwoShellProps = {
  title: string;
  levelId: number;
  questions: EnglishSelectTwoQuestion[];
  onVictory: (stars: number, xpGained: number) => void;
  onGameOver: (xpGained: number) => void;
  onBack: () => void;
  sessionState?: GameplaySessionState;
  sessionEvents?: GameplaySessionEventHandlers;
};

const MAX_LIVES = 3;
const TOTAL_TIME = 110;

const starsForAccuracy = (correct: number, total: number, lives: number) => {
  const accuracy = total > 0 ? correct / total : 0;
  if (accuracy >= 0.9 && lives >= 2) return 3;
  if (accuracy >= 0.7) return 2;
  return 1;
};

const normalizePair = (pair: [number, number]): [number, number] => (pair[0] < pair[1] ? pair : [pair[1], pair[0]]);

const EnglishSelectTwoShell: React.FC<EnglishSelectTwoShellProps> = ({
  title,
  questions,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const [status, setStatus] = useState<'playing' | 'resolved' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [localLives, setLocalLives] = useState(MAX_LIVES);
  const [localTimeLeft, setLocalTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const activeQuestion = questions[Math.min(questionIndex, Math.max(0, questions.length - 1))];
  const lives = sessionState?.lives ?? localLives;
  const timeLeft = sessionState?.timeLeft ?? localTimeLeft;

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
    setSelected([]);
    setLocked(false);
    setFeedback('');
    setStatus('playing');
  }, []);

  const queueAdvance = useCallback((nextQuestionIndex: number, nextCorrect: number, nextScore: number, nextLives: number) => {
    window.setTimeout(() => {
      if (nextLives <= 0) return;

      if (nextQuestionIndex >= questions.length) {
        setStatus('complete');
        const earnedStars = starsForAccuracy(nextCorrect, questions.length, nextLives);
        emitMiniGameSessionEvent(sessionEvents, 'game_complete', {
          score: nextScore,
          stars: earnedStars,
          metadata: { correct: nextCorrect, total: questions.length },
        });
        onVictory(earnedStars, nextScore);
        return;
      }

      setQuestionIndex(nextQuestionIndex);
      resetForNext();
    }, 1200);
  }, [onVictory, questions.length, resetForNext, sessionEvents]);

  const canCheck = selected.length === 2 && !locked && status === 'playing';

  const handleCheck = useCallback(() => {
    if (!activeQuestion || !canCheck) return;
    setLocked(true);
    const normalizedSelected = normalizePair([selected[0], selected[1]]);
    const normalizedAnswer = normalizePair(activeQuestion.answerIndices);
    const isCorrect = normalizedSelected[0] === normalizedAnswer[0] && normalizedSelected[1] === normalizedAnswer[1];

    const nextScore = score + (isCorrect ? 180 : 0);
    setScore(nextScore);

    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    const nextLives = sessionState ? lives : Math.max(0, lives - (isCorrect ? 0 : 1));
    const nextQuestionIndex = questionIndex + 1;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setFeedback('Perfect two.');
      emitMiniGameSessionEvent(sessionEvents, 'correct_answer', {
        score: nextScore,
        metadata: { questionId: activeQuestion.id, questionIndex },
      });
    } else {
      setFeedback('Not quite — exactly two are correct.');
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
  }, [activeQuestion, canCheck, correctCount, lives, questionIndex, queueAdvance, score, selected, sessionEvents, sessionState]);

  const headerSubtitle = useMemo(() => (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-black text-white/90">
        Question {Math.min(questionIndex + 1, questions.length)}/{questions.length}
      </span>
      <span className="font-black text-white/80">
        Lives: {lives}{typeof timeLeft === 'number' ? ` | Time: ${timeLeft}s` : ''}
      </span>
    </div>
  ), [lives, questionIndex, questions.length, timeLeft]);

  const isResolved = status === 'resolved' || status === 'complete' || status === 'gameover';
  const canSubmit = status === 'playing' && canCheck;

  return (
    <GameScreenLayout
      top={(
        <GameQuestionCard title={title} subtitle={headerSubtitle}>
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">{activeQuestion?.prompt}</div>
            <div className="text-base font-semibold text-white md:text-lg">{activeQuestion?.question}</div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-white/70">
              Selected: {selected.length}/2
            </div>
          </div>
        </GameQuestionCard>
      )}
      main={(
        <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4">
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {(activeQuestion?.choices ?? []).map((choice, index) => {
              const isSelected = selected.includes(index);
              const isCorrect = activeQuestion ? activeQuestion.answerIndices.includes(index) : false;
              const showCorrect = isResolved && isCorrect;
              const showIncorrect = isResolved && isSelected && !isCorrect;

              const surfaceClass = showCorrect
                ? 'border-emerald-200/55 bg-emerald-300/15'
                : showIncorrect
                  ? 'border-rose-200/55 bg-rose-300/12'
                  : isSelected
                    ? 'border-amber-200/55 bg-amber-200/10'
                    : 'border-white/18 bg-white/8 hover:bg-white/10';

              return (
                <button
                  key={`${activeQuestion?.id ?? 'q'}-${choice}`}
                  type="button"
                  disabled={locked || status !== 'playing'}
                  onClick={() => {
                    if (locked || status !== 'playing') return;
                    setSelected((prev) => {
                      if (prev.includes(index)) return prev.filter((v) => v !== index);
                      if (prev.length >= 2) return prev;
                      return [...prev, index];
                    });
                  }}
                  className={[
                    'min-h-[56px] w-full rounded-2xl border px-4 py-3 text-left',
                    'shadow-[0_14px_28px_rgba(2,6,23,0.28)] transition-[transform,filter,background] duration-150',
                    'disabled:cursor-not-allowed disabled:opacity-70',
                    surfaceClass,
                  ].join(' ')}
                >
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100/70">
                    Option {index + 1}
                  </div>
                  <div className="mt-1 text-lg font-black text-white md:text-xl">
                    {choice}
                  </div>
                </button>
              );
            })}
          </div>

          {feedback ? (
            <FeedbackStrip tone={status === 'resolved' && feedback === 'Perfect two.' ? 'success' : 'neutral'}>
              {feedback}
            </FeedbackStrip>
          ) : null}
        </div>
      )}
      bottom={(
        <div className="flex w-full flex-col gap-2 md:flex-row md:gap-3">
          <PrimaryActionButton
            onClick={status === 'playing' ? handleCheck : undefined}
            disabled={!canSubmit}
            className="h-14 w-full rounded-2xl text-base md:h-16 md:flex-1 md:text-lg"
          >
            {status === 'playing' ? 'Submit (2)' : '...'}
          </PrimaryActionButton>
          <SecondaryActionButton
            onClick={status === 'playing' ? () => setSelected([]) : onBack}
            className="h-14 w-full rounded-2xl text-base md:h-16 md:w-auto md:px-8 md:text-lg"
          >
            {status === 'playing' ? 'Clear' : 'Exit'}
          </SecondaryActionButton>
        </div>
      )}
    />
  );
};

export default EnglishSelectTwoShell;
