import { MiniGameType } from '../../../types';

export type BestAnswerQuestQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'BEST_ANSWER_QUEST'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
};

export const BEST_ANSWER_QUEST_QUESTIONS: BestAnswerQuestQuestion[] = [
  {
    id: 'baq-001',
    gameType: 'BEST_ANSWER_QUEST',
    prompt: 'Choose the best answer (close distractors).',
    choices: [
      'The wizard spoke loudly so everyone could hear.',
      'The wizard spoke softly so no one could hear.',
      'The wizard whispered so only one person could hear.',
      'The wizard whispered so no one could hear at all.',
    ],
    answerIndex: 2,
  },
  {
    id: 'baq-002',
    gameType: 'BEST_ANSWER_QUEST',
    prompt: 'Choose the best answer (close distractors).',
    choices: [
      'The guard was tired because he slept all day.',
      'The guard was tired because he stayed awake all night.',
      'The guard was excited because he stayed awake all night.',
      'The guard was tired because he never woke up.',
    ],
    answerIndex: 1,
  },
  {
    id: 'baq-003',
    gameType: 'BEST_ANSWER_QUEST',
    prompt: 'Choose the best answer (close distractors).',
    choices: [
      'The dragon was enormous, so it could fit through a tiny door.',
      'The dragon was enormous, so it cast a wide shadow.',
      'The dragon was enormous, so it was invisible.',
      'The dragon was enormous, so it was quieter than a mouse.',
    ],
    answerIndex: 1,
  },
  {
    id: 'baq-004',
    gameType: 'BEST_ANSWER_QUEST',
    prompt: 'Choose the best answer (close distractors).',
    choices: [
      'The map was accurate because it was drawn carefully.',
      'The map was accurate because it was scribbled in a hurry.',
      'The map was accurate because it was missing important details.',
      'The map was accurate because it was written in water.',
    ],
    answerIndex: 0,
  },
  {
    id: 'baq-005',
    gameType: 'BEST_ANSWER_QUEST',
    prompt: 'Choose the best answer (close distractors).',
    choices: [
      'The crowd was silent because they were cheering.',
      'The crowd was silent because they were listening carefully.',
      'The crowd was silent because they were shouting.',
      'The crowd was silent because they were laughing loudly.',
    ],
    answerIndex: 1,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getBestAnswerQuestRunQuestions = (levelId: number, count = 10): BestAnswerQuestQuestion[] => {
  const base = rotate(BEST_ANSWER_QUEST_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

