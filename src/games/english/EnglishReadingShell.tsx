import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle, shuffleOptionsWithAnswerIndex } from '../../utils/questionShuffle';

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
const TOTAL_TIME = 120;

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
  const [localTimeLeft, setLocalTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const sessionQuestions = useMemo(() => {
    const randomized = shuffle(questions);
    return randomized.map((question) => {
      const shuffled = shuffleOptionsWithAnswerIndex(question.choices, question.answerIndex);
      return { ...question, choices: shuffled.options, answerIndex: shuffled.answerIndex };
    });
  }, [questions]);

  const activeQuestion = sessionQuestions[Math.min(questionIndex, Math.max(0, sessionQuestions.length - 1))];
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
      setFeedback('Not quite. Reread the story if you need to.');
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
        Lives: {lives}{typeof timeLeft === 'number' ? ` | Time: ${timeLeft}s` : ''}
      </span>
    </div>
  ), [lives, questionIndex, sessionQuestions.length, timeLeft]);

  const isResolved = status === 'resolved' || status === 'complete' || status === 'gameover';
  const canSubmit = status === 'playing' && selectedIndex !== null && !locked;

  return (
    <GameScreenLayout
      main={(
        <div
          className={layoutPreset === 'text-detective'
            ? 'grid h-full min-h-0 overflow-hidden pb-1'
            : 'flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4'}
          style={layoutPreset === 'text-detective'
            ? { gridTemplateRows: '58% 42%' }
            : undefined}
        >
          <div className={layoutPreset === 'text-detective'
            ? 'flex min-h-0 flex-col overflow-hidden rounded-[1.4rem] border border-white/15 bg-white/8 shadow-[0_18px_34px_rgba(2,6,23,0.35)]'
            : 'flex min-h-0 flex-[3] flex-col overflow-hidden rounded-[1.4rem] border border-white/15 bg-white/8 shadow-[0_18px_34px_rgba(2,6,23,0.35)]'}
          >
            <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4">
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/70">Passage</div>
                <div className="mt-1 truncate text-base font-black text-white md:text-lg">{storyTitle}</div>
              </div>
              <SecondaryActionButton onClick={onBack} className="h-11 rounded-2xl px-5 text-xs md:h-12 md:text-sm">
                Exit
              </SecondaryActionButton>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 text-sm font-semibold leading-relaxed text-white/90 md:text-base">
              {storyPages.join('\n\n').split('\n').map((line) => (
                <p key={line} className="m-0 mb-3 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className={layoutPreset === 'text-detective'
            ? 'min-h-0 overflow-hidden pt-3'
            : 'flex min-h-0 flex-[2] flex-col gap-3 overflow-hidden'}
          >
            <div className={layoutPreset === 'text-detective' ? 'flex h-full min-h-0 flex-col gap-3 overflow-hidden' : undefined}>
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
          </div>
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

export default EnglishReadingShell;
