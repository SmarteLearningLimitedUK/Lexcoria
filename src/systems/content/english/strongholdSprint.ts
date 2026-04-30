import { MiniGameType } from '../../../types';

export type StrongholdSprintQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'STRONGHOLD_SPRINT'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation?: string;
};

export const STRONGHOLD_SPRINT_QUESTIONS: StrongholdSprintQuestion[] = [
  {
    id: 'ss-001',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['accomodate', 'accommodate', 'acommodate', 'accomoddate'],
    answerIndex: 1,
  },
  {
    id: 'ss-002',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['definately', 'definetely', 'definitely', 'definitly'],
    answerIndex: 2,
  },
  {
    id: 'ss-003',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['seperate', 'separate', 'seperrate', 'seperete'],
    answerIndex: 1,
  },
  {
    id: 'ss-004',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['necessary', 'neccessary', 'necesary', 'nessecary'],
    answerIndex: 0,
  },
  {
    id: 'ss-005',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['embarrass', 'embarass', 'embarras', 'emberrass'],
    answerIndex: 0,
  },
  {
    id: 'ss-006',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['occurred', 'occured', 'occurrred', 'ocurred'],
    answerIndex: 0,
  },
  {
    id: 'ss-007',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['mischievous', 'mischevious', 'mischievious', 'mischivous'],
    answerIndex: 0,
  },
  {
    id: 'ss-008',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['conscious', 'concsious', 'consious', 'conshious'],
    answerIndex: 0,
  },
  {
    id: 'ss-009',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['recommend', 'recomend', 'recommmend', 'recomendd'],
    answerIndex: 0,
  },
  {
    id: 'ss-010',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['harass', 'harrass', 'haras', 'harasse'],
    answerIndex: 0,
  },
  {
    id: 'ss-011',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['queue', 'que', 'cueue', 'quue'],
    answerIndex: 0,
  },
  {
    id: 'ss-012',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['rhythm', 'rythm', 'rythem', 'rhytm'],
    answerIndex: 0,
  },
  {
    id: 'ss-013',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['immediately', 'imediately', 'immediatly', 'imediatley'],
    answerIndex: 0,
  },
  {
    id: 'ss-014',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['bargain', 'bargin', 'bargein', 'baragin'],
    answerIndex: 0,
  },
  {
    id: 'ss-015',
    gameType: 'STRONGHOLD_SPRINT',
    prompt: 'Choose the correct spelling.',
    choices: ['environment', 'enviroment', 'environement', 'enviornment'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getStrongholdSprintRunQuestions = (levelId: number, count = 10): StrongholdSprintQuestion[] => {
  const base = rotate(STRONGHOLD_SPRINT_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

