import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle, shuffleOptionsWithAnswerIndex } from '../../utils/questionShuffle';
import {
  AUTHOR_INTENT_QUESTIONS,
  EVIDENCE_HUNTER_PASSAGE,
  EVIDENCE_HUNTER_QUESTIONS,
  INFERENCE_ISLAND_PASSAGE,
  INFERENCE_ISLAND_QUESTIONS,
  SUMMIT_SUMMARISER_PASSAGE,
  SUMMIT_SUMMARISER_QUESTIONS,
  WORD_MEANING_WOODS_QUESTIONS,
} from '../../systems/content/english/satsSpec';

type ReadingRescueGameProps = {
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
    passageIndex: number;
    prompt: string;
    question: string;
    choices: string[];
    answerIndex: number;
    marks: number;
  }
  | {
    type: 'evidence';
    id: string;
    passageIndex: number;
    prompt: string;
    question: string;
    sentences: string[];
    answerIndices: number[];
    marks: number;
  }
  | {
    type: 'short';
    id: string;
    passageIndex: number;
    prompt: string;
    question: string;
    answers: string[];
    marks: number;
  };

const MAX_LIVES = 3;
const TOTAL_TIME = 12 * 60;

const starsForPercent = (percent: number) => {
  if (percent >= 0.8) return 3;
  if (percent >= 0.6) return 2;
  return 1;
};

const normalize = (values: number[]) => [...values].sort((a, b) => a - b).join(',');

const normalizeAnswer = (value: string) => value.trim().toLowerCase();

const ReadingRescueGame: React.FC<ReadingRescueGameProps> = ({
  levelId: _levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const passages = useMemo(() => ([
    {
      title: INFERENCE_ISLAND_PASSAGE.title,
      text: INFERENCE_ISLAND_PASSAGE.text,
    },
    {
      title: EVIDENCE_HUNTER_PASSAGE.title,
      text: EVIDENCE_HUNTER_PASSAGE.text,
    },
    {
      title: SUMMIT_SUMMARISER_PASSAGE.title,
      text: SUMMIT_SUMMARISER_PASSAGE.text,
    },
  ]), []);

  const questions = useMemo<BossQuestion[]>(() => {
    const mcq: BossQuestion[] = [
      ...INFERENCE_ISLAND_QUESTIONS.map((q) => ({
        type: 'mcq' as const,
        id: q.id,
        passageIndex: 0,
        prompt: q.prompt,
        question: q.question,
        choices: q.choices,
        answerIndex: q.answerIndex,
        marks: q.difficulty,
      })),
      ...WORD_MEANING_WOODS_QUESTIONS.map((q) => ({
        type: 'mcq' as const,
        id: q.id,
        passageIndex: 2,
        prompt: q.prompt,
        question: q.question,
        choices: q.choices,
        answerIndex: q.answerIndex,
        marks: q.difficulty,
      })),
      ...SUMMIT_SUMMARISER_QUESTIONS.map((q) => ({
        type: 'mcq' as const,
        id: q.id,
        passageIndex: 2,
        prompt: q.prompt,
        question: q.question,
        choices: q.choices,
        answerIndex: q.answerIndex,
        marks: q.difficulty,
      })),
      ...AUTHOR_INTENT_QUESTIONS.map((q) => ({
        type: 'mcq' as const,
        id: q.id,
        passageIndex: 2,
        prompt: q.prompt,
        question: q.question,
        choices: q.choices,
        answerIndex: q.answerIndex,
        marks: q.difficulty,
      })),
    ];

    const evidence: BossQuestion[] = EVIDENCE_HUNTER_QUESTIONS.map((q) => ({
      type: 'evidence' as const,
      id: q.id,
      passageIndex: 1,
      prompt: q.prompt,
      question: q.question,
      sentences: q.sentences,
      answerIndices: q.answerIndices,
      marks: q.difficulty,
    }));

    const short: BossQuestion[] = [
      {
        type: 'short',
        id: 'sr-001',
        passageIndex: 0,
        prompt: 'Short answer',
        question: 'What does Tom do before speaking?',
        answers: ['takes a deep breath', 'take a deep breath', 'he takes a deep breath', 'deep breath'],
        marks: 2,
      },
      {
        type: 'short',
        id: 'sr-002',
        passageIndex: 1,
        prompt: 'Short answer',
        question: 'Write one phrase that shows the wind is strong.',
        answers: ['wind howled louder than before', 'the wind howled louder than before', 'wind howled'],
        marks: 2,
      },
    ];

    const combined = [...mcq, ...evidence, ...short];
    return shuffle(combined).map((q) => {
      if (q.type !== 'mcq') return q;
      const shuffled = shuffleOptionsWithAnswerIndex(q.choices, q.answerIndex);
      return { ...q, choices: shuffled.options, answerIndex: shuffled.answerIndex };
    });
  }, []);

  const totalMarks = useMemo(() => questions.reduce((sum, q) => sum + q.marks, 0), [questions]);

  const [status, setStatus] = useState<'playing' | 'resolved' | 'complete' | 'gameover'>('playing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<number[]>([]);
  const [shortAnswer, setShortAnswer] = useState('');
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [localLives, setLocalLives] = useState(MAX_LIVES);
  const [localTimeLeft, setLocalTimeLeft] = useState(TOTAL_TIME);
  const [earnedMarks, setEarnedMarks] = useState(0);
  const [score, setScore] = useState(0);

  const activeQuestion = questions[Math.min(questionIndex, Math.max(0, questions.length - 1))];
  const passage = passages[activeQuestion?.passageIndex ?? 0] ?? passages[0];
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
    setSelectedEvidence([]);
    setShortAnswer('');
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
    if (activeQuestion.type === 'evidence') return selectedEvidence.length > 0;
    return normalizeAnswer(shortAnswer).length > 0;
  }, [activeQuestion, locked, selectedEvidence.length, selectedIndex, shortAnswer, status]);

  const handleSubmit = useCallback(() => {
    if (!activeQuestion || !canSubmit) return;
    setLocked(true);

    let isCorrect = false;
    let gainedMarks = 0;

    if (activeQuestion.type === 'mcq') {
      isCorrect = selectedIndex === activeQuestion.answerIndex;
      gainedMarks = isCorrect ? activeQuestion.marks : 0;
    } else if (activeQuestion.type === 'evidence') {
      isCorrect = normalize(selectedEvidence) === normalize(activeQuestion.answerIndices);
      gainedMarks = isCorrect ? activeQuestion.marks : 0;
    } else {
      const attempt = normalizeAnswer(shortAnswer);
      isCorrect = activeQuestion.answers.some((a) => normalizeAnswer(a) === attempt);
      gainedMarks = isCorrect ? activeQuestion.marks : 0;
    }

    const nextEarnedMarks = earnedMarks + gainedMarks;
    setEarnedMarks(nextEarnedMarks);

    const nextScore = score + (isCorrect ? 250 : 0);
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
      setFeedback('Incorrect. Correct answer is highlighted.');
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
  }, [activeQuestion, canSubmit, earnedMarks, lives, questionIndex, queueAdvance, score, selectedEvidence, selectedIndex, sessionEvents, sessionState, shortAnswer]);

  const headerSubtitle = useMemo(() => (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-black text-white/90">
        Question {Math.min(questionIndex + 1, questions.length)}/{questions.length}
      </span>
      <span className="font-black text-white/80">
        Marks: {earnedMarks}/{totalMarks}{typeof timeLeft === 'number' ? ` | Time: ${timeLeft}s` : ''}{` | Lives: ${lives}`}
      </span>
    </div>
  ), [earnedMarks, lives, questionIndex, questions.length, timeLeft, totalMarks]);

  const isResolved = status === 'resolved' || status === 'complete' || status === 'gameover';

  return (
    <GameScreenLayout
      main={(
        <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4">
          <div className="flex min-h-0 flex-[3] flex-col overflow-hidden rounded-[1.4rem] border border-white/15 bg-white/8 shadow-[0_18px_34px_rgba(2,6,23,0.35)]">
            <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4">
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/70">Passage</div>
                <div className="mt-1 truncate text-base font-black text-white md:text-lg">{passage.title}</div>
              </div>
              <SecondaryActionButton onClick={onBack} className="h-11 rounded-2xl px-5 text-xs md:h-12 md:text-sm">
                Exit
              </SecondaryActionButton>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 text-sm font-semibold leading-relaxed text-white/90 md:text-base">
              {passage.text.split('\n').map((line) => (
                <p key={line} className="m-0 mb-3 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="flex min-h-0 flex-[2] flex-col gap-3 overflow-hidden">
            <GameQuestionCard title="Trial of Reading" subtitle={headerSubtitle}>
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">
                  {activeQuestion?.prompt}
                </div>
                <div className="text-base font-semibold text-white md:text-lg">
                  {activeQuestion?.question}
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

                  const surfaceClass = showCorrect
                    ? 'border-emerald-200/55 bg-emerald-300/15'
                    : showIncorrect
                      ? 'border-rose-200/55 bg-rose-300/12'
                      : isSelected
                        ? 'border-amber-200/55 bg-amber-200/10'
                        : 'border-white/18 bg-white/8 hover:bg-white/10';

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
            ) : activeQuestion?.type === 'evidence' ? (
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.4rem] border border-white/15 bg-white/8 p-2 shadow-[0_18px_34px_rgba(2,6,23,0.35)]">
                <div className="min-h-0 flex-1 overflow-y-auto p-2">
                  <div className="space-y-2">
                    {activeQuestion.sentences.map((sentence, index) => {
                      const isSelected = selectedEvidence.includes(index);
                      const isCorrect = activeQuestion.answerIndices.includes(index);
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
                          key={`${activeQuestion.id}-sent-${index}`}
                          type="button"
                          disabled={locked || status !== 'playing'}
                          onClick={() => {
                            if (locked || status !== 'playing') return;
                            setSelectedEvidence((prev) => (
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
            ) : activeQuestion?.type === 'short' ? (
              <div className="rounded-[1.4rem] border border-white/15 bg-white/8 p-4 shadow-[0_18px_34px_rgba(2,6,23,0.35)]">
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-cyan-100/70">
                  Your answer
                  <input
                    value={shortAnswer}
                    onChange={(e) => setShortAnswer(e.target.value)}
                    disabled={locked || status !== 'playing'}
                    className="mt-2 h-14 w-full rounded-2xl border border-white/18 bg-slate-950/50 px-4 text-base font-semibold text-white outline-none ring-0"
                    placeholder="Type your answer"
                  />
                </label>
              </div>
            ) : null}

            {feedback ? (
              <FeedbackStrip tone={status === 'resolved' && feedback.startsWith('Correct') ? 'success' : 'neutral'}>
                {feedback}
              </FeedbackStrip>
            ) : null}
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

export default ReadingRescueGame;

