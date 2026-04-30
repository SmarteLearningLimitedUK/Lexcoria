import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import StoryOverlay from '../../components/english/StoryOverlay';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { getEvidenceChainRun } from '../../systems/content/english/comprehension';

type EvidenceChainGameProps = {
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
const TOTAL_TIME = 160;

const starsForAccuracy = (correct: number, total: number, lives: number) => {
  const accuracy = total > 0 ? correct / total : 0;
  if (accuracy >= 0.9 && lives >= 2) return 3;
  if (accuracy >= 0.7) return 2;
  return 1;
};

const EvidenceChainGame: React.FC<EvidenceChainGameProps> = ({
  levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const run = useMemo(() => getEvidenceChainRun(levelId), [levelId]);
  const [status, setStatus] = useState<'playing' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [phase, setPhase] = useState<'answer' | 'evidence' | 'reason'>('answer');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [localLives, setLocalLives] = useState(MAX_LIVES);
  const [localTimeLeft, setLocalTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [correctChains, setCorrectChains] = useState(0);
  const [storyOpen, setStoryOpen] = useState(false);

  const activeQuestion = run.questions[Math.min(questionIndex, Math.max(0, run.questions.length - 1))];
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
          metadata: { questionId: activeQuestion?.id, questionIndex, phase },
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
        metadata: { questionId: activeQuestion?.id, questionIndex, phase },
      });
      onGameOver(score);
    }
  }, [activeQuestion?.id, lives, onGameOver, phase, questionIndex, score, sessionEvents, sessionState, timeLeft]);

  const resetPhase = useCallback((nextPhase: typeof phase) => {
    setPhase(nextPhase);
    setSelectedIndex(null);
    setLocked(false);
    setFeedback('');
  }, []);

  const advanceChain = useCallback(() => {
    const nextIndex = questionIndex + 1;
    if (nextIndex >= run.questions.length) {
      setStatus('complete');
      const earnedStars = starsForAccuracy(correctChains, run.questions.length, lives);
      emitMiniGameSessionEvent(sessionEvents, 'game_complete', {
        score,
        stars: earnedStars,
        metadata: { correct: correctChains, total: run.questions.length },
      });
      onVictory(earnedStars, score);
      return;
    }

    setQuestionIndex(nextIndex);
    resetPhase('answer');
  }, [correctChains, lives, onVictory, questionIndex, resetPhase, run.questions.length, score, sessionEvents]);

  const options = useMemo(() => {
    if (!activeQuestion) return [];
    if (phase === 'answer') return activeQuestion.answerChoices;
    if (phase === 'evidence') return activeQuestion.evidenceChoices;
    return activeQuestion.reasonChoices;
  }, [activeQuestion, phase]);

  const phasePrompt = useMemo(() => {
    if (phase === 'answer') return 'Step 1: Best answer';
    if (phase === 'evidence') return 'Step 2: Best evidence';
    return 'Step 3: Best reason';
  }, [phase]);

  const correctIndex = useMemo(() => {
    if (!activeQuestion) return 0;
    if (phase === 'answer') return activeQuestion.answerIndex;
    if (phase === 'evidence') return activeQuestion.evidenceIndex;
    return activeQuestion.reasonIndex;
  }, [activeQuestion, phase]);

  const handleCheck = useCallback(() => {
    if (!activeQuestion || locked || selectedIndex === null) return;
    setLocked(true);

    const isCorrect = selectedIndex === correctIndex;

    if (!isCorrect) {
      const nextScore = score;
      setFeedback('Not quite. Use the story to support your choice.');
      emitMiniGameSessionEvent(sessionEvents, 'incorrect_answer', {
        score: nextScore,
        metadata: { questionId: activeQuestion.id, questionIndex, phase },
      });
      if (!sessionState) {
        setLocalLives((prev) => Math.max(0, prev - 1));
      }
      setLocked(false);
      return;
    }

    setFeedback('Locked.');
    emitMiniGameSessionEvent(sessionEvents, 'correct_answer', {
      score,
      metadata: { questionId: activeQuestion.id, questionIndex, phase },
    });

    if (phase === 'answer') {
      resetPhase('evidence');
      return;
    }
    if (phase === 'evidence') {
      resetPhase('reason');
      return;
    }

    const nextScore = score + 220;
    setScore(nextScore);
    setCorrectChains((prev) => prev + 1);
    emitMiniGameSessionEvent(sessionEvents, 'puzzle_complete', {
      score: nextScore,
      metadata: { questionId: activeQuestion.id, questionIndex, correct: true },
    });
    setFeedback('Chain complete.');
  }, [activeQuestion, correctIndex, locked, phase, questionIndex, resetPhase, score, selectedIndex, sessionEvents, sessionState]);

  const headerSubtitle = useMemo(() => (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-black text-white/90">
        Chain {Math.min(questionIndex + 1, run.questions.length)}/{run.questions.length}
      </span>
      <span className="font-black text-white/80">
        Lives: {lives}{typeof timeLeft === 'number' ? ` | Time: ${timeLeft}s` : ''}
      </span>
    </div>
  ), [lives, questionIndex, run.questions.length, timeLeft]);

  const resolvedChain = phase === 'reason' && feedback === 'Chain complete.';

  return (
    <GameScreenLayout
      top={(
        <GameQuestionCard title="Evidence Chain" subtitle={headerSubtitle}>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">
                {phasePrompt}
              </div>
              <button
                type="button"
                onClick={() => setStoryOpen(true)}
                className="min-h-[44px] rounded-xl border border-white/15 bg-white/10 px-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_14px_28px_rgba(2,6,23,0.25)] hover:bg-white/15"
              >
                Read story
              </button>
            </div>
            <div className="text-base font-semibold text-white md:text-lg">
              {activeQuestion?.question}
            </div>
          </div>
        </GameQuestionCard>
      )}
      main={(
        <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
            {options.map((choice, index) => {
              const isSelected = selectedIndex === index;
              const showCorrect = resolvedChain && index === correctIndex;
              const showIncorrect = resolvedChain && isSelected && index !== correctIndex;

              const surfaceClass = showCorrect
                ? 'border-emerald-200/55 bg-emerald-300/15'
                : showIncorrect
                  ? 'border-rose-200/55 bg-rose-300/12'
                  : isSelected
                    ? 'border-amber-200/55 bg-amber-200/10'
                    : 'border-white/18 bg-white/8 hover:bg-white/10';

              return (
                <button
                  key={`${activeQuestion?.id ?? 'q'}-${phase}-${index}`}
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
                  <div className="mt-1 text-sm font-semibold leading-relaxed text-white md:text-base">
                    {choice}
                  </div>
                </button>
              );
            })}
          </div>

          {feedback ? (
            <FeedbackStrip tone={feedback === 'Chain complete.' ? 'success' : 'neutral'}>
              {feedback}
            </FeedbackStrip>
          ) : null}
        </div>
      )}
      bottom={(
        <div className="flex w-full flex-col gap-2 md:flex-row md:gap-3">
          {status !== 'playing' ? (
            <PrimaryActionButton onClick={onBack} className="h-14 w-full rounded-2xl text-base md:h-16 md:text-lg">
              Return
            </PrimaryActionButton>
          ) : resolvedChain ? (
            <PrimaryActionButton onClick={advanceChain} className="h-14 w-full rounded-2xl text-base md:h-16 md:text-lg">
              Next
            </PrimaryActionButton>
          ) : (
            <>
              <PrimaryActionButton
                onClick={handleCheck}
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
          )}
        </div>
      )}
      overlay={(
        <StoryOverlay
          open={storyOpen}
          title={run.passage.title}
          pages={run.passage.pages}
          onClose={() => setStoryOpen(false)}
        />
      )}
    />
  );
};

export default EvidenceChainGame;

