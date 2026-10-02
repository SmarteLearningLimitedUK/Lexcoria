import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle } from '../../utils/questionShuffle';
import { NOUN_PHRASE_BUILDER_QUESTIONS } from '../../systems/content/english/satsSpec';
import { buildExpandedNounPhrase } from '../../systems/content/english/nounPhrase';

type NounPhraseBuilderGameProps = {
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

const NounPhraseBuilderGame: React.FC<NounPhraseBuilderGameProps> = ({
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const sessionQuestions = useMemo(() => shuffle(NOUN_PHRASE_BUILDER_QUESTIONS), []);

  const [status, setStatus] = useState<'playing' | 'resolved' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [localLives, setLocalLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const activeQuestion = sessionQuestions[Math.min(questionIndex, Math.max(0, sessionQuestions.length - 1))];
  const lives = sessionState?.lives ?? localLives;

  const shuffledModifiers = useMemo(() => (
    activeQuestion ? shuffle([...activeQuestion.modifiers]) : []
  ), [activeQuestion]);

  useEffect(() => {
    setSelected([]);
    setLocked(false);
    setFeedback('');
    setStatus('playing');
  }, [activeQuestion?.id]);

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

  const canSubmit = status === 'playing' && selected.length === (activeQuestion?.modifiers.length ?? 0) && !locked;

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

  const handleAdd = useCallback((token: string) => {
    if (locked || status !== 'playing') return;
    setSelected((prev) => {
      if (prev.includes(token)) return prev;
      if (activeQuestion && prev.length >= activeQuestion.modifiers.length) return prev;
      return [...prev, token];
    });
  }, [activeQuestion, locked, status]);

  const handleRemove = useCallback((token: string) => {
    if (locked || status !== 'playing') return;
    setSelected((prev) => prev.filter((t) => t !== token));
  }, [locked, status]);

  const handleSubmit = useCallback(() => {
    if (!activeQuestion || !canSubmit) return;
    setLocked(true);

    const expected = activeQuestion.correctSequence.join('|');
    const actual = selected.join('|');
    const isCorrect = expected === actual;

    const nextScore = score + (isCorrect ? 170 : 0);
    setScore(nextScore);

    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    setCorrectCount(nextCorrect);

    const nextLives = sessionState ? lives : Math.max(0, lives - (isCorrect ? 0 : 1));
    if (!sessionState && !isCorrect) setLocalLives(nextLives);

    const fullPhrase = buildExpandedNounPhrase(activeQuestion.base, activeQuestion.correctSequence);
    setFeedback(isCorrect ? 'Correct!' : `Incorrect. Correct phrase: ${fullPhrase}`);
    setStatus('resolved');

    emitMiniGameSessionEvent(sessionEvents, 'puzzle_complete', {
      score: nextScore,
      metadata: { questionId: activeQuestion.id, questionIndex, correct: isCorrect },
    });

    queueAdvance(questionIndex + 1, nextCorrect, nextScore, nextLives);
  }, [activeQuestion, canSubmit, correctCount, lives, questionIndex, queueAdvance, score, selected, sessionEvents, sessionState]);

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

  const builtPhrase = useMemo(() => {
    if (!activeQuestion) return '';
    return selected.length > 0 ? buildExpandedNounPhrase(activeQuestion.base, selected) : activeQuestion.base;
  }, [activeQuestion, selected]);

  return (
    <GameScreenLayout
      main={(
        <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4">
          <GameQuestionCard title="Noun Phrase Builder" subtitle={headerSubtitle}>
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">
                {activeQuestion?.prompt}
              </div>
              <div className="text-base font-semibold text-white md:text-lg">
                Build the expanded noun phrase.
              </div>
              <div className="mt-2 rounded-2xl border border-white/15 bg-slate-950/35 px-4 py-3 text-lg font-black text-white">
                {builtPhrase}
              </div>
            </div>
          </GameQuestionCard>

          <div className="rounded-[1.2rem] border border-white/15 bg-white/6 p-3">
            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/70">Selected</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {selected.length === 0 ? (
                <div className="text-sm font-semibold text-white/70">Tap modifiers below to add them.</div>
              ) : selected.map((token) => (
                <button
                  key={`sel-${token}`}
                  type="button"
                  disabled={locked || status !== 'playing'}
                  onClick={() => handleRemove(token)}
                  className="sats-answer-btn sats-answer-btn--selected !min-h-[48px] !rounded-full !px-4 !py-2 !text-sm !font-black"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {shuffledModifiers.map((token) => {
              const isUsed = selected.includes(token);
              return (
                <button
                  key={`mod-${token}`}
                  type="button"
                  disabled={isUsed || locked || status !== 'playing'}
                  onClick={() => handleAdd(token)}
                  className={[
                    'sats-answer-btn',
                    'disabled:cursor-not-allowed disabled:opacity-60',
                    isUsed ? '!opacity-35' : '',
                  ].join(' ')}
                >
                  <div className="text-base font-black md:text-lg">
                    {token}
                  </div>
                </button>
              );
            })}
          </div>

          {feedback ? (
            <FeedbackStrip tone={status === 'resolved' && selected.join('|') === activeQuestion?.correctSequence.join('|') ? 'success' : 'neutral'}>
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

export default NounPhraseBuilderGame;
