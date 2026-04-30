import React, { useMemo } from 'react';
import EnglishGameShell, { EnglishMcqQuestion } from './EnglishGameShell';
import { getTenseTowerRunQuestions } from '../../systems/content/english/tenseTower';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';

type TenseTowerGameProps = {
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

const highlightBlank = (sentence: string) => {
  const blankIndex = sentence.indexOf('___');
  if (blankIndex < 0) return <span>{sentence}</span>;
  const before = sentence.slice(0, blankIndex);
  const after = sentence.slice(blankIndex + 3);
  return (
    <span>
      {before}
      <span className="rounded-lg bg-amber-200/20 px-1.5 py-0.5 font-black text-amber-100 ring-1 ring-amber-200/35">
        ___
      </span>
      {after}
    </span>
  );
};

const TenseTowerGame: React.FC<TenseTowerGameProps> = ({
  levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const questions = useMemo<EnglishMcqQuestion[]>(() => {
    const raw = getTenseTowerRunQuestions(levelId, 10);
    return raw.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      stem: (
        <span className="whitespace-pre-line">
          {highlightBlank(q.sentence)}
        </span>
      ),
      choices: q.choices,
      answerIndex: q.answerIndex,
    }));
  }, [levelId]);

  return (
    <EnglishGameShell
      title="Tense Trials"
      levelId={levelId}
      questions={questions}
      onVictory={onVictory}
      onGameOver={onGameOver}
      onBack={onBack}
      sessionState={sessionState}
      sessionEvents={sessionEvents}
      feedbackCorrect="Correct tense."
      feedbackPrefixIncorrect="Not quite."
    />
  );
};

export default TenseTowerGame;

