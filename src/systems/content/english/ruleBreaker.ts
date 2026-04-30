import { MiniGameType } from '../../../types';

export type RuleBreakerQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'RULE_BREAKER'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
};

export const RULE_BREAKER_QUESTIONS: RuleBreakerQuestion[] = [
  {
    id: 'rb-001',
    gameType: 'RULE_BREAKER',
    prompt: 'Which option breaks the punctuation rule?',
    choices: [
      'After the storm, the bridge collapsed.',
      'Quickly, the knight ran to the gate.',
      'Because it was late the campfire was put out.',
      'However, the wizard refused to leave.',
    ],
    answerIndex: 2,
  },
  {
    id: 'rb-002',
    gameType: 'RULE_BREAKER',
    prompt: 'Which option breaks subject-verb agreement?',
    choices: [
      'The pack of wolves is howling.',
      'The team are practising after school.',
      'The list of rules is long.',
      'The crowd is cheering loudly.',
    ],
    answerIndex: 1,
  },
  {
    id: 'rb-003',
    gameType: 'RULE_BREAKER',
    prompt: 'Which option breaks the apostrophe rule?',
    choices: [
      "The dragon's wings were huge.",
      "The dragons' wings were huge.",
      'The dragons wings were huge.',
      "The knight's armour shone.",
    ],
    answerIndex: 2,
  },
  {
    id: 'rb-004',
    gameType: 'RULE_BREAKER',
    prompt: 'Which option breaks tense consistency?',
    choices: [
      'Yesterday, we travelled to the harbour and found a clue.',
      'Yesterday, we travel to the harbour and found a clue.',
      'Yesterday, we walked to the tower and waited.',
      'Yesterday, we listened to the captain carefully.',
    ],
    answerIndex: 1,
  },
  {
    id: 'rb-005',
    gameType: 'RULE_BREAKER',
    prompt: 'Which option breaks the spellings rule for this word?',
    choices: ['definitely', 'definately', 'necessary', 'environment'],
    answerIndex: 1,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getRuleBreakerRunQuestions = (levelId: number, count = 8): RuleBreakerQuestion[] => {
  const base = rotate(RULE_BREAKER_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

