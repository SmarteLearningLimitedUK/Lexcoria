import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle } from '../../utils/questionShuffle';
import { getEvidenceHighlightRun } from '../../systems/content/english/comprehension';

type EvidenceHighlightGameProps = {
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
const TOTAL_TIME = 140;

const starsForAccuracy = (correct: number, total: number, lives: number) => {
  const accuracy = total > 0 ? correct / total : 0;
  if (accuracy >= 0.9 && lives >= 2) return 3;
  if (accuracy >= 0.7) return 2;
  return 1;
};

const normalize = (values: number[]) => [...values].sort((a, b) => a - b).join(',');

const EvidenceHighlightGame: React.FC<EvidenceHighlightGameProps> = ({
  levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const run = useMemo(() => getEvidenceHighlightRun(levelId), [levelId]);
  const sessionQuestions = useMemo(() => shuffle(run.questions), [run.questions]);

  const [status, setStatus] = useState<'playing' | 'resolved' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [localLives, setLocalLives] = useState(MAX_LIVES);
  const [localTimeLeft, setLocalTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

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
    setSelected([]);
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

  const canSubmit = status === 'playing' && selected.length > 0 && !locked;

  const handleSubmit = useCallback(() => {
    if (!activeQuestion || !canSubmit) return;
    setLocked(true);

    const isCorrect = normalize(selected) === normalize(activeQuestion.answerIndices);
    const nextScore = score + (isCorrect ? 200 : 0);
    setScore(nextScore);

    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    const nextLives = sessionState ? lives : Math.max(0, lives - (isCorrect ? 0 : 1));
    const nextQuestionIndex = questionIndex + 1;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setFeedback('Evidence locked in.');
      emitMiniGameSessionEvent(sessionEvents, 'correct_answer', {
        score: nextScore,
        metadata: { questionId: activeQuestion.id, questionIndex },
      });
    } else {
      setFeedback('Not quite. Correct evidence is highlighted.');
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
  }, [activeQuestion, canSubmit, correctCount, lives, questionIndex, queueAdvance, score, selected, sessionEvents, sessionState]);

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

  return (
    <GameScreenLayout
      main={(
        <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4">
          <GameQuestionCard title="Evidence Hunter" subtitle={headerSubtitle}>
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">
                {activeQuestion?.prompt}
              </div>
              <div className="text-base font-semibold text-white md:text-lg">
                {activeQuestion?.question}
              </div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-white/70">
                Selected: {selected.length}
              </div>
            </div>
          </GameQuestionCard>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.4rem] border border-white/15 bg-white/8 shadow-[0_18px_34px_rgba(2,6,23,0.35)]">
            <div className="px-4 pb-3 pt-4">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/70">Text</div>
              <div className="mt-1 truncate text-base font-black text-white md:text-lg">{run.passage.title}</div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
              <div className="space-y-2">
                {(activeQuestion?.sentences ?? []).map((sentence, index) => {
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
                      key={`${activeQuestion?.id ?? 'q'}-sent-${index}`}
                      type="button"
                      disabled={locked || status !== 'playing'}
                      onClick={() => {
                        if (locked || status !== 'playing') return;
                        setSelected((prev) => (
                          prev.includes(index) ? prev.filter((v) => v !== index) : [...prev, index]
                        ));
                      }}
                      className={[
                        'min-h-[56px] w-full rounded-2xl border px-4 py-3 text-left',
                        'shadow-[0_14px_28px_rgba(2,6,23,0.22)] transition-[transform,filter,background] duration-150',
                        'disabled:cursor-not-allowed disabled:opacity-70',
                        surfaceClass,
                      ].join(' ')}
                    >
                      <div className="text-sm font-semibold leading-relaxed text-white md:text-base">
                        {sentence}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {feedback ? (
            <FeedbackStrip tone={status === 'resolved' && normalize(selected) === normalize(activeQuestion?.answerIndices ?? []) ? 'success' : 'neutral'}>
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

export default EvidenceHighlightGame;

