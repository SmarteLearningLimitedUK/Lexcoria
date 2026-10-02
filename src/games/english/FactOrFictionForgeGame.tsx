import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle, shuffleOptionsWithAnswerIndex } from '../../utils/questionShuffle';
import { FACT_OR_FICTION_FORGE_QUESTIONS } from '../../systems/content/english/satsSpec';

type FactOrFictionForgeGameProps = {
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

const starsForAccuracy = (correct: number, total: number, lives: number) => {
  const accuracy = total > 0 ? correct / total : 0;
  if (accuracy >= 0.9 && lives >= 2) return 3;
  if (accuracy >= 0.7) return 2;
  return 1;
};

const FactOrFictionForgeGame: React.FC<FactOrFictionForgeGameProps> = ({
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const sessionQuestions = useMemo(() => (
    shuffle(FACT_OR_FICTION_FORGE_QUESTIONS).map((q) => {
      const options = q.mode === 'fact_opinion' ? ['Fact', 'Opinion'] : ['True', 'False'];
      const shuffled = shuffleOptionsWithAnswerIndex(options, q.answerIndex);
      return {
        ...q,
        options: shuffled.options as [string, string],
        answerIndex: shuffled.answerIndex as 0 | 1,
      };
    })
  ), []);

  const [status, setStatus] = useState<'playing' | 'resolved' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [localLives, setLocalLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const activeQuestion = sessionQuestions[Math.min(questionIndex, Math.max(0, sessionQuestions.length - 1))];
  const lives = sessionState?.lives ?? localLives;
  const timeLeft = sessionState?.timeLeft;

  useEffect(() => {
    if (sessionState) {
      if (sessionState.lives <= 0) {
        setStatus('gameover');
        emitMiniGameSessionEvent(sessionEvents, 'game_failed', {
          score,
          reason: 'lives',
          metadata: { questionId: activeQuestion?.id, questionIndex },
        });
        onGameOver(score);
      }
      return;
    }

    if (lives <= 0) {
      setStatus('gameover');
      emitMiniGameSessionEvent(sessionEvents, 'game_failed', {
        score,
        reason: 'lives',
        metadata: { questionId: activeQuestion?.id, questionIndex },
      });
      onGameOver(score);
    }
  }, [activeQuestion?.id, lives, onGameOver, questionIndex, score, sessionEvents, sessionState]);

  const resetForNext = useCallback(() => {
    setSelectedIndex(null);
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

  const canSubmit = status === 'playing' && selectedIndex !== null && !locked;
  const isResolved = status === 'resolved' || status === 'complete' || status === 'gameover';

  const handleSubmit = useCallback(() => {
    if (!activeQuestion || !canSubmit || selectedIndex === null) return;
    setLocked(true);

    const isCorrect = selectedIndex === activeQuestion.answerIndex;
    const nextScore = score + (isCorrect ? 140 : 0);
    setScore(nextScore);

    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    setCorrectCount(nextCorrect);

    const nextLives = sessionState ? lives : Math.max(0, lives - (isCorrect ? 0 : 1));
    if (!sessionState && !isCorrect) setLocalLives(nextLives);

    setFeedback(isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${activeQuestion.options[activeQuestion.answerIndex]}`);
    setStatus('resolved');

    emitMiniGameSessionEvent(sessionEvents, 'puzzle_complete', {
      score: nextScore,
      metadata: { questionId: activeQuestion.id, questionIndex, correct: isCorrect },
    });

    queueAdvance(questionIndex + 1, nextCorrect, nextScore, nextLives);
  }, [activeQuestion, canSubmit, correctCount, lives, questionIndex, queueAdvance, score, selectedIndex, sessionEvents, sessionState]);

  const choiceGrid = useMemo(() => {
    const real = activeQuestion?.options ?? ['Fact', 'Opinion'];
    const filled: Array<{ label: string; disabled: boolean; index: number }> = [
      { label: real[0] ?? '', disabled: false, index: 0 },
      { label: real[1] ?? '', disabled: false, index: 1 },
      { label: '—', disabled: true, index: 2 },
      { label: '—', disabled: true, index: 3 },
    ];
    return filled;
  }, [activeQuestion?.options]);

  const headerSubtitle = useMemo(() => (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-black text-white/90">
        Question {Math.min(questionIndex + 1, sessionQuestions.length)}/{sessionQuestions.length}
      </span>
      <span className="font-black text-white/80">
        Lives: {lives}
      </span>
    </div>
  ), [lives, questionIndex, sessionQuestions.length]);

  return (
    <GameScreenLayout
      main={(
        <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4">
          <GameQuestionCard title="Fact or Fiction Forge" subtitle={headerSubtitle}>
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">
                {activeQuestion?.prompt}
              </div>
              {activeQuestion?.context && <p className="text-sm font-medium leading-snug text-white/80">{activeQuestion.context}</p>}
              <div className="text-base font-semibold text-white md:text-lg">
                {activeQuestion?.statement}
              </div>
            </div>
          </GameQuestionCard>

          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {choiceGrid.map((choice) => {
              const isSelected = selectedIndex === choice.index;
              const isCorrect = activeQuestion ? choice.index === activeQuestion.answerIndex : false;
              const showCorrect = isResolved && isCorrect;
              const showIncorrect = isResolved && isSelected && !isCorrect;

              const surfaceClass = choice.disabled
                ? 'opacity-45'
                : showCorrect
                  ? 'sats-answer-btn--correct'
                  : showIncorrect
                    ? 'sats-answer-btn--incorrect'
                    : isSelected
                      ? 'sats-answer-btn--selected'
                      : '';

              return (
                <button
                  key={`fof-${choice.index}-${choice.label}`}
                  type="button"
                  disabled={choice.disabled || locked || status !== 'playing'}
                  onClick={() => {
                    if (choice.disabled || locked || status !== 'playing') return;
                    setSelectedIndex(choice.index);
                  }}
                  className={[
                    'sats-answer-btn',
                    'transition-[transform,filter] duration-150',
                    'disabled:cursor-not-allowed disabled:opacity-70',
                    surfaceClass,
                  ].join(' ')}
                >
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100/70">
                    Option {choice.index + 1}
                  </div>
                  <div className="mt-1 text-lg font-black text-white md:text-xl">
                    {choice.label}
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

export default FactOrFictionForgeGame;
