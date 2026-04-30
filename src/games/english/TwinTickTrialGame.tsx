import React, { useMemo } from 'react';
import EnglishSelectTwoShell, { EnglishSelectTwoQuestion } from './EnglishSelectTwoShell';
import { getTwinTickTrialRunQuestions } from '../../systems/content/english/twinTickTrial';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';

type TwinTickTrialGameProps = {
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

const TwinTickTrialGame: React.FC<TwinTickTrialGameProps> = ({
  levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const questions = useMemo<EnglishSelectTwoQuestion[]>(() => {
    const raw = getTwinTickTrialRunQuestions(levelId, 5);
    return raw.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      question: q.question,
      choices: q.choices,
      answerIndices: q.answerIndices,
    }));
  }, [levelId]);

  return (
    <EnglishSelectTwoShell
      title="Twin Tick Trial"
      levelId={levelId}
      questions={questions}
      onVictory={onVictory}
      onGameOver={onGameOver}
      onBack={onBack}
      sessionState={sessionState}
      sessionEvents={sessionEvents}
    />
  );
};

export default TwinTickTrialGame;

