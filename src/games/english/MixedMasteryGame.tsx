import React, { useMemo } from 'react';
import EnglishGameShell, { EnglishMcqQuestion } from './EnglishGameShell';
import { getSummitRunQuestions } from '../../systems/content/english/summit';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';

type MixedMasteryGameProps = {
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

const MixedMasteryGame: React.FC<MixedMasteryGameProps> = ({
  levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const questions = useMemo<EnglishMcqQuestion[]>(() => {
    const raw = getSummitRunQuestions('MIXED_MASTERY', levelId, 10);
    return raw.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      stem: <span>Mixed mastery round.</span>,
      choices: q.choices,
      answerIndex: q.answerIndex,
    }));
  }, [levelId]);

  return (
    <EnglishGameShell
      title="Mixed Mastery"
      levelId={levelId}
      questions={questions}
      onVictory={onVictory}
      onGameOver={onGameOver}
      onBack={onBack}
      sessionState={sessionState}
      sessionEvents={sessionEvents}
      feedbackCorrect="Mastery gained."
      feedbackPrefixIncorrect="Not quite."
    />
  );
};

export default MixedMasteryGame;

