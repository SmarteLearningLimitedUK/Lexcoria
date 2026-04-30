import { MiniGameType } from '../../../types';

export type PunctuationPatrolQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'PUNCTUATION_PATROL'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const PUNCTUATION_PATROL_QUESTIONS: PunctuationPatrolQuestion[] = [
  {
    id: 'pp-001',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'The gate is locked___ we need a key.',
    choices: ['; therefore', ', therefore', ': therefore', '. Therefore'],
    answerIndex: 0,
  },
  {
    id: 'pp-002',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'Pack the essentials___ lantern, rope and water.',
    choices: [':', ';', ',', '.'],
    answerIndex: 0,
  },
  {
    id: 'pp-003',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'The dragon roared___ the villagers fled.',
    choices: ['; then', ', then', ': then', '. then'],
    answerIndex: 0,
  },
  {
    id: 'pp-004',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'She whispered___ “Stay close.”',
    choices: [',', ';', ':', '.'],
    answerIndex: 2,
  },
  {
    id: 'pp-005',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'The path was narrow___ it was safe.',
    choices: [', but', '; but', ': but', '. But'],
    answerIndex: 0,
  },
  {
    id: 'pp-006',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'We asked one question___ “Where is the map?”',
    choices: [':', ',', ';', '.'],
    answerIndex: 0,
  },
  {
    id: 'pp-007',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'The wizard was tired___ he continued anyway.',
    choices: [', yet', '; yet', ': yet', '. yet'],
    answerIndex: 0,
  },
  {
    id: 'pp-008',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'I need three things___ courage, patience and luck.',
    choices: [':', ',', ';', '.'],
    answerIndex: 0,
  },
  {
    id: 'pp-009',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'The answer was obvious___ or so we thought.',
    choices: [';', ',', ':', '.'],
    answerIndex: 0,
  },
  {
    id: 'pp-010',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'She looked at the sky___ it was getting dark.',
    choices: [';', ',', ':', '.'],
    answerIndex: 0,
  },
  {
    id: 'pp-011',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'The knights trained daily___ they wanted to improve.',
    choices: [';', ',', ':', '.'],
    answerIndex: 0,
  },
  {
    id: 'pp-012',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'He shouted___ “Run!”',
    choices: [':', ',', ';', '.'],
    answerIndex: 0,
  },
  {
    id: 'pp-013',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'The map was torn___ we taped it together.',
    choices: [';', ',', ':', '.'],
    answerIndex: 0,
  },
  {
    id: 'pp-014',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'One thing was certain___ the treasure was real.',
    choices: [':', ',', ';', '.'],
    answerIndex: 0,
  },
  {
    id: 'pp-015',
    gameType: 'PUNCTUATION_PATROL',
    prompt: 'Choose the correct punctuation to complete the sentence.',
    sentence: 'The spell fizzled___ it needed more time.',
    choices: [';', ',', ':', '.'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getPunctuationPatrolRunQuestions = (levelId: number, count = 10): PunctuationPatrolQuestion[] => {
  const base = rotate(PUNCTUATION_PATROL_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

