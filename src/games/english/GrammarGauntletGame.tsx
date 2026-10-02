import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle, shuffleOptionsWithAnswerIndex } from '../../utils/questionShuffle';
import { GRAMMAR_GAUNTLET_QUESTIONS } from '../../systems/content/english/satsSpec';

type GrammarGauntletGameProps = {
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

const GrammarGauntletGame: React.FC<GrammarGauntletGameProps> = ({
  levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const sessionQuestions = useMemo(() => {
    const randomized = shuffle(GRAMMAR_GAUNTLET_QUESTIONS);
    return randomized.map((q) => {
      const shuffled = shuffleOptionsWithAnswerIndex(q.replacements, q.correctReplacementIndex);
      return { ...q, replacements: shuffled.options, correctReplacementIndex: shuffled.answerIndex };
    });
  }, []);

  const [status, setStatus] = useState<'playing' | 'resolved' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [wrongWordTapped, setWrongWordTapped] = useState(false);
  const [selectedReplacementIndex, setSelectedReplacementIndex] = useState<number | null>(null);
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
    setWrongWordTapped(false);
    setSelectedReplacementIndex(null);
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

  const canSubmit = status === 'playing' && wrongWordTapped && selectedReplacementIndex !== null && !locked;

  const handleSubmit = useCallback(() => {
    if (!activeQuestion || !canSubmit) return;
    setLocked(true);

    const isCorrect = selectedReplacementIndex === activeQuestion.correctReplacementIndex;
    const nextScore = score + (isCorrect ? 160 : 0);
    setScore(nextScore);

    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    const nextLives = sessionState ? lives : Math.max(0, lives - (isCorrect ? 0 : 1));
    const nextQuestionIndex = questionIndex + 1;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setFeedback('Correct.');
      emitMiniGameSessionEvent(sessionEvents, 'correct_answer', {
        score: nextScore,
        metadata: { questionId: activeQuestion.id, questionIndex },
      });
    } else {
      const correctWord = activeQuestion.replacements[activeQuestion.correctReplacementIndex] ?? '';
      setFeedback(`Not quite. Correct word: ${correctWord}.`);
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
  }, [activeQuestion, canSubmit, correctCount, lives, questionIndex, queueAdvance, score, selectedReplacementIndex, sessionEvents, sessionState]);

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

  const isResolved = status === 'resolved' || status === 'complete' || status === 'gameover';

  const sentenceParts = useMemo(() => {
    if (!activeQuestion) return { before: '', wrong: '', after: '' };
    const index = activeQuestion.sentence.indexOf(activeQuestion.wrongWord);
    if (index < 0) return { before: activeQuestion.sentence, wrong: activeQuestion.wrongWord, after: '' };
    return {
      before: activeQuestion.sentence.slice(0, index),
      wrong: activeQuestion.sentence.slice(index, index + activeQuestion.wrongWord.length),
      after: activeQuestion.sentence.slice(index + activeQuestion.wrongWord.length),
    };
  }, [activeQuestion]);

  return (
    <GameScreenLayout
      main={(
        <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4">
          <GameQuestionCard title="Grammar Gauntlet" subtitle={headerSubtitle}>
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">
                {activeQuestion?.prompt}
              </div>
              <div className="text-base font-semibold text-white md:text-lg">
                Tap the incorrect word, then choose the replacement.
              </div>
            </div>
          </GameQuestionCard>

          <div className="rounded-[1.4rem] border border-white/15 bg-white/8 p-4 shadow-[0_18px_34px_rgba(2,6,23,0.35)]">
            <div className="text-sm font-semibold leading-relaxed text-white/90 md:text-base">
              <span>{sentenceParts.before}</span>
              <button
                type="button"
                disabled={locked || status !== 'playing'}
                onClick={() => {
                  if (locked || status !== 'playing') return;
                  setWrongWordTapped(true);
                }}
                className={[
                  'sats-answer-btn mx-1 inline-flex !min-h-[48px] !w-auto items-center justify-center !rounded-xl !px-3 !py-2 !text-base !font-black !text-center',
                  wrongWordTapped ? 'sats-answer-btn--selected' : '',
                  'disabled:cursor-not-allowed disabled:opacity-70',
                ].join(' ')}
              >
                {sentenceParts.wrong}
              </button>
              <span>{sentenceParts.after}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {(activeQuestion?.replacements ?? []).map((replacement, index) => {
              const isSelected = selectedReplacementIndex === index;
              const isCorrect = activeQuestion ? index === activeQuestion.correctReplacementIndex : false;
              const showCorrect = isResolved && isCorrect;
              const showIncorrect = isResolved && isSelected && !isCorrect;

              const surfaceClass = showCorrect
                ? 'sats-answer-btn--correct'
                : showIncorrect
                  ? 'sats-answer-btn--incorrect'
                  : isSelected
                    ? 'sats-answer-btn--selected'
                    : '';

              return (
                <button
                  key={`${activeQuestion?.id ?? 'q'}-rep-${replacement}`}
                  type="button"
                  disabled={!wrongWordTapped || locked || status !== 'playing'}
                  onClick={() => {
                    if (!wrongWordTapped || locked || status !== 'playing') return;
                    setSelectedReplacementIndex(index);
                  }}
                  className={[
                    'sats-answer-btn',
                    'transition-[transform,filter] duration-150',
                    'disabled:cursor-not-allowed disabled:opacity-70',
                    surfaceClass,
                  ].join(' ')}
                >
                  <div className="text-xs font-black uppercase tracking-[0.18em] opacity-80">
                    Option {index + 1}
                  </div>
                  <div className="mt-1 text-lg font-black md:text-xl">
                    {replacement}
                  </div>
                </button>
              );
            })}
          </div>

          {feedback ? (
            <FeedbackStrip tone={status === 'resolved' && selectedReplacementIndex === activeQuestion?.correctReplacementIndex ? 'success' : 'neutral'}>
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

export default GrammarGauntletGame;
