import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { GameQuestionCard, FeedbackStrip } from '../../components/game-ui/GameUiKit';
import { PrimaryActionButton, SecondaryActionButton } from '../../layout/ScreenPrimitives';
import { emitMiniGameSessionEvent } from '../../app/gameplaySessionContract';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';
import { shuffle, shuffleOptionsWithAnswerIndex } from '../../utils/questionShuffle';
import ReadingBookOverlay from '../../components/game-ui/ReadingBookOverlay';
import { READING_PAPER_PASSAGES, READING_PAPER_QUESTIONS } from '../../systems/content/english/readingPaper';

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

const starsForPercent = (percent: number) => {
  if (percent >= 0.8) return 3;
  if (percent >= 0.6) return 2;
  if (percent >= 0.4) return 1;
  return 0;
};

const normalize = (values: number[]) => [...values].sort((a, b) => a - b).join(',');

const normalizeAnswer = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9' ]/g, '').replace(/\s+/g, ' ');

const ReadingRescueGame: React.FC<ReadingRescueGameProps> = ({
  levelId: _levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const passages = READING_PAPER_PASSAGES;
  const questions = useMemo<BossQuestion[]>(() => {
    const passageOrder = shuffle(READING_PAPER_PASSAGES.map((_, index) => index));
    return passageOrder.flatMap(passageIndex => shuffle<BossQuestion>(
      READING_PAPER_QUESTIONS.filter(question => question.passageIndex === passageIndex),
    ).map(question => {
      if (question.type !== 'mcq') return question;
      const shuffled = shuffleOptionsWithAnswerIndex(question.choices, question.answerIndex);
      return { ...question, choices: shuffled.options, answerIndex: shuffled.answerIndex };
    }));
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
  const [earnedMarks, setEarnedMarks] = useState(0);
  const [score, setScore] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);

  const activeQuestion = questions[Math.min(questionIndex, Math.max(0, questions.length - 1))];
  const passage = passages[activeQuestion?.passageIndex ?? 0] ?? passages[0];
  const lives = sessionState?.lives ?? localLives;

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
      const correct = activeQuestion.type === 'mcq' ? activeQuestion.choices[activeQuestion.answerIndex]
        : activeQuestion.type === 'evidence' ? activeQuestion.answerIndices.map(index => activeQuestion.sentences[index]).join(' / ')
          : activeQuestion.answers[0];
      setFeedback(`Incorrect. Correct answer: ${correct}.`);
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
        Marks: {earnedMarks}/{totalMarks}{` | Lives: ${lives}`}
      </span>
    </div>
  ), [earnedMarks, lives, questionIndex, questions.length, totalMarks]);

  const isResolved = status === 'resolved' || status === 'complete' || status === 'gameover';

  return (
    <GameScreenLayout
      className="english-game-layout english-reading-layout"
      main={(
        <div className="relative flex h-full min-h-0 flex-col gap-3 overflow-hidden pb-1 md:gap-4">
          <ReadingBookOverlay
            title={passage.title}
            isOpen={isBookOpen}
            onOpen={() => setIsBookOpen(true)}
            onClose={() => setIsBookOpen(false)}
          >
            {passage.text.split('\n').map((line) => (
              <p key={line} className="m-0 mb-3 last:mb-0">
                {line}
              </p>
            ))}
          </ReadingBookOverlay>

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
            ) : activeQuestion?.type === 'evidence' ? (
              <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2">
                    {activeQuestion.sentences.map((sentence, index) => {
                      const isSelected = selectedEvidence.includes(index);
                      const isCorrect = activeQuestion.answerIndices.includes(index);
                      const showCorrect = isResolved && isCorrect;
                      const showIncorrect = isResolved && isSelected && !isCorrect;

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
                            'sats-answer-btn',
                            isResolved
                              ? (showCorrect ? 'sats-answer-btn--correct' : (showIncorrect ? 'sats-answer-btn--incorrect' : ''))
                              : (isSelected ? 'sats-answer-btn--selected' : ''),
                            'disabled:cursor-not-allowed disabled:opacity-70',
                          ].join(' ')}
                        >
                          <div className="text-xs font-semibold leading-snug md:text-sm">
                            {sentence}
                          </div>
                        </button>
                      );
                    })}
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

export default ReadingRescueGame;
