import React, { useMemo } from 'react';
import EnglishReadingShell, { EnglishReadingQuestion } from './EnglishReadingShell';
import { TEXT_DETECTIVE_LEVELS, TextDetectiveSkillTag } from '../../systems/content/english/satsSpec';
import type { GameplaySessionEventHandlers, GameplaySessionState } from '../../app/gameplaySessionContract';

type TextDetectiveGameProps = {
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

const SKILL_PROMPTS: Record<TextDetectiveSkillTag, string> = {
  retrieval: 'Retrieval',
  sequence: 'Sequence',
  'vocabulary-in-context': 'Vocabulary',
  evidence: 'Evidence',
  'literal-comprehension': 'Comprehension',
};

const getRunForLevel = (levelId: number) => {
  const safeIndex = TEXT_DETECTIVE_LEVELS.length > 0
    ? Math.abs(levelId - 1) % TEXT_DETECTIVE_LEVELS.length
    : 0;
  return TEXT_DETECTIVE_LEVELS[safeIndex] ?? {
    passageTitle: 'Missing passage',
    passageText: 'No passage content is available for this level yet.',
    questions: [],
  };
};

const TextDetectiveGame: React.FC<TextDetectiveGameProps> = ({
  levelId,
  onVictory,
  onGameOver,
  onBack,
  sessionState,
  sessionEvents,
}) => {
  const run = useMemo(() => getRunForLevel(levelId), [levelId]);

  const questions = useMemo<EnglishReadingQuestion[]>(() => (
    run.questions.map((q) => ({
      id: q.id,
      prompt: SKILL_PROMPTS[q.skillTag] ?? 'Retrieval',
      question: q.questionText,
      choices: q.options,
      answerIndex: q.correctAnswerIndex,
    }))
  ), [run.questions]);

  return (
    <EnglishReadingShell
      title="Text Detective"
      levelId={levelId}
      storyTitle={run.passageTitle}
      storyPages={[run.passageText]}
      questions={questions}
      layoutPreset="text-detective"
      onVictory={onVictory}
      onGameOver={onGameOver}
      onBack={onBack}
      sessionState={sessionState}
      sessionEvents={sessionEvents}
    />
  );
};

export default TextDetectiveGame;

