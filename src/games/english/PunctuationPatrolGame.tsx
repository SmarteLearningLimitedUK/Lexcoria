import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle } from '../../utils/questionShuffle';
import { PUNCTUATION_PANIC_QUESTIONS, PunctuationSlot } from '../../systems/content/english/satsSpec';
import punctuationPhantom from '../../assets/english/punctuation-phantom.png';

type PunctuationPatrolGameProps = {
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

const isSlot = (part: string | PunctuationSlot): part is PunctuationSlot => typeof part !== 'string';

const PunctuationPatrolGame: React.FC<PunctuationPatrolGameProps> = ({
  levelId: _levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const sessionQuestions = useMemo(() => shuffle(PUNCTUATION_PANIC_QUESTIONS), []);
  const maxEnemyHealth = Math.max(1, sessionQuestions.reduce((total, question) => total + question.difficulty, 0));

  const [status, setStatus] = useState<'playing' | 'resolved' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [localLives, setLocalLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [enemyHealth, setEnemyHealth] = useState(maxEnemyHealth);
  const [combo, setCombo] = useState(0);
  const [impact, setImpact] = useState<'hit' | 'miss' | null>(null);
  const [impactDamage, setImpactDamage] = useState(0);
  const [showEnemyTip, setShowEnemyTip] = useState(false);

  const activeQuestion = sessionQuestions[Math.min(questionIndex, Math.max(0, sessionQuestions.length - 1))];
  const lives = sessionState?.lives ?? localLives;

  const initialSlotState = useMemo(() => {
    const state: Record<string, string> = {};
    (activeQuestion?.parts ?? []).forEach((part) => {
      if (!isSlot(part)) return;
      state[part.id] = part.options[0] ?? '';
    });
    return state;
  }, [activeQuestion?.parts]);

  const [slotValues, setSlotValues] = useState<Record<string, string>>({});

  useEffect(() => {
    setSlotValues(initialSlotState);
  }, [initialSlotState]);

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
    setLocked(false);
    setFeedback('');
    setImpact(null);
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

  const slotsCorrect = useMemo(() => {
    const parts = activeQuestion?.parts ?? [];
    return parts.every((part) => (
      !isSlot(part) || (slotValues[part.id] ?? '') === part.correct
    ));
  }, [activeQuestion?.parts, slotValues]);

  const canSubmit = status === 'playing' && !locked;

  const handleSubmit = useCallback(() => {
    if (!activeQuestion || !canSubmit) return;
    setLocked(true);

    const isCorrect = slotsCorrect;
    const damage = activeQuestion.difficulty + (combo >= 2 ? 1 : 0);
    const nextScore = score + (isCorrect ? 160 + activeQuestion.difficulty * 20 + Math.min(combo, 4) * 20 : 0);
    setScore(nextScore);

    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    const nextLives = sessionState ? lives : Math.max(0, lives - (isCorrect ? 0 : 1));
    const nextQuestionIndex = questionIndex + 1;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setEnemyHealth((prev) => Math.max(0, prev - damage));
      setCombo((previous) => previous + 1);
      setImpactDamage(damage);
      setImpact('hit');
      setFeedback(`Punctuation fixed. ${damage} damage!`);
      emitMiniGameSessionEvent(sessionEvents, 'correct_answer', {
        score: nextScore,
        metadata: { questionId: activeQuestion.id, questionIndex },
      });
    } else {
      const correction = activeQuestion.parts.map((part) => isSlot(part) ? part.correct : part).join('');
      setCombo(0);
      setImpact('miss');
      setFeedback(`Not quite. Correct sentence: ${correction}`);
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
  }, [activeQuestion, canSubmit, combo, correctCount, lives, questionIndex, queueAdvance, score, sessionEvents, sessionState, slotsCorrect]);

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
  const enemyHealthPct = useMemo(() => (
    maxEnemyHealth > 0 ? Math.max(0, Math.min(1, enemyHealth / maxEnemyHealth)) : 0
  ), [enemyHealth, maxEnemyHealth]);

  return (
    <GameScreenLayout
      main={(
        <div className="english-punctuation-playfield flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4" data-question-id={activeQuestion?.id}>
          <GameQuestionCard title="Punctuation Panic" subtitle={headerSubtitle}>
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">
                {activeQuestion?.prompt}
              </div>
              <div className="text-base font-semibold text-white md:text-lg">
                Insert the missing punctuation and capital letters.
              </div>
            </div>
          </GameQuestionCard>

          <div className={`english-phantom-encounter ${impact ? `english-phantom-encounter--${impact}` : ''}`}>
            <button
              type="button"
              data-button-skin="none"
              className="english-phantom-portrait"
              onClick={() => setShowEnemyTip((previous) => !previous)}
              aria-label="Inspect Punctuation Phantom"
              aria-expanded={showEnemyTip}
            >
              <img src={punctuationPhantom} alt="" draggable={false} />
            </button>
            <div className="english-phantom-details">
              <div className="english-phantom-heading">
                <span>Punctuation Phantom</span>
                <span>HP {enemyHealth}/{maxEnemyHealth}</span>
              </div>
              <div
                className="english-phantom-health"
                role="progressbar"
                aria-label="Punctuation Phantom health"
                aria-valuemin={0}
                aria-valuemax={maxEnemyHealth}
                aria-valuenow={enemyHealth}
              >
                <div style={{ width: `${enemyHealthPct * 100}%` }} />
              </div>
              <div className="english-phantom-caption" aria-live="polite">
                {showEnemyTip
                  ? 'Harder fixes hit harder. Three in a row adds 1 damage.'
                  : impact === 'hit'
                    ? `−${impactDamage} HP · ${combo} hit chain`
                    : impact === 'miss'
                      ? 'Attack blocked · chain reset'
                      : 'Tap the phantom for battle rules'}
              </div>
            </div>
          </div>

          <div className="english-punctuation-sentence rounded-[1.4rem] border border-white/15 bg-white/8 p-4 shadow-[0_18px_34px_rgba(2,6,23,0.35)]">
            <div className="english-punctuation-instruction">Repair the sentence</div>
            <div className="english-punctuation-line text-sm font-semibold leading-relaxed text-white/95 md:text-base">
              {(activeQuestion?.parts ?? []).map((part) => {
                if (!isSlot(part)) return <span key={part}>{part}</span>;
                const value = slotValues[part.id] ?? part.options[0] ?? '';
                const isCorrect = value === part.correct;
                const showCorrect = isResolved && isCorrect;
                const showIncorrect = isResolved && !isCorrect;

                return (
                  <button
                    key={part.id}
                    type="button"
                    disabled={locked || status !== 'playing'}
                    onClick={() => {
                      if (locked || status !== 'playing') return;
                      setSlotValues((prev) => {
                        const current = prev[part.id] ?? part.options[0] ?? '';
                        const idx = Math.max(0, part.options.indexOf(current));
                        const next = part.options[(idx + 1) % part.options.length] ?? current;
                        return { ...prev, [part.id]: next };
                      });
                    }}
                    className={[
                      'sats-answer-btn mx-0.5 inline-flex !min-h-[48px] !w-auto items-center justify-center !rounded-xl !px-3 !py-2 !text-base !font-black !text-center',
                      isResolved
                        ? (showCorrect ? 'sats-answer-btn--correct' : (showIncorrect ? 'sats-answer-btn--incorrect' : ''))
                        : 'sats-answer-btn--selected',
                      'disabled:cursor-not-allowed disabled:opacity-70',
                    ].join(' ')}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>

          {feedback ? (
            <FeedbackStrip tone={status === 'resolved' && slotsCorrect ? 'success' : 'neutral'}>
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

export default PunctuationPatrolGame;
