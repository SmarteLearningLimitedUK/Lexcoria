import { MiniGameType } from '../../../types';

export type WordWardenQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'WORD_WARDEN'>;
  prompt: string;
  sentence: string;
  target: string;
  choices: string[];
  answerIndex: number;
};

export const WORD_WARDEN_QUESTIONS: WordWardenQuestion[] = [
  {
    id: 'ww-001',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'The dragon slept peacefully inside the cave.',
    target: 'dragon',
    choices: ['Noun', 'Verb', 'Adjective', 'Adverb'],
    answerIndex: 0,
  },
  {
    id: 'ww-002',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'The wizard quickly mixed the potion.',
    target: 'quickly',
    choices: ['Noun', 'Verb', 'Adjective', 'Adverb'],
    answerIndex: 3,
  },
  {
    id: 'ww-003',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'They will travel tomorrow if the storm clears.',
    target: 'will',
    choices: ['Modal verb', 'Noun', 'Adjective', 'Preposition'],
    answerIndex: 0,
  },
  {
    id: 'ww-004',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'The brave knight carried a heavy shield.',
    target: 'brave',
    choices: ['Adjective', 'Verb', 'Pronoun', 'Conjunction'],
    answerIndex: 0,
  },
  {
    id: 'ww-005',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'Mina and her friend solved the riddle.',
    target: 'and',
    choices: ['Conjunction', 'Preposition', 'Pronoun', 'Adverb'],
    answerIndex: 0,
  },
  {
    id: 'ww-006',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'We waited under the bridge until the guard returned.',
    target: 'under',
    choices: ['Preposition', 'Conjunction', 'Adjective', 'Pronoun'],
    answerIndex: 0,
  },
  {
    id: 'ww-007',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'Those are the keys that unlock the tower.',
    target: 'Those',
    choices: ['Determiner', 'Preposition', 'Modal verb', 'Adverb'],
    answerIndex: 0,
  },
  {
    id: 'ww-008',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'The treasure was hidden, but the map helped.',
    target: 'but',
    choices: ['Conjunction', 'Preposition', 'Verb', 'Noun'],
    answerIndex: 0,
  },
  {
    id: 'ww-009',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'After the battle, the kingdom celebrated.',
    target: 'After',
    choices: ['Preposition', 'Conjunction', 'Adverb', 'Pronoun'],
    answerIndex: 0,
  },
  {
    id: 'ww-010',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'The apprentice laughed loudly.',
    target: 'laughed',
    choices: ['Verb', 'Noun', 'Adjective', 'Determiner'],
    answerIndex: 0,
  },
  {
    id: 'ww-011',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'I can see the lighthouse from here.',
    target: 'can',
    choices: ['Modal verb', 'Preposition', 'Noun', 'Determiner'],
    answerIndex: 0,
  },
  {
    id: 'ww-012',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'Her cloak was torn because it caught on a thorn.',
    target: 'because',
    choices: ['Conjunction', 'Preposition', 'Adverb', 'Determiner'],
    answerIndex: 0,
  },
  {
    id: 'ww-013',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'The path was narrow; however, they continued.',
    target: 'however',
    choices: ['Adverb', 'Conjunction', 'Determiner', 'Noun'],
    answerIndex: 0,
  },
  {
    id: 'ww-014',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'Which spell should we cast next?',
    target: 'Which',
    choices: ['Determiner', 'Verb', 'Adverb', 'Preposition'],
    answerIndex: 0,
  },
  {
    id: 'ww-015',
    gameType: 'WORD_WARDEN',
    prompt: 'What word class is the highlighted word?',
    sentence: 'The villagers were relieved when the river dropped.',
    target: 'when',
    choices: ['Conjunction', 'Preposition', 'Adjective', 'Noun'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getWordWardenRunQuestions = (levelId: number, count = 10): WordWardenQuestion[] => {
  const base = rotate(WORD_WARDEN_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

