import { MiniGameType } from '../../../types';

export type WordWardenQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'WORD_WARDEN'>;
  prompt: string;
  sentence: string;
  target: string;
  choices: string[];
  answerIndex: number;
};

export const WORD_WARDEN_QUESTIONS: WordWardenQuestion[] = [
  {
    id: 'ww-001',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'Quickly, I packed my bag and left.',
    target: 'Quickly',
    choices: ['Noun', 'Verb', 'Adverb', 'Adjective'],
    answerIndex: 2,
  },
  {
    id: 'ww-002',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'I will run to the shop.',
    target: 'run',
    choices: ['Noun', 'Verb', 'Adverb', 'Adjective'],
    answerIndex: 1,
  },
  {
    id: 'ww-003',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'She felt happy after the test.',
    target: 'happy',
    choices: ['Noun', 'Verb', 'Adverb', 'Adjective'],
    answerIndex: 3,
  },
  {
    id: 'ww-004',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'The dog barked loudly.',
    target: 'dog',
    choices: ['Noun', 'Verb', 'Adverb', 'Adjective'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getWordWardenRunQuestions = (levelId: number, count = 10): WordWardenQuestion[] => {
  const base = rotate(WORD_WARDEN_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

