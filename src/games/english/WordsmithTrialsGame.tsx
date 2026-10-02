import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle, shuffleOptionsWithAnswerIndex } from '../../utils/questionShuffle';
import {
  CLAUSE_CRUSHER_QUESTIONS,
  COHESION_CONNECTOR_QUESTIONS,
  FORMAL_FIXER_QUESTIONS,
  GRAMMAR_GAUNTLET_QUESTIONS,
  NOUN_PHRASE_BUILDER_QUESTIONS,
  PUNCTUATION_PANIC_QUESTIONS,
  PUNCTUATION_MASTERY_QUESTIONS,
  PunctuationSlot,
  SENTENCE_SURGERY_QUESTIONS,
  SPELLBOUND_FORGE_QUESTIONS,
  TENSE_TRIALS_QUESTIONS,
  VOICE_SWITCH_VAULT_QUESTIONS,
  WORD_CLASS_WARS_QUESTIONS,
} from '../../systems/content/english/satsSpec';
import { buildExpandedNounPhrase } from '../../systems/content/english/nounPhrase';

type WordsmithTrialsGameProps = {
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

type BossQuestion =
  | {
    type: 'mcq';
    id: string;
    prompt: string;
    question: string;
    choices: string[];
    answerIndex: number;
    marks: number;
  }
  | {
    type: 'replace';
    id: string;
    prompt: string;
    sentence: string;
    wrongWord: string;
    replacements: string[];
    correctReplacementIndex: number;
    marks: number;
  }
  | {
    type: 'punct';
    id: string;
    prompt: string;
    parts: Array<string | PunctuationSlot>;
    marks: number;
  };

const MAX_LIVES = 3;

const starsForPercent = (percent: number) => {
  if (percent >= 0.8) return 3;
  if (percent >= 0.6) return 2;
  if (percent >= 0.4) return 1;
  return 0;
};

const isSlot = (part: string | PunctuationSlot): part is PunctuationSlot => typeof part !== 'string';

const WordsmithTrialsGame: React.FC<WordsmithTrialsGameProps> = ({
  levelId: _levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const questions = useMemo<BossQuestion[]>(() => {
    const mcq: BossQuestion[] = [
      ...shuffle(TENSE_TRIALS_QUESTIONS).slice(0, 2).map((q) => ({
        type: 'mcq' as const,
        id: q.id,
        prompt: q.prompt,
        question: q.question,
        choices: q.choices,
        answerIndex: q.answerIndex,
        marks: q.difficulty,
      })),
      ...shuffle(SENTENCE_SURGERY_QUESTIONS).slice(0, 2).map((q) => ({
        type: 'mcq' as const,
        id: q.id,
        prompt: q.prompt,
        question: q.question,
        choices: q.choices,
        answerIndex: q.answerIndex,
        marks: q.difficulty,
      })),
      ...shuffle(CLAUSE_CRUSHER_QUESTIONS).slice(0, 2).map((q) => ({
        type: 'mcq' as const,
        id: q.id,
        prompt: q.prompt,
        question: q.question,
        choices: q.choices,
        answerIndex: q.answerIndex,
        marks: q.difficulty,
      })),
      ...shuffle(WORD_CLASS_WARS_QUESTIONS).slice(0, 4).map((q) => ({
        type: 'mcq' as const,
        id: q.id,
        prompt: q.prompt,
        question: q.question,
        choices: q.choices,
        answerIndex: q.answerIndex,
        marks: q.difficulty,
      })),
      ...shuffle(SPELLBOUND_FORGE_QUESTIONS).slice(0, 4).map((q) => ({
        type: 'mcq' as const,
        id: q.id,
        prompt: q.prompt,
        question: q.question,
        choices: q.choices,
        answerIndex: q.answerIndex,
        marks: q.difficulty,
      })),
      ...shuffle(COHESION_CONNECTOR_QUESTIONS).slice(0, 1).map((q) => ({
        type: 'mcq' as const,
        id: q.id,
        prompt: q.prompt,
        question: q.sentence,
        choices: q.options,
        answerIndex: q.correctAnswerIndex,
        marks: q.difficulty,
      })),
      ...shuffle(VOICE_SWITCH_VAULT_QUESTIONS).slice(0, 1).map((q) => ({
        type: 'mcq' as const,
        id: q.id,
        prompt: q.prompt,
        question: `Is this sentence active or passive? ${q.sentence}`,
        choices: q.options,
        answerIndex: q.correctAnswerIndex,
        marks: q.difficulty,
      })),
      ...shuffle(NOUN_PHRASE_BUILDER_QUESTIONS).slice(0, 1).map((q) => {
        const [first, second, post] = q.correctSequence;
        return {
          type: 'mcq' as const,
          id: q.id,
          prompt: q.prompt,
          question: `Which phrase places all three modifiers correctly around the noun in “${q.base}”?`,
          choices: [
            buildExpandedNounPhrase(q.base, q.correctSequence),
            q.base.replace('___', `${first} ${second} ${post}`),
            q.base.replace('___', `${post} ${first} ${second}`),
            `${q.base.replace('___', '').trim()} ${first} ${second} ${post}`,
          ],
          answerIndex: 0,
          marks: q.difficulty,
        };
      }),
    ];

    const replace: BossQuestion[] = [...shuffle(GRAMMAR_GAUNTLET_QUESTIONS).slice(0, 3), ...shuffle(FORMAL_FIXER_QUESTIONS).slice(0, 1).map(q => ({
      id: q.id, prompt: q.prompt, sentence: q.sentence, wrongWord: q.informalPhrase,
      replacements: q.replacements, correctReplacementIndex: q.correctAnswerIndex, difficulty: q.difficulty,
    }))].map((q) => ({
      type: 'replace' as const,
      id: q.id,
      prompt: q.prompt,
      sentence: q.sentence,
      wrongWord: q.wrongWord,
      replacements: q.replacements,
      correctReplacementIndex: q.correctReplacementIndex,
      marks: q.difficulty,
    }));

    const punct: BossQuestion[] = [...shuffle(PUNCTUATION_PANIC_QUESTIONS).slice(0, 3), ...shuffle(PUNCTUATION_MASTERY_QUESTIONS).slice(0, 1)].map((q) => ({
      type: 'punct' as const,
      id: q.id,
      prompt: q.prompt,
      parts: q.parts.map(part => isSlot(part) ? { ...part, options: shuffle(part.options) } : part),
      marks: q.difficulty,
    }));

    const combined = shuffle([...mcq, ...replace, ...punct]).map((q) => {
      if (q.type === 'mcq') {
        const shuffled = shuffleOptionsWithAnswerIndex(q.choices, q.answerIndex);
        return { ...q, choices: shuffled.options, answerIndex: shuffled.answerIndex };
      }
      if (q.type === 'replace') {
        const shuffled = shuffleOptionsWithAnswerIndex(q.replacements, q.correctReplacementIndex);
        return { ...q, replacements: shuffled.options, correctReplacementIndex: shuffled.answerIndex };
      }
      return q;
    });

    return combined;
  }, []);

  const totalMarks = useMemo(() => questions.reduce((sum, q) => sum + q.marks, 0), [questions]);

  const [status, setStatus] = useState<'playing' | 'resolved' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [wrongWordTapped, setWrongWordTapped] = useState(false);
  const [selectedReplacementIndex, setSelectedReplacementIndex] = useState<number | null>(null);
  const [slotValues, setSlotValues] = useState<Record<string, string>>({});
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [localLives, setLocalLives] = useState(MAX_LIVES);
  const [earnedMarks, setEarnedMarks] = useState(0);
  const [score, setScore] = useState(0);

  const activeQuestion = questions[Math.min(questionIndex, Math.max(0, questions.length - 1))];
  const lives = sessionState?.lives ?? localLives;

  const initialSlotState = useMemo(() => {
    if (!activeQuestion || activeQuestion.type !== 'punct') return {};
    const state: Record<string, string> = {};
    activeQuestion.parts.forEach((part) => {
      if (!isSlot(part)) return;
      state[part.id] = part.options[0] ?? '';
    });
    return state;
  }, [activeQuestion]);

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
    setSelectedIndex(null);
    setWrongWordTapped(false);
    setSelectedReplacementIndex(null);
    setLocked(false);
    setFeedback('');
    setStatus('playing');
  }, []);

  const queueAdvance = useCallback((nextQuestionIndex: number, nextEarnedMarks: number, nextScore: number, nextLives: number) => {
    window.setTimeout(() => {
      if (nextLives <= 0) return;

      if (nextQuestionIndex >= questions.length) {
        setStatus('complete');
        const percent = totalMarks > 0 ? nextEarnedMarks / totalMarks : 0;
        const stars = starsForPercent(percent);
        emitMiniGameSessionEvent(sessionEvents, 'game_complete', {
          score: nextScore,
          stars,
          metadata: { marks: nextEarnedMarks, totalMarks },
        });
        onVictory(stars, nextScore);
        return;
      }

      setQuestionIndex(nextQuestionIndex);
      resetForNext();
    }, 1200);
  }, [onVictory, questions.length, resetForNext, sessionEvents, totalMarks]);

  const canSubmit = useMemo(() => {
    if (status !== 'playing' || locked) return false;
    if (!activeQuestion) return false;
    if (activeQuestion.type === 'mcq') return selectedIndex !== null;
    if (activeQuestion.type === 'replace') return wrongWordTapped && selectedReplacementIndex !== null;
    return true;
  }, [activeQuestion, locked, selectedIndex, selectedReplacementIndex, status, wrongWordTapped]);

  const handleSubmit = useCallback(() => {
    if (!activeQuestion || !canSubmit) return;
    setLocked(true);

    let isCorrect = false;
    let gainedMarks = 0;

    if (activeQuestion.type === 'mcq') {
      isCorrect = selectedIndex === activeQuestion.answerIndex;
      gainedMarks = isCorrect ? activeQuestion.marks : 0;
    } else if (activeQuestion.type === 'replace') {
      isCorrect = selectedReplacementIndex === activeQuestion.correctReplacementIndex;
      gainedMarks = isCorrect ? activeQuestion.marks : 0;
    } else {
      isCorrect = activeQuestion.parts.every((part) => (
        !isSlot(part) || (slotValues[part.id] ?? '') === part.correct
      ));
      gainedMarks = isCorrect ? activeQuestion.marks : 0;
    }

    const nextEarnedMarks = earnedMarks + gainedMarks;
    setEarnedMarks(nextEarnedMarks);

    const nextScore = score + (isCorrect ? 220 : 0);
    setScore(nextScore);

    const nextLives = sessionState ? lives : Math.max(0, lives - (isCorrect ? 0 : 1));
    const nextQuestionIndex = questionIndex + 1;

    if (isCorrect) {
      setFeedback(`Correct (+${gainedMarks} mark${gainedMarks === 1 ? '' : 's'}).`);
      emitMiniGameSessionEvent(sessionEvents, 'correct_answer', {
        score: nextScore,
        metadata: { questionId: activeQuestion.id, questionIndex, marks: gainedMarks },
      });
    } else {
      const correct = activeQuestion.type === 'mcq' ? activeQuestion.choices[activeQuestion.answerIndex]
        : activeQuestion.type === 'replace' ? activeQuestion.replacements[activeQuestion.correctReplacementIndex]
          : activeQuestion.parts.map(part => isSlot(part) ? part.correct : part).join('');
      setFeedback(`Incorrect. Correct answer: ${correct}`);
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
    queueAdvance(nextQuestionIndex, nextEarnedMarks, nextScore, nextLives);
  }, [activeQuestion, canSubmit, earnedMarks, lives, questionIndex, queueAdvance, score, selectedIndex, selectedReplacementIndex, sessionEvents, sessionState, slotValues]);

  const headerSubtitle = useMemo(() => (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-black text-white/90">
        Question {Math.min(questionIndex + 1, questions.length)}/{questions.length}
      </span>
      <span className="font-black text-white/80">
        Marks: {earnedMarks}/{totalMarks}{` | Lives: ${lives}`}
      </span>
    </div>
  ), [earnedMarks, lives, questionIndex, questions.length, totalMarks]);

  const isResolved = status === 'resolved' || status === 'complete' || status === 'gameover';

  const sentenceParts = useMemo(() => {
    if (!activeQuestion || activeQuestion.type !== 'replace') return { before: '', wrong: '', after: '' };
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
          <GameQuestionCard title="Trial of GPS" subtitle={headerSubtitle}>
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">
                {activeQuestion?.prompt}
              </div>
              <div className="text-base font-semibold text-white md:text-lg">
                {activeQuestion?.type === 'punct'
                  ? 'Insert the missing punctuation and capital letters.'
                  : activeQuestion?.type === 'replace'
                    ? 'Tap the incorrect word, then choose the replacement.'
                    : activeQuestion?.question}
              </div>
            </div>
          </GameQuestionCard>

          {activeQuestion?.type === 'mcq' ? (
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {activeQuestion.choices.map((choice, index) => {
                const isSelected = selectedIndex === index;
                const isCorrect = index === activeQuestion.answerIndex;
                const showCorrect = isResolved && isCorrect;
                const showIncorrect = isResolved && isSelected && !isCorrect;

                return (
                  <button
                    key={`${activeQuestion.id}-${choice}`}
                    type="button"
                    disabled={locked || status !== 'playing'}
                    onClick={() => {
                      if (locked || status !== 'playing') return;
                      setSelectedIndex(index);
                    }}
                    className={[
                      'sats-answer-btn',
                      isResolved
                        ? (showCorrect ? 'sats-answer-btn--correct' : (showIncorrect ? 'sats-answer-btn--incorrect' : ''))
                        : (isSelected ? 'sats-answer-btn--selected' : ''),
                      'disabled:cursor-not-allowed disabled:opacity-70',
                    ].join(' ')}
                  >
                    <div className="text-xs font-black uppercase tracking-[0.18em] opacity-80">
                      Option {index + 1}
                    </div>
                    <div className="mt-1 text-lg font-black md:text-xl">
                      {choice}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : activeQuestion?.type === 'replace' ? (
            <>
              <div className="english-gps-paper-sentence rounded-[1.4rem] border border-white/15 bg-white/8 p-4 shadow-[0_18px_34px_rgba(2,6,23,0.35)]">
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
                {activeQuestion.replacements.map((replacement, index) => {
                  const isSelected = selectedReplacementIndex === index;
                  const isCorrect = index === activeQuestion.correctReplacementIndex;
                  const showCorrect = isResolved && isCorrect;
                  const showIncorrect = isResolved && isSelected && !isCorrect;

                  return (
                    <button
                      key={`${activeQuestion.id}-rep-${replacement}`}
                      type="button"
                      disabled={!wrongWordTapped || locked || status !== 'playing'}
                      onClick={() => {
                        if (!wrongWordTapped || locked || status !== 'playing') return;
                        setSelectedReplacementIndex(index);
                      }}
                      className={[
                        'sats-answer-btn',
                        isResolved
                          ? (showCorrect ? 'sats-answer-btn--correct' : (showIncorrect ? 'sats-answer-btn--incorrect' : ''))
                          : (isSelected ? 'sats-answer-btn--selected' : ''),
                        'disabled:cursor-not-allowed disabled:opacity-70',
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
            </>
          ) : activeQuestion?.type === 'punct' ? (
            <div className="english-gps-paper-sentence rounded-[1.4rem] border border-white/15 bg-white/8 p-4 shadow-[0_18px_34px_rgba(2,6,23,0.35)]">
              <div className="text-sm font-semibold leading-relaxed text-white/95 md:text-base">
                {activeQuestion.parts.map((part) => {
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
          ) : null}

          {feedback ? (
            <FeedbackStrip tone={status === 'resolved' && feedback.startsWith('Correct') ? 'success' : 'neutral'}>
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

export default WordsmithTrialsGame;
