import React, { useMemo } from 'react';
import EnglishReadingShell, { EnglishReadingQuestion } from './EnglishReadingShell';
import { getAuthorIntentRun } from '../../systems/content/english/comprehension';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';

type AuthorIntentGameProps = {
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

const AuthorIntentGame: React.FC<AuthorIntentGameProps> = ({
  levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const run = useMemo(() => getAuthorIntentRun(levelId), [levelId]);
  const questions = useMemo<EnglishReadingQuestion[]>(() => run.questions.map((q) => ({
    id: q.id,
    prompt: q.prompt,
    question: q.question,
    choices: q.choices,
    answerIndex: q.answerIndex,
  })), [run.questions]);

  return (
    <EnglishReadingShell
      title="Author’s Intent Arena"
      levelId={levelId}
      storyTitle={run.passage.title}
      storyPages={run.passage.pages}
      questions={questions}
      onVictory={onVictory}
      onGameOver={onGameOver}
      onBack={onBack}
      sessionState={sessionState}
      sessionEvents={sessionEvents}
    />
  );
};

export default AuthorIntentGame;
