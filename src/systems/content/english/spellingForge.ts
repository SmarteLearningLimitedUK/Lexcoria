import { MiniGameType } from '../../../types';

export type SpellingForgeQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'SPELLING_FORGE'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const SPELLING_FORGE_QUESTIONS: SpellingForgeQuestion[] = [
  {
    id: 'sf-spec-001',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling.',
    sentence: 'Select the correct spelling:',
    choices: ['recieve', 'receive', 'receeve', 'receve'],
    answerIndex: 1,
  },
  {
    id: 'sf-spec-002',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling.',
    sentence: 'Select the correct spelling:',
    choices: ['definately', 'definitely', 'definetly', 'definetely'],
    answerIndex: 1,
  },
  {
    id: 'sf-spec-003',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling.',
    sentence: 'Select the correct spelling:',
    choices: ['seperate', 'separate', 'separite', 'seperrate'],
    answerIndex: 1,
  },
  {
    id: 'sf-spec-004',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling.',
    sentence: 'Select the correct spelling:',
    choices: ['accomodate', 'accommodate', 'acommodate', 'accommadate'],
    answerIndex: 1,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getSpellingForgeRunQuestions = (levelId: number, count = 10): SpellingForgeQuestion[] => {
  const base = rotate(SPELLING_FORGE_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

