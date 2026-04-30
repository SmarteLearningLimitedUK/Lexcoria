import { MiniGameType } from '../../../types';

export type TwinWordsTrialQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'TWIN_WORDS_TRIAL'>;
  prompt: string;
  word: string;
  choices: string[];
  answerIndex: number;
};

export const TWIN_WORDS_TRIAL_QUESTIONS: TwinWordsTrialQuestion[] = [
  { id: 'twt-001', gameType: 'TWIN_WORDS_TRIAL', prompt: 'Choose the closest meaning.', word: 'ancient', choices: ['old', 'noisy', 'careful', 'empty'], answerIndex: 0 },
  { id: 'twt-002', gameType: 'TWIN_WORDS_TRIAL', prompt: 'Choose the closest meaning.', word: 'glimpse', choices: ['look briefly', 'sleep deeply', 'speak loudly', 'run slowly'], answerIndex: 0 },
  { id: 'twt-003', gameType: 'TWIN_WORDS_TRIAL', prompt: 'Choose the closest meaning.', word: 'cautious', choices: ['careful', 'hungry', 'lazy', 'brave'], answerIndex: 0 },
  { id: 'twt-004', gameType: 'TWIN_WORDS_TRIAL', prompt: 'Choose the closest meaning.', word: 'scarce', choices: ['rare', 'dangerous', 'shiny', 'soft'], answerIndex: 0 },
  { id: 'twt-005', gameType: 'TWIN_WORDS_TRIAL', prompt: 'Choose the closest meaning.', word: 'dreadful', choices: ['terrible', 'tiny', 'helpful', 'delicious'], answerIndex: 0 },
  { id: 'twt-006', gameType: 'TWIN_WORDS_TRIAL', prompt: 'Choose the closest meaning.', word: 'swift', choices: ['quick', 'quiet', 'wet', 'weak'], answerIndex: 0 },
  { id: 'twt-007', gameType: 'TWIN_WORDS_TRIAL', prompt: 'Choose the closest meaning.', word: 'vast', choices: ['very large', 'very tasty', 'very late', 'very loud'], answerIndex: 0 },
  { id: 'twt-008', gameType: 'TWIN_WORDS_TRIAL', prompt: 'Choose the closest meaning.', word: 'mutter', choices: ['speak quietly', 'laugh loudly', 'jump quickly', 'write neatly'], answerIndex: 0 },
  { id: 'twt-009', gameType: 'TWIN_WORDS_TRIAL', prompt: 'Choose the closest meaning.', word: 'fortunate', choices: ['lucky', 'angry', 'confused', 'tired'], answerIndex: 0 },
  { id: 'twt-010', gameType: 'TWIN_WORDS_TRIAL', prompt: 'Choose the closest meaning.', word: 'observe', choices: ['watch', 'forget', 'hide', 'break'], answerIndex: 0 },
  { id: 'twt-011', gameType: 'TWIN_WORDS_TRIAL', prompt: 'Choose the closest meaning.', word: 'distant', choices: ['far away', 'very heavy', 'very kind', 'very slow'], answerIndex: 0 },
  { id: 'twt-012', gameType: 'TWIN_WORDS_TRIAL', prompt: 'Choose the closest meaning.', word: 'consider', choices: ['think about', 'run away', 'shout at', 'draw'], answerIndex: 0 },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getTwinWordsTrialRunQuestions = (levelId: number, count = 10): TwinWordsTrialQuestion[] => {
  const base = rotate(TWIN_WORDS_TRIAL_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

