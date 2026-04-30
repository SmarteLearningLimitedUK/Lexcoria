import { MiniGameType } from '../../../types';

export type ToneTraderQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'TONE_TRADER'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const TONE_TRADER_QUESTIONS: ToneTraderQuestion[] = [
  {
    id: 'tt-001',
    gameType: 'TONE_TRADER',
    prompt: 'Choose the most formal replacement for the underlined phrase.',
    sentence: 'The guard said we should _get going_ at once.',
    choices: ['depart', 'bounce', 'leg it', 'head off quick'],
    answerIndex: 0,
  },
  {
    id: 'tt-002',
    gameType: 'TONE_TRADER',
    prompt: 'Choose the most formal replacement for the underlined phrase.',
    sentence: 'The wizard told the apprentice to _calm down_.',
    choices: ['compose yourself', 'chill', 'relax, ok?', 'settle it'],
    answerIndex: 0,
  },
  {
    id: 'tt-003',
    gameType: 'TONE_TRADER',
    prompt: 'Choose the most informal replacement for the underlined word.',
    sentence: 'The knight felt _exhausted_ after training.',
    choices: ['worn out', 'fatigued', 'debilitated', 'weary'],
    answerIndex: 0,
  },
  {
    id: 'tt-004',
    gameType: 'TONE_TRADER',
    prompt: 'Choose the most formal replacement for the underlined phrase.',
    sentence: 'The merchant asked if we could _pay up_.',
    choices: ['settle the payment', 'pay up', 'fork it over', 'hand over the cash'],
    answerIndex: 0,
  },
  {
    id: 'tt-005',
    gameType: 'TONE_TRADER',
    prompt: 'Choose the most informal replacement for the underlined word.',
    sentence: 'The weather became _unpleasant_.',
    choices: ['awful', 'inclement', 'adverse', 'disagreeable'],
    answerIndex: 0,
  },
  {
    id: 'tt-006',
    gameType: 'TONE_TRADER',
    prompt: 'Choose the word that best matches a polite, formal tone.',
    sentence: 'Please ____ your response by sunset.',
    choices: ['submit', 'send', 'shoot over', 'give'],
    answerIndex: 0,
  },
  {
    id: 'tt-007',
    gameType: 'TONE_TRADER',
    prompt: 'Choose the word that best matches an informal tone.',
    sentence: 'I was ____ when I found the hidden door.',
    choices: ['shocked', 'astonished', 'bewildered', 'startled'],
    answerIndex: 0,
  },
  {
    id: 'tt-008',
    gameType: 'TONE_TRADER',
    prompt: 'Choose the word that best matches a formal tone.',
    sentence: 'The council will ____ the plan tomorrow.',
    choices: ['consider', 'think about', 'chew over', 'have a look at'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getToneTraderRunQuestions = (levelId: number, count = 10): ToneTraderQuestion[] => {
  const base = rotate(TONE_TRADER_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

