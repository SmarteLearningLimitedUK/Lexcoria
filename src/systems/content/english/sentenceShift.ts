import { MiniGameType } from '../../../types';

export type SentenceShiftQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'SENTENCE_SHIFT'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
};

export const SENTENCE_SHIFT_QUESTIONS: SentenceShiftQuestion[] = [
  {
    id: 'ssft-001',
    gameType: 'SENTENCE_SHIFT',
    prompt: 'Choose the sentence that keeps the same meaning (active → passive).',
    choices: [
      'The guard caught the thief.',
      'The thief was caught by the guard.',
      'The thief caught the guard.',
      'The thief was catching the guard.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssft-002',
    gameType: 'SENTENCE_SHIFT',
    prompt: 'Choose the sentence that keeps the same meaning (passive → active).',
    choices: [
      'The gate was opened by the apprentice.',
      'The apprentice opened the gate.',
      'The gate opened the apprentice.',
      'The apprentice was opened by the gate.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssft-003',
    gameType: 'SENTENCE_SHIFT',
    prompt: 'Choose the most formal version.',
    choices: [
      'We gotta leave right now.',
      'We should leave right now.',
      'We ought to depart immediately.',
      'We’re leaving, ok?',
    ],
    answerIndex: 2,
  },
  {
    id: 'ssft-004',
    gameType: 'SENTENCE_SHIFT',
    prompt: 'Choose the sentence that keeps the same meaning (direct → reported speech).',
    choices: [
      'The wizard said that he was ready.',
      'The wizard said, "I am ready."',
      'The wizard said that I am ready.',
      'The wizard said, "He was ready."',
    ],
    answerIndex: 0,
  },
  {
    id: 'ssft-005',
    gameType: 'SENTENCE_SHIFT',
    prompt: 'Choose the sentence that keeps the same meaning (present → past).',
    choices: [
      'The dragon roars over the valley.',
      'The dragon roared over the valley.',
      'The dragon is roaring over the valley.',
      'The dragon will roar over the valley.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssft-006',
    gameType: 'SENTENCE_SHIFT',
    prompt: 'Choose the sentence that keeps the same meaning (expand with a relative clause).',
    choices: [
      'The knight, who wore silver armour, entered the hall.',
      'The knight entered the hall who wore silver armour.',
      'The knight wore silver armour entered the hall.',
      'The knight entered the hall and wore silver armour.',
    ],
    answerIndex: 0,
  },
  {
    id: 'ssft-007',
    gameType: 'SENTENCE_SHIFT',
    prompt: 'Choose the sentence that keeps the same meaning (add a fronted adverbial).',
    choices: [
      'Quickly, the apprentice ran to the tower.',
      'The apprentice ran, quickly the tower.',
      'The apprentice quickly, ran to the tower.',
      'The apprentice ran to, quickly the tower.',
    ],
    answerIndex: 0,
  },
  {
    id: 'ssft-008',
    gameType: 'SENTENCE_SHIFT',
    prompt: 'Choose the sentence that keeps the same meaning (change the order but not the sense).',
    choices: [
      'After the storm, the bridge collapsed.',
      'The bridge collapsed after the storm.',
      'After the bridge, the storm collapsed.',
      'The storm collapsed after the bridge.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssft-009',
    gameType: 'SENTENCE_SHIFT',
    prompt: 'Choose the sentence that keeps the meaning (use a modal verb).',
    choices: [
      'The team might win if they stay focused.',
      'The team wins if they might stay focused.',
      'The team might if they stay focused win.',
      'The team if they stay focused might wins.',
    ],
    answerIndex: 0,
  },
  {
    id: 'ssft-010',
    gameType: 'SENTENCE_SHIFT',
    prompt: 'Choose the sentence that keeps the meaning (use a subordinate clause).',
    choices: [
      'Because it was late, the campfire was put out.',
      'Because it was late the campfire, was put out.',
      'Because, it was late the campfire was put out.',
      'Because it was late the campfire was put, out.',
    ],
    answerIndex: 0,
  },
  {
    id: 'ssft-011',
    gameType: 'SENTENCE_SHIFT',
    prompt: 'Choose the sentence that keeps the meaning (swap the conjunction).',
    choices: [
      'The team rested although they wanted to continue.',
      'The team rested because they wanted to continue.',
      'The team rested unless they wanted to continue.',
      'The team rested so they wanted to continue.',
    ],
    answerIndex: 0,
  },
  {
    id: 'ssft-012',
    gameType: 'SENTENCE_SHIFT',
    prompt: 'Choose the sentence that keeps the meaning (add extra detail correctly).',
    choices: [
      'The tired guard, who had been awake all night, watched the gate.',
      'The tired guard who had been watched, all night the gate.',
      'The guard, tired who had been all night, watched gate.',
      'The guard watched the gate, tired who had been all night.',
    ],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getSentenceShiftRunQuestions = (levelId: number, count = 10): SentenceShiftQuestion[] => {
  const base = rotate(SENTENCE_SHIFT_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

