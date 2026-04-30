import { MiniGameType } from '../../../types';

export type ConnectiveCrafterQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'CONNECTIVE_CRAFTER'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const CONNECTIVE_CRAFTER_QUESTIONS: ConnectiveCrafterQuestion[] = [
  {
    id: 'ccr-001',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'The storm was fierce; ___ , the heroes carried on.',
    choices: ['however', 'because', 'therefore', 'before'],
    answerIndex: 0,
  },
  {
    id: 'ccr-002',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'We packed extra rope ___ the bridge was damaged.',
    choices: ['because', 'however', 'although', 'meanwhile'],
    answerIndex: 0,
  },
  {
    id: 'ccr-003',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'The gate was locked; ___ , we searched for a key.',
    choices: ['therefore', 'although', 'however', 'meanwhile'],
    answerIndex: 0,
  },
  {
    id: 'ccr-004',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: '___ the lantern was bright, the cave still felt frightening.',
    choices: ['Although', 'Because', 'Therefore', 'Meanwhile'],
    answerIndex: 0,
  },
  {
    id: 'ccr-005',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'The wizard spoke softly; ___ , everyone listened closely.',
    choices: ['as a result', 'unless', 'however', 'before'],
    answerIndex: 0,
  },
  {
    id: 'ccr-006',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'We waited quietly ___ the guard passed by.',
    choices: ['until', 'therefore', 'however', 'because of'],
    answerIndex: 0,
  },
  {
    id: 'ccr-007',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'The path was steep; ___ , Mina took smaller steps.',
    choices: ['so', 'although', 'however', 'unless'],
    answerIndex: 0,
  },
  {
    id: 'ccr-008',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'The map was torn; ___ , we could still read it.',
    choices: ['nevertheless', 'because', 'therefore', 'before'],
    answerIndex: 0,
  },
  {
    id: 'ccr-009',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'We hurried ___ we did not want to be late.',
    choices: ['because', 'however', 'although', 'meanwhile'],
    answerIndex: 0,
  },
  {
    id: 'ccr-010',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'The dragon slept; ___ , the village was safe.',
    choices: ['therefore', 'although', 'however', 'meanwhile'],
    answerIndex: 0,
  },
  {
    id: 'ccr-011',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: '___ Mina read the clue, she understood the riddle.',
    choices: ['When', 'However', 'Although', 'Therefore'],
    answerIndex: 0,
  },
  {
    id: 'ccr-012',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'The lantern went out; ___ , they stopped.',
    choices: ['as a result', 'although', 'because', 'meanwhile'],
    answerIndex: 0,
  },
  {
    id: 'ccr-013',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'We gathered supplies; ___ , we planned the route.',
    choices: ['then', 'because', 'however', 'although'],
    answerIndex: 0,
  },
  {
    id: 'ccr-014',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'The harbour was busy; ___ , the heroes stayed alert.',
    choices: ['however', 'because', 'therefore', 'before'],
    answerIndex: 0,
  },
  {
    id: 'ccr-015',
    gameType: 'CONNECTIVE_CRAFTER',
    prompt: 'Choose the best connective to complete the sentence.',
    sentence: 'We listened carefully ___ we could not see the path.',
    choices: ['because', 'however', 'although', 'therefore'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getConnectiveCrafterRunQuestions = (levelId: number, count = 10): ConnectiveCrafterQuestion[] => {
  const base = rotate(CONNECTIVE_CRAFTER_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

