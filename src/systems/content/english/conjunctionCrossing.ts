import { MiniGameType } from '../../../types';

export type ConjunctionCrossingQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'CONJUNCTION_CROSSING'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const CONJUNCTION_CROSSING_QUESTIONS: ConjunctionCrossingQuestion[] = [
  {
    id: 'cc-001',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: 'The storm grew louder, ___ the travellers kept walking.',
    choices: ['but', 'because', 'so', 'before'],
    answerIndex: 0,
  },
  {
    id: 'cc-002',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: 'We stayed inside ___ the rain stopped.',
    choices: ['until', 'although', 'and', 'however'],
    answerIndex: 0,
  },
  {
    id: 'cc-003',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: 'The wizard smiled ___ the spell finally worked.',
    choices: ['because', 'unless', 'but', 'while'],
    answerIndex: 0,
  },
  {
    id: 'cc-004',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: '___ you practise, you will improve.',
    choices: ['If', 'Since', 'While', 'However'],
    answerIndex: 0,
  },
  {
    id: 'cc-005',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: 'The guard opened the gate ___ he recognised the crest.',
    choices: ['when', 'before', 'unless', 'although'],
    answerIndex: 0,
  },
  {
    id: 'cc-006',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: 'The path was narrow, ___ they walked carefully.',
    choices: ['so', 'but', 'because', 'though'],
    answerIndex: 0,
  },
  {
    id: 'cc-007',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: 'I will carry the lantern ___ you read the map.',
    choices: ['while', 'because', 'but', 'until'],
    answerIndex: 0,
  },
  {
    id: 'cc-008',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: 'The dragon roared ___ the villagers hid.',
    choices: ['and', 'so', 'because', 'although'],
    answerIndex: 1,
  },
  {
    id: 'cc-009',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: '___ the night was cold, the campfire kept them warm.',
    choices: ['Although', 'Unless', 'So', 'Until'],
    answerIndex: 0,
  },
  {
    id: 'cc-010',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: 'We searched everywhere ___ we could not find the key.',
    choices: ['but', 'so', 'because', 'if'],
    answerIndex: 0,
  },
  {
    id: 'cc-011',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: 'The messenger ran fast ___ he was late.',
    choices: ['because', 'before', 'unless', 'while'],
    answerIndex: 0,
  },
  {
    id: 'cc-012',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: '___ the bell rang, the class became quiet.',
    choices: ['When', 'However', 'Because', 'Unless'],
    answerIndex: 0,
  },
  {
    id: 'cc-013',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: 'Take your coat ___ it might snow later.',
    choices: ['because', 'but', 'until', 'before'],
    answerIndex: 0,
  },
  {
    id: 'cc-014',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: 'The potion bubbled ___ the cauldron was hot.',
    choices: ['because', 'although', 'but', 'when'],
    answerIndex: 0,
  },
  {
    id: 'cc-015',
    gameType: 'CONJUNCTION_CROSSING',
    prompt: 'Choose the best conjunction to complete the sentence.',
    sentence: 'We can leave now ___ you are ready.',
    choices: ['if', 'because', 'but', 'until'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getConjunctionCrossingRunQuestions = (levelId: number, count = 10): ConjunctionCrossingQuestion[] => {
  const base = rotate(CONJUNCTION_CROSSING_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

