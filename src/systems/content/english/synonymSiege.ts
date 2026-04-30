import { MiniGameType } from '../../../types';

export type SynonymSiegeQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'SYNONYM_SIEGE'>;
  prompt: string;
  sentence: string;
  target: string;
  choices: string[];
  answerIndex: number;
};

export const SYNONYM_SIEGE_QUESTIONS: SynonymSiegeQuestion[] = [
  {
    id: 'sy-001',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The villagers were delighted with the news.',
    target: 'delighted',
    choices: ['thrilled', 'bored', 'hungry', 'confused'],
    answerIndex: 0,
  },
  {
    id: 'sy-002',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The dragon was furious when it lost the gold.',
    target: 'furious',
    choices: ['angry', 'sleepy', 'careful', 'shy'],
    answerIndex: 0,
  },
  {
    id: 'sy-003',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'Mina was anxious before the final test.',
    target: 'anxious',
    choices: ['worried', 'joyful', 'lazy', 'tired'],
    answerIndex: 0,
  },
  {
    id: 'sy-004',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The wizard’s advice was sensible.',
    target: 'sensible',
    choices: ['reasonable', 'noisy', 'strange', 'tiny'],
    answerIndex: 0,
  },
  {
    id: 'sy-005',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The path was treacherous in the storm.',
    target: 'treacherous',
    choices: ['dangerous', 'beautiful', 'simple', 'dry'],
    answerIndex: 0,
  },
  {
    id: 'sy-006',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The cave was gloomy and cold.',
    target: 'gloomy',
    choices: ['dark', 'warm', 'cheerful', 'bright'],
    answerIndex: 0,
  },
  {
    id: 'sy-007',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The hero made a swift decision.',
    target: 'swift',
    choices: ['quick', 'slow', 'confusing', 'careless'],
    answerIndex: 0,
  },
  {
    id: 'sy-008',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The wizard spoke in a calm voice.',
    target: 'calm',
    choices: ['peaceful', 'angry', 'loud', 'wild'],
    answerIndex: 0,
  },
  {
    id: 'sy-009',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The villagers gathered in the centre of the square.',
    target: 'centre',
    choices: ['middle', 'edge', 'end', 'corner'],
    answerIndex: 0,
  },
  {
    id: 'sy-010',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The treasure was concealed behind the wall.',
    target: 'concealed',
    choices: ['hidden', 'shown', 'lost', 'dropped'],
    answerIndex: 0,
  },
  {
    id: 'sy-011',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The guard was stern with the crowd.',
    target: 'stern',
    choices: ['strict', 'funny', 'gentle', 'sleepy'],
    answerIndex: 0,
  },
  {
    id: 'sy-012',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'Mina glanced at the map.',
    target: 'glanced',
    choices: ['peeked', 'shouted', 'waited', 'forgot'],
    answerIndex: 0,
  },
  {
    id: 'sy-013',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The crowd grew restless.',
    target: 'restless',
    choices: ['uneasy', 'quiet', 'sleepy', 'frozen'],
    answerIndex: 0,
  },
  {
    id: 'sy-014',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The wizard was reluctant to help.',
    target: 'reluctant',
    choices: ['unwilling', 'eager', 'proud', 'careless'],
    answerIndex: 0,
  },
  {
    id: 'sy-015',
    gameType: 'SYNONYM_SIEGE',
    prompt: 'Choose the best synonym for the highlighted word.',
    sentence: 'The hero’s plan was ingenious.',
    target: 'ingenious',
    choices: ['clever', 'lazy', 'messy', 'noisy'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getSynonymSiegeRunQuestions = (levelId: number, count = 10): SynonymSiegeQuestion[] => {
  const base = rotate(SYNONYM_SIEGE_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

