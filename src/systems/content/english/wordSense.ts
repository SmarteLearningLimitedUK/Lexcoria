import { MiniGameType } from '../../../types';

export type WordSenseQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'WORD_SENSE'>;
  prompt: string;
  sentence: string;
  focus: string;
  choices: string[];
  answerIndex: number;
};

export const WORD_SENSE_QUESTIONS: WordSenseQuestion[] = [
  {
    id: 'ws-001',
    gameType: 'WORD_SENSE',
    prompt: 'In this sentence, what does the focus word mean?',
    sentence: 'The path was narrow, so we walked carefully in single file.',
    focus: 'narrow',
    choices: ['Wide', 'Thin', 'Bright', 'Long'],
    answerIndex: 1,
  },
  {
    id: 'ws-002',
    gameType: 'WORD_SENSE',
    prompt: 'In this sentence, what does the focus word mean?',
    sentence: 'She was exhausted after the long walk.',
    focus: 'exhausted',
    choices: ['Happy', 'Tired', 'Angry', 'Fast'],
    answerIndex: 1,
  },
  {
    id: 'ws-003',
    gameType: 'WORD_SENSE',
    prompt: 'In this sentence, what does the focus word mean?',
    sentence: 'The room was gloomy, even in the afternoon.',
    focus: 'gloomy',
    choices: ['Bright', 'Dark and dull', 'Clean', 'Loud'],
    answerIndex: 1,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getWordSenseRunQuestions = (levelId: number, count = 10): WordSenseQuestion[] => {
  const base = rotate(WORD_SENSE_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

