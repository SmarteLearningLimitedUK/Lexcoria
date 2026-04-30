import React, { useMemo } from 'react';
import EnglishGameShell, { EnglishMcqQuestion } from './EnglishGameShell';
import { getForgeRepairRunQuestions } from '../../systems/content/english/forgeRepair';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';

type ForgeRepairGameProps = {
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

const ForgeRepairGame: React.FC<ForgeRepairGameProps> = ({
  levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const questions = useMemo<EnglishMcqQuestion[]>(() => {
    const raw = getForgeRepairRunQuestions(levelId, 10);
    return raw.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      stem: <span>Pick the corrected sentence.</span>,
      choices: q.choices,
      answerIndex: q.answerIndex,
    }));
  }, [levelId]);

  return (
    <EnglishGameShell
      title="Forge Repair"
      levelId={levelId}
      questions={questions}
      onVictory={onVictory}
      onGameOver={onGameOver}
      onBack={onBack}
      sessionState={sessionState}
      sessionEvents={sessionEvents}
      feedbackCorrect="Repaired."
      feedbackPrefixIncorrect="That doesn’t fix it."
    />
  );
};

export default ForgeRepairGame;

