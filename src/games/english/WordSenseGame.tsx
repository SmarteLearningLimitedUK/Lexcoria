import React, { useMemo } from 'react';
import EnglishGameShell, { EnglishMcqQuestion } from './EnglishGameShell';
import { getWordSenseRunQuestions } from '../../systems/content/english/wordSense';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';

type WordSenseGameProps = {
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

const WordSenseGame: React.FC<WordSenseGameProps> = ({
  levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const questions = useMemo<EnglishMcqQuestion[]>(() => {
    const raw = getWordSenseRunQuestions(levelId, 10);
    return raw.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      stem: (
        <span>
          <span className="font-black text-amber-100">{q.focus}</span>
          <span className="text-white/90"> — {q.sentence}</span>
        </span>
      ),
      choices: q.choices,
      answerIndex: q.answerIndex,
    }));
  }, [levelId]);

  return (
    <EnglishGameShell
      title="Word Meaning Woods"
      levelId={levelId}
      questions={questions}
      onVictory={onVictory}
      onGameOver={onGameOver}
      onBack={onBack}
      sessionState={sessionState}
      sessionEvents={sessionEvents}
      feedbackCorrect="Meaning found."
      feedbackPrefixIncorrect="That meaning doesn’t fit."
    />
  );
};

export default WordSenseGame;
