import { MiniGameType } from '../../../types';

export type SentenceSmithQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'SENTENCE_SMITH'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const SENTENCE_SMITH_QUESTIONS: SentenceSmithQuestion[] = [
  {
    id: 'ss-001',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Fix the sentence by choosing the best correction.',
    sentence: 'Because it was late.',
    choices: ['Add main clause', 'Remove word', 'Add comma', 'Leave it'],
    answerIndex: 0,
  },
  {
    id: 'ss-002',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Fix the sentence by choosing the best correction.',
    sentence: 'I went home I was tired.',
    choices: ['Add conjunction/comma', 'Remove word', 'Change tense', 'Leave it'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getSentenceSmithRunQuestions = (levelId: number, count = 10): SentenceSmithQuestion[] => {
  const base = rotate(SENTENCE_SMITH_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

