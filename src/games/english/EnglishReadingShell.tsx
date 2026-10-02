import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle, shuffleOptionsWithAnswerIndex } from '../../utils/questionShuffle';
import ReadingBookOverlay from '../../components/game-ui/ReadingBookOverlay';

export type EnglishReadingQuestion = {
  id: string;
  prompt: string;
  question: string;
  choices: string[];
  answerIndex: number;
};

export type EnglishReadingShellLayoutPreset = 'standard' | 'text-detective';

type EnglishReadingShellProps = {
  title: string;
  levelId: number;
  storyTitle: string;
  storyPages: string[];
  questions: EnglishReadingQuestion[];
  layoutPreset?: EnglishReadingShellLayoutPreset;
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

const EnglishReadingShell: React.FC<EnglishReadingShellProps> = ({
  title,
  storyTitle,
  storyPages,
  questions,
  layoutPreset = 'standard',
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const [status, setStatus] = useState<'playing' | 'resolved' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [localLives, setLocalLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [highlightedLines, setHighlightedLines] = useState<number[]>([]);

  const sessionQuestions = useMemo(() => {
    const randomized = shuffle<EnglishReadingQuestion>(questions);
    return randomized.map((question) => {
      const shuffled = shuffleOptionsWithAnswerIndex(question.choices, question.answerIndex);
      return { ...question, choices: shuffled.options, answerIndex: shuffled.answerIndex };
    });
  }, [questions]);

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

  const handleSubmit = useCallback(() => {
    if (!activeQuestion || locked || selectedIndex === null) return;
    setLocked(true);

    const isCorrect = selectedIndex === activeQuestion.answerIndex;
    const nextScore = score + (isCorrect ? 140 : 0);
    setScore(nextScore);

    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    const nextLives = sessionState ? lives : Math.max(0, lives - (isCorrect ? 0 : 1));
    const nextQuestionIndex = questionIndex + 1;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setFeedback('Good reading.');
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
    queueAdvance(nextQuestionIndex, nextCorrect, nextScore, nextLives);
  }, [activeQuestion, correctCount, lives, locked, questionIndex, queueAdvance, score, selectedIndex, sessionEvents, sessionState]);

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
  const canSubmit = status === 'playing' && selectedIndex !== null && !locked;

  return (
    <GameScreenLayout
      className="english-game-layout english-reading-layout"
      main={(
        <div className="relative flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4">
          <ReadingBookOverlay
            title={storyTitle}
            isOpen={isBookOpen}
            onOpen={() => setIsBookOpen(true)}
            onClose={() => setIsBookOpen(false)}
          >
            <p className="english-passage-guide">Tap lines to mark evidence. Marks stay when you close the book.</p>
            {storyPages.join('\n\n').split('\n').map((line, index) => line.trim() ? (
              <button
                key={`${index}-${line}`}
                type="button"
                data-button-skin="none"
                className={`english-passage-line ${highlightedLines.includes(index) ? 'english-passage-line--marked' : ''}`}
                aria-pressed={highlightedLines.includes(index)}
                onClick={() => setHighlightedLines((previous) => (
                  previous.includes(index) ? previous.filter((entry) => entry !== index) : [...previous, index]
                ))}
              >
                {line}
              </button>
            ) : <div key={`break-${index}`} className="english-passage-break" aria-hidden="true" />)}
          </ReadingBookOverlay>

          <GameQuestionCard title={title} subtitle={headerSubtitle}>
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">
                {activeQuestion?.prompt}
              </div>
              <div className="text-base font-semibold text-white md:text-lg">
                {activeQuestion?.question}
              </div>
            </div>
          </GameQuestionCard>

          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {(activeQuestion?.choices ?? []).map((choice, index) => {
              const isSelected = selectedIndex === index;
              const isCorrect = activeQuestion ? index === activeQuestion.answerIndex : false;
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
                  key={`${activeQuestion?.id ?? 'q'}-${choice}`}
                  type="button"
                  disabled={locked || status !== 'playing'}
                  onClick={() => {
                    if (locked || status !== 'playing') return;
                    setSelectedIndex(index);
                  }}
                  className={[
                    'sats-answer-btn',
                    'transition-[transform,filter] duration-150',
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
          <PrimaryActionButton
            onClick={status === 'playing' ? handleSubmit : undefined}
            disabled={!canSubmit || isBookOpen}
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

export default EnglishReadingShell;
