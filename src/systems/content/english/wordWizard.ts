import { MiniGameType } from '../../../types';

export type WordWizardQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'WORD_WIZARD'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const WORD_WIZARD_QUESTIONS: WordWizardQuestion[] = [
  {
    id: 'wwz-001',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The dragon was ___ when it lost its treasure.',
    choices: ['furious', 'sleepy', 'polite', 'tiny'],
    answerIndex: 0,
  },
  {
    id: 'wwz-002',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'Mina gave a ___ answer that explained her thinking.',
    choices: ['detailed', 'empty', 'muddy', 'careless'],
    answerIndex: 0,
  },
  {
    id: 'wwz-003',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The path was ___, so they walked cautiously.',
    choices: ['treacherous', 'tasty', 'musical', 'shallow'],
    answerIndex: 0,
  },
  {
    id: 'wwz-004',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The wizard’s voice was ___, barely above a whisper.',
    choices: ['soft', 'thunderous', 'cruel', 'shiny'],
    answerIndex: 0,
  },
  {
    id: 'wwz-005',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The villagers were ___ when the storm ended.',
    choices: ['relieved', 'confused', 'invisible', 'greedy'],
    answerIndex: 0,
  },
  {
    id: 'wwz-006',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The cave was ___, with almost no light.',
    choices: ['gloomy', 'delicious', 'crowded', 'cheerful'],
    answerIndex: 0,
  },
  {
    id: 'wwz-007',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The guard was ___ and would not let anyone pass.',
    choices: ['stern', 'fragile', 'carefree', 'silent'],
    answerIndex: 0,
  },
  {
    id: 'wwz-008',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The hero’s plan was ___ and clever.',
    choices: ['ingenious', 'dull', 'random', 'noisy'],
    answerIndex: 0,
  },
  {
    id: 'wwz-009',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The messenger made a ___ dash through the rain.',
    choices: ['swift', 'sleepy', 'awkward', 'tiny'],
    answerIndex: 0,
  },
  {
    id: 'wwz-010',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The lighthouse stood ___ above the sea.',
    choices: ['towering', 'whispering', 'melting', 'scribbling'],
    answerIndex: 0,
  },
  {
    id: 'wwz-011',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The dragon’s scales were ___ like mirrors.',
    choices: ['gleaming', 'sour', 'wobbly', 'tame'],
    answerIndex: 0,
  },
  {
    id: 'wwz-012',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'Mina felt ___ before the final trial.',
    choices: ['anxious', 'invisible', 'wooden', 'ancient'],
    answerIndex: 0,
  },
  {
    id: 'wwz-013',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The crowd grew ___ as the gate creaked open.',
    choices: ['restless', 'frozen', 'bitter', 'lazy'],
    answerIndex: 0,
  },
  {
    id: 'wwz-014',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The wizard’s advice was ___ and helpful.',
    choices: ['practical', 'mysterious', 'careless', 'violent'],
    answerIndex: 0,
  },
  {
    id: 'wwz-015',
    gameType: 'WORD_WIZARD',
    prompt: 'Choose the best word to complete the sentence.',
    sentence: 'The treasure was ___ behind the stone wall.',
    choices: ['concealed', 'shouted', 'boiled', 'folded'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getWordWizardRunQuestions = (levelId: number, count = 10): WordWizardQuestion[] => {
  const base = rotate(WORD_WIZARD_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

