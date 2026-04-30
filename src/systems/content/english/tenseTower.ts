import { MiniGameType } from '../../../types';

export type TenseTowerQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'TENSE_TOWER'>;
  prompt: string;
  sentence: string;
  target?: string;
  choices: string[];
  answerIndex: number;
};

export const TENSE_TOWER_QUESTIONS: TenseTowerQuestion[] = [
  {
    id: 'tt-001',
    gameType: 'TENSE_TOWER',
    prompt: 'What tense is used here?',
    sentence: 'The guards marched to the gate at dawn.',
    target: 'marched',
    choices: ['Past', 'Present', 'Future', 'Present progressive'],
    answerIndex: 0,
  },
  {
    id: 'tt-002',
    gameType: 'TENSE_TOWER',
    prompt: 'What tense is used here?',
    sentence: 'The dragon is circling above the castle.',
    target: 'is circling',
    choices: ['Present progressive', 'Past', 'Present', 'Past progressive'],
    answerIndex: 0,
  },
  {
    id: 'tt-003',
    gameType: 'TENSE_TOWER',
    prompt: 'What tense is used here?',
    sentence: 'They will return before nightfall.',
    target: 'will return',
    choices: ['Future', 'Past', 'Present', 'Past perfect'],
    answerIndex: 0,
  },
  {
    id: 'tt-004',
    gameType: 'TENSE_TOWER',
    prompt: 'What tense is used here?',
    sentence: 'By the time we arrived, the feast had ended.',
    target: 'had ended',
    choices: ['Past perfect', 'Past', 'Present perfect', 'Future perfect'],
    answerIndex: 0,
  },
  {
    id: 'tt-005',
    gameType: 'TENSE_TOWER',
    prompt: 'What tense is used here?',
    sentence: 'She has collected every rune stone.',
    target: 'has collected',
    choices: ['Present perfect', 'Past', 'Present', 'Past perfect'],
    answerIndex: 0,
  },
  {
    id: 'tt-006',
    gameType: 'TENSE_TOWER',
    prompt: 'What tense is used here?',
    sentence: 'The apprentice was practising spells when the bell rang.',
    target: 'was practising',
    choices: ['Past progressive', 'Past', 'Present progressive', 'Present'],
    answerIndex: 0,
  },
  {
    id: 'tt-007',
    gameType: 'TENSE_TOWER',
    prompt: 'What tense is used here?',
    sentence: 'The river rises every spring.',
    target: 'rises',
    choices: ['Present', 'Past', 'Future', 'Present perfect'],
    answerIndex: 0,
  },
  {
    id: 'tt-008',
    gameType: 'TENSE_TOWER',
    prompt: 'What tense is used here?',
    sentence: 'By tomorrow, we will have crossed the mountains.',
    target: 'will have crossed',
    choices: ['Future perfect', 'Present perfect', 'Past perfect', 'Future'],
    answerIndex: 0,
  },
  {
    id: 'tt-009',
    gameType: 'TENSE_TOWER',
    prompt: 'What tense is used here?',
    sentence: 'The scouts had been watching the road for hours.',
    target: 'had been watching',
    choices: ['Past perfect progressive', 'Past progressive', 'Present perfect progressive', 'Past perfect'],
    answerIndex: 0,
  },
  {
    id: 'tt-010',
    gameType: 'TENSE_TOWER',
    prompt: 'What tense is used here?',
    sentence: 'The villagers have been waiting outside.',
    target: 'have been waiting',
    choices: ['Present perfect progressive', 'Present progressive', 'Past perfect progressive', 'Past'],
    answerIndex: 0,
  },
  {
    id: 'tt-011',
    gameType: 'TENSE_TOWER',
    prompt: 'Choose the best verb form to complete the sentence.',
    sentence: 'Right now, the wizard ___ a new spell.',
    choices: ['is crafting', 'crafted', 'crafts', 'will craft'],
    answerIndex: 0,
  },
  {
    id: 'tt-012',
    gameType: 'TENSE_TOWER',
    prompt: 'Choose the best verb form to complete the sentence.',
    sentence: 'Yesterday, the knights ___ across the bridge.',
    choices: ['rode', 'ride', 'are riding', 'will ride'],
    answerIndex: 0,
  },
  {
    id: 'tt-013',
    gameType: 'TENSE_TOWER',
    prompt: 'Choose the best verb form to complete the sentence.',
    sentence: 'By the time the alarm sounded, the thief ___ .',
    choices: ['had escaped', 'escapes', 'will escape', 'has escaped'],
    answerIndex: 0,
  },
  {
    id: 'tt-014',
    gameType: 'TENSE_TOWER',
    prompt: 'Choose the best verb form to complete the sentence.',
    sentence: 'Every day, the blacksmith ___ the blades.',
    choices: ['sharpens', 'sharpened', 'is sharpening', 'will sharpen'],
    answerIndex: 0,
  },
  {
    id: 'tt-015',
    gameType: 'TENSE_TOWER',
    prompt: 'Choose the best verb form to complete the sentence.',
    sentence: 'Next week, we ___ to the lighthouse.',
    choices: ['will travel', 'travelled', 'travel', 'have travelled'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getTenseTowerRunQuestions = (levelId: number, count = 10): TenseTowerQuestion[] => {
  const base = rotate(TENSE_TOWER_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

