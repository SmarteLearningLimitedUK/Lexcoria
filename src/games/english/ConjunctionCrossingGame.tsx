import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import { getConjunctionCrossingRunQuestions } from '../../systems/content/english/conjunctionCrossing';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';

type ConjunctionCrossingGameProps = {
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

type ResolveState = 'playing' | 'resolved' | 'complete' | 'gameover';

const MAX_LIVES = 3;
const TOTAL_TIME = 90;
const QUESTIONS_PER_RUN = 10;

const starsForAccuracy = (correct: number, total: number, lives: number) => {
  const accuracy = total > 0 ? correct / total : 0;
  if (accuracy >= 0.9 && lives >= 2) return 3;
  if (accuracy >= 0.7) return 2;
  return 1;
};

const injectChoice = (sentence: string, choice: string | null) => {
  if (!sentence.includes('___')) return sentence;
  return sentence.replace('___', choice ?? '___');
};

const ConjunctionCrossingGame: React.FC<ConjunctionCrossingGameProps> = ({
  levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const questions = useMemo(
    () => getConjunctionCrossingRunQuestions(levelId, QUESTIONS_PER_RUN),
    [levelId],
  );

  const [status, setStatus] = useState<ResolveState>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [localLives, setLocalLives] = useState(MAX_LIVES);
  const [localTimeLeft, setLocalTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const activeQuestion = questions[Math.min(questionIndex, questions.length - 1)];
  const lives = sessionState?.lives ?? localLives;
  const timeLeft = sessionState?.timeLeft ?? localTimeLeft;

  const selectedChoice = useMemo(() => {
    if (!activeQuestion || selectedIndex === null) return null;
    return activeQuestion.choices[selectedIndex] ?? null;
  }, [activeQuestion, selectedIndex]);

  useEffect(() => {
    if (sessionState) return;
    setLocalTimeLeft(TOTAL_TIME);
    const timerId = window.setInterval(() => {
      setLocalTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [sessionState]);

  useEffect(() => {
    if (!sessionState) return;
    if (sessionState.timeLeft <= 0 || sessionState.lives <= 0) {
      setStatus('gameover');
      emitMiniGameSessionEvent(sessionEvents, 'game_failed', {
        score,
        reason: sessionState.timeLeft <= 0 ? 'time' : 'lives',
        metadata: { questionId: activeQuestion?.id, questionIndex },
      });
      onGameOver(score);
    }
  }, [activeQuestion?.id, onGameOver, questionIndex, score, sessionEvents, sessionState]);

  useEffect(() => {
    if (sessionState) return;
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
    setSelectedIndex(null);
    setLocked(false);
    setFeedback('');
    setStatus('playing');
  }, []);

  const advance = useCallback(() => {
    const nextIndex = questionIndex + 1;
    if (nextIndex >= questions.length) {
      setStatus('complete');
      const earnedStars = starsForAccuracy(correctCount, questions.length, lives);
      emitMiniGameSessionEvent(sessionEvents, 'game_complete', {
        score,
        stars: earnedStars,
        metadata: { correct: correctCount, total: questions.length },
      });
      onVictory(earnedStars, score);
      return;
    }

    setQuestionIndex(nextIndex);
    resetForNext();
  }, [correctCount, lives, onVictory, questionIndex, questions.length, resetForNext, score, sessionEvents]);

  const handleSubmit = useCallback(() => {
    if (!activeQuestion || locked || selectedIndex === null) return;
    setLocked(true);

    const isCorrect = selectedIndex === activeQuestion.answerIndex;
    const nextScore = score + (isCorrect ? 120 : 0);
    setScore(nextScore);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setFeedback('Crossing cleared.');
      emitMiniGameSessionEvent(sessionEvents, 'correct_answer', {
        score: nextScore,
        metadata: { questionId: activeQuestion.id, questionIndex },
      });
    } else {
      setFeedback(`Not quite. The correct answer was ${activeQuestion.choices[activeQuestion.answerIndex]}.`);
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
  }, [activeQuestion, locked, questionIndex, score, selectedIndex, sessionEvents, sessionState]);

  const sentencePreview = useMemo(() => {
    if (!activeQuestion) return '';
    if (status === 'playing') return injectChoice(activeQuestion.sentence, selectedChoice);
    return injectChoice(activeQuestion.sentence, selectedChoice ?? '___');
  }, [activeQuestion, selectedChoice, status]);

  return (
    <GameScreenLayout
      top={(
        <GameQuestionCard
          title="Conjunction Crossing"
          subtitle={(
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-black text-white/90">
                Question {Math.min(questionIndex + 1, questions.length)}/{questions.length}
              </span>
              <span className="font-black text-white/80">
                Lives: {lives}{typeof timeLeft === 'number' ? ` • Time: ${timeLeft}s` : ''}
              </span>
            </div>
          )}
        >
          <div className="space-y-2">
            <div className="text-sm font-black text-cyan-100/85">{activeQuestion?.prompt}</div>
            <div className="rounded-2xl border border-white/14 bg-white/6 p-3 text-base font-semibold text-white md:p-4 md:text-lg">
              {sentencePreview}
            </div>
          </div>
        </GameQuestionCard>
      )}
      main={(
        <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
            {(activeQuestion?.choices ?? []).map((choice, index) => {
              const isSelected = selectedIndex === index;
              const isResolved = status === 'resolved' || status === 'complete' || status === 'gameover';
              const isCorrect = activeQuestion ? index === activeQuestion.answerIndex : false;
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
                    setSelectedIndex(index);
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
            <FeedbackStrip tone={status === 'resolved' && selectedIndex === activeQuestion?.answerIndex ? 'success' : 'neutral'}>
              {feedback}
            </FeedbackStrip>
          ) : null}
        </div>
      )}
      bottom={(
        <div className="flex w-full flex-col gap-2 md:flex-row md:gap-3">
          {status === 'playing' ? (
            <>
              <PrimaryActionButton
                onClick={handleSubmit}
                disabled={selectedIndex === null || locked}
                className="h-14 w-full rounded-2xl text-base md:h-16 md:flex-1 md:text-lg"
              >
                Check
              </PrimaryActionButton>
              <SecondaryActionButton
                onClick={onBack}
                className="h-14 w-full rounded-2xl text-base md:h-16 md:w-auto md:px-8 md:text-lg"
              >
                Back
              </SecondaryActionButton>
            </>
          ) : status === 'resolved' ? (
            <>
              <PrimaryActionButton
                onClick={advance}
                className="h-14 w-full rounded-2xl text-base md:h-16 md:flex-1 md:text-lg"
              >
                Next
              </PrimaryActionButton>
              <SecondaryActionButton
                onClick={onBack}
                className="h-14 w-full rounded-2xl text-base md:h-16 md:w-auto md:px-8 md:text-lg"
              >
                Back
              </SecondaryActionButton>
            </>
          ) : (
            <div className="flex w-full flex-col gap-2 md:flex-row md:gap-3">
              <PrimaryActionButton
                onClick={onBack}
                className="h-14 w-full rounded-2xl text-base md:h-16 md:flex-1 md:text-lg"
              >
                Return to island
              </PrimaryActionButton>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default ConjunctionCrossingGame;

