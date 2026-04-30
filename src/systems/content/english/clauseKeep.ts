import { MiniGameType } from '../../../types';

export type ClauseKeepQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'CLAUSE_KEEP'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const CLAUSE_KEEP_QUESTIONS: ClauseKeepQuestion[] = [
  {
    id: 'cc-001',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Clauses',
    sentence: 'I ran because I was late.',
    choices: ['I ran', 'because I was late', 'I was', 'late'],
    answerIndex: 1,
  },
  {
    id: 'cc-002',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Conjunctions',
    sentence: 'I stayed inside ___ it was raining.',
    choices: ['but', 'because', 'and', 'so'],
    answerIndex: 1,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getClauseKeepRunQuestions = (levelId: number, count = 10): ClauseKeepQuestion[] => {
  const base = rotate(CLAUSE_KEEP_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

