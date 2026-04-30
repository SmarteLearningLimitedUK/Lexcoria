import { MiniGameType } from '../../../types';

export type TwinTickTrialQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'TWIN_TICK_TRIAL'>;
  prompt: string;
  question: string;
  choices: string[];
  answerIndices: [number, number];
};

export const TWIN_TICK_TRIAL_QUESTIONS: TwinTickTrialQuestion[] = [
  {
    id: 'ttt-001',
    gameType: 'TWIN_TICK_TRIAL',
    prompt: 'Tick two',
    question: 'Which two sentences are punctuated correctly?',
    choices: [
      'When the bell rang the guards ran outside.',
      'When the bell rang, the guards ran outside.',
      'The dragon roared; the villagers hid.',
      'The dragon roared; and the villagers hid.',
    ],
    answerIndices: [1, 2],
  },
  {
    id: 'ttt-002',
    gameType: 'TWIN_TICK_TRIAL',
    prompt: 'Tick two',
    question: 'Which two words are synonyms for "brave"?',
    choices: ['cowardly', 'courageous', 'timid', 'bold'],
    answerIndices: [1, 3],
  },
  {
    id: 'ttt-003',
    gameType: 'TWIN_TICK_TRIAL',
    prompt: 'Tick two',
    question: 'Which two sentences use the apostrophe correctly?',
    choices: [
      "The knight's armour was heavy.",
      'The knights armour was heavy.',
      "The dragons' wings were huge.",
      "The dragon's wings were huge.",
    ],
    answerIndices: [0, 2],
  },
  {
    id: 'ttt-004',
    gameType: 'TWIN_TICK_TRIAL',
    prompt: 'Tick two',
    question: 'Which two options are adverbs?',
    choices: ['quickly', 'quick', 'silently', 'silence'],
    answerIndices: [0, 2],
  },
  {
    id: 'ttt-005',
    gameType: 'TWIN_TICK_TRIAL',
    prompt: 'Tick two',
    question: 'Which two sentences are written in standard English?',
    choices: [
      'Me and my friend went to the harbour.',
      'My friend and I went to the harbour.',
      "I ain't got any coins.",
      "I haven't got any coins.",
    ],
    answerIndices: [1, 3],
  },
  {
    id: 'ttt-006',
    gameType: 'TWIN_TICK_TRIAL',
    prompt: 'Tick two',
    question: 'Which two words are antonyms of "ancient"?',
    choices: ['modern', 'old', 'recent', 'historic'],
    answerIndices: [0, 2],
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getTwinTickTrialRunQuestions = (levelId: number, count = 5): TwinTickTrialQuestion[] => {
  const base = rotate(TWIN_TICK_TRIAL_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

