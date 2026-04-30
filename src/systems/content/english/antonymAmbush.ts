import { MiniGameType } from '../../../types';

export type AntonymAmbushQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'ANTONYM_AMBUSH'>;
  prompt: string;
  word: string;
  choices: string[];
  answerIndex: number;
};

export const ANTONYM_AMBUSH_QUESTIONS: AntonymAmbushQuestion[] = [
  { id: 'aa-001', gameType: 'ANTONYM_AMBUSH', prompt: 'Choose the best opposite.', word: 'ancient', choices: ['modern', 'old', 'quiet', 'tiny'], answerIndex: 0 },
  { id: 'aa-002', gameType: 'ANTONYM_AMBUSH', prompt: 'Choose the best opposite.', word: 'increase', choices: ['decrease', 'raise', 'build', 'grow'], answerIndex: 0 },
  { id: 'aa-003', gameType: 'ANTONYM_AMBUSH', prompt: 'Choose the best opposite.', word: 'brilliant', choices: ['dull', 'bright', 'happy', 'smart'], answerIndex: 0 },
  { id: 'aa-004', gameType: 'ANTONYM_AMBUSH', prompt: 'Choose the best opposite.', word: 'reluctant', choices: ['eager', 'tired', 'quiet', 'calm'], answerIndex: 0 },
  { id: 'aa-005', gameType: 'ANTONYM_AMBUSH', prompt: 'Choose the best opposite.', word: 'scarce', choices: ['plentiful', 'rare', 'careful', 'gentle'], answerIndex: 0 },
  { id: 'aa-006', gameType: 'ANTONYM_AMBUSH', prompt: 'Choose the best opposite.', word: 'victory', choices: ['defeat', 'trophy', 'battle', 'hero'], answerIndex: 0 },
  { id: 'aa-007', gameType: 'ANTONYM_AMBUSH', prompt: 'Choose the best opposite.', word: 'silent', choices: ['noisy', 'quiet', 'slow', 'sleepy'], answerIndex: 0 },
  { id: 'aa-008', gameType: 'ANTONYM_AMBUSH', prompt: 'Choose the best opposite.', word: 'fragile', choices: ['sturdy', 'weak', 'tiny', 'broken'], answerIndex: 0 },
  { id: 'aa-009', gameType: 'ANTONYM_AMBUSH', prompt: 'Choose the best opposite.', word: 'generous', choices: ['selfish', 'kind', 'helpful', 'brave'], answerIndex: 0 },
  { id: 'aa-010', gameType: 'ANTONYM_AMBUSH', prompt: 'Choose the best opposite.', word: 'expand', choices: ['shrink', 'grow', 'open', 'extend'], answerIndex: 0 },
  { id: 'aa-011', gameType: 'ANTONYM_AMBUSH', prompt: 'Choose the best opposite.', word: 'precise', choices: ['vague', 'exact', 'careful', 'correct'], answerIndex: 0 },
  { id: 'aa-012', gameType: 'ANTONYM_AMBUSH', prompt: 'Choose the best opposite.', word: 'courage', choices: ['fear', 'bravery', 'strength', 'hope'], answerIndex: 0 },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getAntonymAmbushRunQuestions = (levelId: number, count = 10): AntonymAmbushQuestion[] => {
  const base = rotate(ANTONYM_AMBUSH_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

