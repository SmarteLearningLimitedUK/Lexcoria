import { MiniGameType } from '../../../types';

export type MeaningMatchQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'MEANING_MATCH'>;
  prompt: string;
  word: string;
  choices: string[];
  answerIndex: number;
};

export const MEANING_MATCH_QUESTIONS: MeaningMatchQuestion[] = [
  { id: 'mm-001', gameType: 'MEANING_MATCH', prompt: 'Match the word to the meaning.', word: 'diligent', choices: ['hard-working', 'careless', 'sleepy', 'angry'], answerIndex: 0 },
  { id: 'mm-002', gameType: 'MEANING_MATCH', prompt: 'Match the word to the meaning.', word: 'timid', choices: ['shy', 'noisy', 'brave', 'hungry'], answerIndex: 0 },
  { id: 'mm-003', gameType: 'MEANING_MATCH', prompt: 'Match the word to the meaning.', word: 'gleaming', choices: ['shining', 'crumbling', 'whispering', 'floating'], answerIndex: 0 },
  { id: 'mm-004', gameType: 'MEANING_MATCH', prompt: 'Match the word to the meaning.', word: 'vital', choices: ['important', 'tiny', 'optional', 'invisible'], answerIndex: 0 },
  { id: 'mm-005', gameType: 'MEANING_MATCH', prompt: 'Match the word to the meaning.', word: 'startled', choices: ['surprised', 'pleased', 'relaxed', 'sleepy'], answerIndex: 0 },
  { id: 'mm-006', gameType: 'MEANING_MATCH', prompt: 'Match the word to the meaning.', word: 'grudging', choices: ['unwilling', 'excited', 'cheerful', 'careful'], answerIndex: 0 },
  { id: 'mm-007', gameType: 'MEANING_MATCH', prompt: 'Match the word to the meaning.', word: 'ancient', choices: ['very old', 'very new', 'very loud', 'very fast'], answerIndex: 0 },
  { id: 'mm-008', gameType: 'MEANING_MATCH', prompt: 'Match the word to the meaning.', word: 'hazard', choices: ['danger', 'reward', 'friend', 'plan'], answerIndex: 0 },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getMeaningMatchRunQuestions = (levelId: number, count = 10): MeaningMatchQuestion[] => {
  const base = rotate(MEANING_MATCH_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

