import { MiniGameType } from '../../../types';

export type PrefixPatrolQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'PREFIX_PATROL'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation?: string;
};

export const PREFIX_PATROL_QUESTIONS: PrefixPatrolQuestion[] = [
  {
    id: 'pp-001',
    gameType: 'PREFIX_PATROL',
    prompt: "Which prefix means 'not'?",
    choices: ['re-', 'un-', 'pre-', 'sub-'],
    answerIndex: 1,
  },
  {
    id: 'pp-002',
    gameType: 'PREFIX_PATROL',
    prompt: "Which prefix means 'again'?",
    choices: ['re-', 'mis-', 'inter-', 'auto-'],
    answerIndex: 0,
  },
  {
    id: 'pp-003',
    gameType: 'PREFIX_PATROL',
    prompt: "Which prefix means 'before'?",
    choices: ['pre-', 'anti-', 'super-', 'bi-'],
    answerIndex: 0,
  },
  {
    id: 'pp-004',
    gameType: 'PREFIX_PATROL',
    prompt: "Which prefix means 'against'?",
    choices: ['anti-', 'sub-', 'trans-', 'tele-'],
    answerIndex: 0,
  },
  {
    id: 'pp-005',
    gameType: 'PREFIX_PATROL',
    prompt: 'Choose the correct word to complete the sentence: "I had to ____ the instructions."',
    choices: ['rewrite', 'unwrite', 'prewrite', 'subwrite'],
    answerIndex: 0,
  },
  {
    id: 'pp-006',
    gameType: 'PREFIX_PATROL',
    prompt: 'Choose the correct word to complete the sentence: "The guard ____understood the message."',
    choices: ['reunderstood', 'misunderstood', 'preunderstood', 'subunderstood'],
    answerIndex: 1,
  },
  {
    id: 'pp-007',
    gameType: 'PREFIX_PATROL',
    prompt: "Which prefix means 'two'?",
    choices: ['bi-', 'tri-', 'uni-', 'semi-'],
    answerIndex: 0,
  },
  {
    id: 'pp-008',
    gameType: 'PREFIX_PATROL',
    prompt: "Which prefix means 'half'?",
    choices: ['semi-', 'mono-', 'anti-', 'trans-'],
    answerIndex: 0,
  },
  {
    id: 'pp-009',
    gameType: 'PREFIX_PATROL',
    prompt: "Which prefix means 'under' or 'below'?",
    choices: ['sub-', 'super-', 'inter-', 'post-'],
    answerIndex: 0,
  },
  {
    id: 'pp-010',
    gameType: 'PREFIX_PATROL',
    prompt: "Which prefix means 'over' or 'above'?",
    choices: ['super-', 'sub-', 'anti-', 'pre-'],
    answerIndex: 0,
  },
  {
    id: 'pp-011',
    gameType: 'PREFIX_PATROL',
    prompt: "Which prefix means 'between'?",
    choices: ['inter-', 'auto-', 'trans-', 'anti-'],
    answerIndex: 0,
  },
  {
    id: 'pp-012',
    gameType: 'PREFIX_PATROL',
    prompt: 'Choose the best word: "The bridge was ____national: it linked two countries."',
    choices: ['international', 'uninternational', 'preinternational', 'subinternational'],
    answerIndex: 0,
  },
  {
    id: 'pp-013',
    gameType: 'PREFIX_PATROL',
    prompt: 'Choose the best word: "That was a ____human feat: it felt beyond normal."',
    choices: ['subhuman', 'superhuman', 'prehuman', 'unhuman'],
    answerIndex: 1,
  },
  {
    id: 'pp-014',
    gameType: 'PREFIX_PATROL',
    prompt: "Which prefix means 'self'?",
    choices: ['auto-', 'inter-', 'semi-', 'anti-'],
    answerIndex: 0,
  },
  {
    id: 'pp-015',
    gameType: 'PREFIX_PATROL',
    prompt: 'Choose the correct word: "The map was ____lated into a new language."',
    choices: ['transmitted', 'translated', 'transformed', 'transcribed'],
    answerIndex: 1,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getPrefixPatrolRunQuestions = (levelId: number, count = 10): PrefixPatrolQuestion[] => {
  const base = rotate(PREFIX_PATROL_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

