import { MiniGameType } from '../../../types';

export type ForgeOfSuffixesQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'FORGE_OF_SUFFIXES'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation?: string;
};

export const FORGE_OF_SUFFIXES_QUESTIONS: ForgeOfSuffixesQuestion[] = [
  {
    id: 'fs-001',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The knight showed great ____."',
    choices: ['bravery', 'braveful', 'braveism', 'braveling'],
    answerIndex: 0,
  },
  {
    id: 'fs-002',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The wizard made a quick ____."',
    choices: ['decide', 'decision', 'deciding', 'decisive'],
    answerIndex: 1,
  },
  {
    id: 'fs-003',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The path was ____ after the storm."',
    choices: ['danger', 'dangerous', 'dangerly', 'dangerment'],
    answerIndex: 1,
  },
  {
    id: 'fs-004',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "It was a ____ mistake."',
    choices: ['careless', 'carelessness', 'carelessly', 'carelessment'],
    answerIndex: 0,
  },
  {
    id: 'fs-005',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The dragon was ____ by the noise."',
    choices: ['annoy', 'annoyed', 'annoying', 'annoyment'],
    answerIndex: 1,
  },
  {
    id: 'fs-006',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The messenger spoke ____."',
    choices: ['clear', 'clearly', 'clearness', 'clearful'],
    answerIndex: 1,
  },
  {
    id: 'fs-007',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The castle needed ____."',
    choices: ['repair', 'repairs', 'repairment', 'repairful'],
    answerIndex: 1,
  },
  {
    id: 'fs-008',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "Her ____ made everyone laugh."',
    choices: ['silly', 'silliness', 'sillily', 'sillyful'],
    answerIndex: 1,
  },
  {
    id: 'fs-009',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The potion was ____ to drink."',
    choices: ['safe', 'safely', 'safety', 'safeness'],
    answerIndex: 2,
  },
  {
    id: 'fs-010',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The explorer moved with ____."',
    choices: ['care', 'careful', 'carefully', 'carefulness'],
    answerIndex: 2,
  },
  {
    id: 'fs-011',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The spell had a strange ____."',
    choices: ['effect', 'effective', 'effectly', 'effectness'],
    answerIndex: 0,
  },
  {
    id: 'fs-012',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The scroll was ____ to read."',
    choices: ['possible', 'possibility', 'possibly', 'possiblest'],
    answerIndex: 0,
  },
  {
    id: 'fs-013',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The crowd waited in ____."',
    choices: ['excite', 'excited', 'exciting', 'excitement'],
    answerIndex: 3,
  },
  {
    id: 'fs-014',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The room was filled with ____."',
    choices: ['darkness', 'darken', 'darkly', 'darkful'],
    answerIndex: 0,
  },
  {
    id: 'fs-015',
    gameType: 'FORGE_OF_SUFFIXES',
    prompt: 'Choose the best word: "The knight was ____ for the quest."',
    choices: ['ready', 'readiness', 'readily', 'readiment'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getForgeOfSuffixesRunQuestions = (levelId: number, count = 10): ForgeOfSuffixesQuestion[] => {
  const base = rotate(FORGE_OF_SUFFIXES_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

