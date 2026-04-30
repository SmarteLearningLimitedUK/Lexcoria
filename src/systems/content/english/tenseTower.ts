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
    id: 'tt-spec-001',
    gameType: 'TENSE_TOWER',
    prompt: 'Choose the correct verb form.',
    sentence: 'She ___ to the shop yesterday.',
    target: '___',
    choices: ['go', 'goes', 'went', 'going'],
    answerIndex: 2,
  },
  {
    id: 'tt-spec-002',
    gameType: 'TENSE_TOWER',
    prompt: 'Choose the correct verb form.',
    sentence: 'They ___ football now.',
    target: '___',
    choices: ['play', 'plays', 'are playing', 'played'],
    answerIndex: 2,
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

