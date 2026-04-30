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
    id: 'sf-001',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'The wizard mixed the ___ carefully.',
    choices: ['potion', 'pochen', 'pocian', 'potian'],
    answerIndex: 0,
  },
  {
    id: 'sf-002',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'The ___ was hidden behind a waterfall.',
    choices: ['treasure', 'tresure', 'treshure', 'treasur'],
    answerIndex: 0,
  },
  {
    id: 'sf-003',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'She wrote the message on ___ parchment.',
    choices: ['ancient', 'anchient', 'ansient', 'antient'],
    answerIndex: 0,
  },
  {
    id: 'sf-004',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'The dragon was ___ after the long flight.',
    choices: ['exhausted', 'exosted', 'exhasted', 'exhousted'],
    answerIndex: 0,
  },
  {
    id: 'sf-005',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'The knight showed great ___.',
    choices: ['courage', 'corage', 'courrage', 'curage'],
    answerIndex: 0,
  },
  {
    id: 'sf-006',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'The path was ___ to follow at night.',
    choices: ['difficult', 'difecult', 'dificult', 'difficolt'],
    answerIndex: 0,
  },
  {
    id: 'sf-007',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'The apprentice tried to ___ the spell.',
    choices: ['remember', 'remembar', 'remeber', 'rememmer'],
    answerIndex: 0,
  },
  {
    id: 'sf-008',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'They travelled across the ___ valley.',
    choices: ['mysterious', 'misterious', 'mystirious', 'mysterios'],
    answerIndex: 0,
  },
  {
    id: 'sf-009',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'The crowd was ___ when the gates opened.',
    choices: ['excited', 'exited', 'ecxited', 'exsited'],
    answerIndex: 0,
  },
  {
    id: 'sf-010',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'The cave was ___ and cold.',
    choices: ['darkness', 'darknes', 'darkniss', 'darness'],
    answerIndex: 1,
  },
  {
    id: 'sf-011',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'He tried to ___ the treasure map.',
    choices: ['separate', 'seperate', 'sepparate', 'seperete'],
    answerIndex: 0,
  },
  {
    id: 'sf-012',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'The hero made a ___ decision.',
    choices: ['brilliant', 'briliant', 'briilliant', 'brillient'],
    answerIndex: 0,
  },
  {
    id: 'sf-013',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'The villagers gathered in the ___ square.',
    choices: ['centre', 'center', 'centar', 'sentor'],
    answerIndex: 0,
  },
  {
    id: 'sf-014',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'The wizard’s advice was very ___.',
    choices: ['useful', 'usefull', 'youseful', 'usful'],
    answerIndex: 0,
  },
  {
    id: 'sf-015',
    gameType: 'SPELLING_FORGE',
    prompt: 'Choose the correct spelling to complete the sentence.',
    sentence: 'The dragon’s scales were ___ in the light.',
    choices: ['shimmering', 'shimering', 'shimmeringg', 'shimmerring'],
    answerIndex: 0,
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

