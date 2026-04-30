import React, { useMemo } from 'react';
import EnglishGameShell, { EnglishMcqQuestion } from './EnglishGameShell';
import { getWordWardenRunQuestions } from '../../systems/content/english/wordWarden';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';

type WordWardenGameProps = {
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

const highlightTarget = (sentence: string, target: string) => {
  const index = sentence.toLowerCase().indexOf(target.toLowerCase());
  if (index < 0) return <span>{sentence}</span>;
  const before = sentence.slice(0, index);
  const match = sentence.slice(index, index + target.length);
  const after = sentence.slice(index + target.length);
  return (
    <span>
      {before}
      <span className="rounded-lg bg-amber-200/20 px-1.5 py-0.5 font-black text-amber-100 ring-1 ring-amber-200/35">
        {match}
      </span>
      {after}
    </span>
  );
};

const WordWardenGame: React.FC<WordWardenGameProps> = ({
  levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const questions = useMemo<EnglishMcqQuestion[]>(() => {
    const raw = getWordWardenRunQuestions(levelId, 10);
    return raw.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      stem: (
        <span>
          {highlightTarget(q.sentence, q.target)}
        </span>
      ),
      choices: q.choices,
      answerIndex: q.answerIndex,
    }));
  }, [levelId]);

  return (
    <EnglishGameShell
      title="Word Class Wars"
      levelId={levelId}
      questions={questions}
      onVictory={onVictory}
      onGameOver={onGameOver}
      onBack={onBack}
      sessionState={sessionState}
      sessionEvents={sessionEvents}
      feedbackCorrect="Correct word class."
      feedbackPrefixIncorrect="Not quite."
    />
  );
};

export default WordWardenGame;

