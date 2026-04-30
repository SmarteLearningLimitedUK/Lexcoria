import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle } from '../../utils/questionShuffle';
import { STORY_SEQUENCER_QUESTIONS } from '../../systems/content/english/satsSpec';

type StorySequencerGameProps = {
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
const TOTAL_TIME = 150;

const starsForAccuracy = (correct: number, total: number, lives: number) => {
  const accuracy = total > 0 ? correct / total : 0;
  if (accuracy >= 0.9 && lives >= 2) return 3;
  if (accuracy >= 0.7) return 2;
  return 1;
};

type SessionSequencerQuestion = {
  id: string;
  passageTitle: string;
  passageText: string;
  prompt: string;
  questionText: string;
  events: string[];
  correctOrderByEventId: number[];
  difficulty: number;
};

const StorySequencerGame: React.FC<StorySequencerGameProps> = ({
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const sessionQuestions = useMemo<SessionSequencerQuestion[]>(() => (
    shuffle(STORY_SEQUENCER_QUESTIONS).map((q) => {
      const ids = [0, 1, 2, 3];
      const shuffledIds = shuffle(ids);
      const events = shuffledIds.map((id) => q.events[id]);
      const correctOrderByEventId = q.correctOrder.map((id) => shuffledIds.indexOf(id));
      return {
        id: q.id,
        passageTitle: q.passageTitle,
        passageText: q.passageText,
        prompt: q.prompt,
        questionText: q.questionText,
        events,
        correctOrderByEventId,
        difficulty: q.difficulty,
      };
    })
  ), []);

  const [status, setStatus] = useState<'playing' | 'resolved' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
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
    setSelectedOrder([]);
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

  const isResolved = status === 'resolved' || status === 'complete' || status === 'gameover';
  const canSubmit = status === 'playing' && selectedOrder.length === 4 && !locked;

  const handleToggleEvent = useCallback((eventIndex: number) => {
    if (locked || status !== 'playing') return;
    setSelectedOrder((prev) => {
      if (prev.includes(eventIndex)) return prev.filter((id) => id !== eventIndex);
      if (prev.length >= 4) return prev;
      return [...prev, eventIndex];
    });
  }, [locked, status]);

  const handleSubmit = useCallback(() => {
    if (!activeQuestion || !canSubmit) return;
    setLocked(true);

    const expected = activeQuestion.correctOrderByEventId.join(',');
    const actual = selectedOrder.join(',');
    const isCorrect = expected === actual;

    const nextScore = score + (isCorrect ? 200 : 0);
    setScore(nextScore);
    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    setCorrectCount(nextCorrect);

    const nextLives = sessionState ? lives : Math.max(0, lives - (isCorrect ? 0 : 1));
    if (!sessionState && !isCorrect) setLocalLives(nextLives);

    const correctEvents = activeQuestion.correctOrderByEventId.map((id) => activeQuestion.events[id]).join(' → ');
    setFeedback(isCorrect ? 'Correct order!' : `Incorrect. Correct order: ${correctEvents}`);
    setStatus('resolved');

    emitMiniGameSessionEvent(sessionEvents, 'puzzle_complete', {
      score: nextScore,
      metadata: { questionId: activeQuestion.id, questionIndex, correct: isCorrect },
    });

    queueAdvance(questionIndex + 1, nextCorrect, nextScore, nextLives);
  }, [activeQuestion, canSubmit, correctCount, lives, questionIndex, queueAdvance, score, selectedOrder, sessionEvents, sessionState]);

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
      mainClassName="h-full"
      main={(
        <div className="grid h-full min-h-0 overflow-hidden pb-1" style={{ gridTemplateRows: '58% 42%' }}>
          <div className="flex min-h-0 flex-col overflow-hidden rounded-[1.4rem] border border-white/15 bg-white/8 shadow-[0_18px_34px_rgba(2,6,23,0.35)]">
            <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4">
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/70">Passage</div>
                <div className="mt-1 truncate text-base font-black text-white md:text-lg">{activeQuestion?.passageTitle}</div>
              </div>
              <SecondaryActionButton onClick={onBack} className="h-11 rounded-2xl px-5 text-xs md:h-12 md:text-sm">
                Exit
              </SecondaryActionButton>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 text-sm font-semibold leading-relaxed text-white/90 md:text-base">
              {(activeQuestion?.passageText ?? '').split('\n').map((line) => (
                <p key={line} className="m-0 mb-3 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="min-h-0 overflow-hidden pt-3">
            <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden">
              <GameQuestionCard title="Story Sequencer" subtitle={headerSubtitle}>
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">
                    {activeQuestion?.prompt}
                  </div>
                  <div className="text-base font-semibold text-white md:text-lg">
                    {activeQuestion?.questionText}
                  </div>
                </div>
              </GameQuestionCard>

              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {(activeQuestion?.events ?? []).map((event, index) => {
                  const position = selectedOrder.indexOf(index);
                  const isSelected = position >= 0;
                  const showCorrect = isResolved && activeQuestion.correctOrderByEventId[position] === index && isSelected;
                  const showIncorrect = isResolved && isSelected && !showCorrect;

                  const surfaceClass = showCorrect
                    ? 'border-emerald-200/55 bg-emerald-300/15'
                    : showIncorrect
                      ? 'border-rose-200/55 bg-rose-300/12'
                      : isSelected
                        ? 'border-amber-200/55 bg-amber-200/10'
                        : 'border-white/18 bg-white/8 hover:bg-white/10';

                  return (
                    <button
                      key={`${activeQuestion?.id ?? 'q'}-${event}`}
                      type="button"
                      disabled={locked || status !== 'playing'}
                      onClick={() => handleToggleEvent(index)}
                      className={[
                        'min-h-[64px] w-full rounded-2xl border px-4 py-3 text-left',
                        'shadow-[0_14px_28px_rgba(2,6,23,0.28)] transition-[transform,filter,background] duration-150',
                        'disabled:cursor-not-allowed disabled:opacity-70',
                        surfaceClass,
                      ].join(' ')}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100/70">
                          {isSelected ? `Position ${position + 1}` : 'Tap to add'}
                        </div>
                        <div className="text-xs font-black text-amber-100/80">
                          {isSelected ? `#${position + 1}` : ''}
                        </div>
                      </div>
                      <div className="mt-1 text-base font-black text-white md:text-lg">
                        {event}
                      </div>
                    </button>
                  );
                })}
              </div>

              {feedback ? (
                <FeedbackStrip tone={status === 'resolved' && selectedOrder.join(',') === activeQuestion?.correctOrderByEventId.join(',') ? 'success' : 'neutral'}>
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

export default StorySequencerGame;

