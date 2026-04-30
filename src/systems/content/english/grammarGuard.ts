import { MiniGameType } from '../../../types';

export type GrammarGuardQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'GRAMMAR_GUARD'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation?: string;
};

export const GRAMMAR_GUARD_QUESTIONS: GrammarGuardQuestion[] = [
  {
    id: 'gg-001',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence written in standard English.',
    choices: [
      'Me and my friend went to the castle.',
      'My friend and I went to the castle.',
      'My friend and me went to the castle.',
      'I and my friend went to the castle.',
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-002',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence with correct subject-verb agreement.',
    choices: [
      'The pack of wolves are howling at night.',
      'The pack of wolves is howling at night.',
      'The pack of wolves were howling at night.',
      'The pack of wolves be howling at night.',
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-003',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence with the correct pronoun.',
    choices: [
      'The captain gave the map to we.',
      'The captain gave the map to us.',
      'The captain gave the map to I.',
      'The captain gave the map to me and he.',
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-004',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence with correct tense consistency.',
    choices: [
      'Yesterday, we travel to the harbour and found a clue.',
      'Yesterday, we travelled to the harbour and found a clue.',
      'Yesterday, we are travelling to the harbour and found a clue.',
      'Yesterday, we will travel to the harbour and found a clue.',
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-005',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence that is punctuated correctly.',
    choices: [
      'When the bell rang the apprentices rushed outside.',
      'When the bell rang, the apprentices rushed outside.',
      'When, the bell rang the apprentices rushed outside.',
      'When the bell, rang the apprentices rushed outside.',
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-006',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence written in standard English.',
    choices: [
      'I done my homework already.',
      'I did my homework already.',
      'I have did my homework already.',
      'I done did my homework already.',
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-007',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence with the correct comparative form.',
    choices: [
      'This path is more narrow than the last one.',
      'This path is narrower than the last one.',
      'This path is narrowest than the last one.',
      'This path is most narrow than the last one.',
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-008',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence with the correct apostrophe.',
    choices: [
      'The dragons wings were huge.',
      "The dragon's wings were huge.",
      "The dragons' wing's were huge.",
      "The dragon wings' were huge.",
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-009',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence with correct subject-verb agreement.',
    choices: [
      'There is many clues on the map.',
      'There are many clues on the map.',
      'There be many clues on the map.',
      'There was many clues on the map.',
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-010',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence with the correct pronoun.',
    choices: [
      'Between you and I, the treasure is nearby.',
      'Between you and me, the treasure is nearby.',
      'Between we, the treasure is nearby.',
      'Between us and I, the treasure is nearby.',
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-011',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence written in standard English.',
    choices: [
      "I ain't got any coins left.",
      "I haven't got any coins left.",
      'I not got any coins left.',
      "I haven't got none coins left.",
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-012',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence with correct verb form.',
    choices: [
      'The message was wrote in ink.',
      'The message was written in ink.',
      'The message was write in ink.',
      'The message was writing in ink.',
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-013',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence with correct word order.',
    choices: [
      'I only ate one biscuit.',
      'Only I ate one biscuit.',
      'I ate one biscuit only.',
      'I ate only one biscuit.',
    ],
    answerIndex: 3,
  },
  {
    id: 'gg-014',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence with the correct determiner.',
    choices: [
      'I have less coins than yesterday.',
      'I have fewer coins than yesterday.',
      'I have fewest coins than yesterday.',
      'I have little coins than yesterday.',
    ],
    answerIndex: 1,
  },
  {
    id: 'gg-015',
    gameType: 'GRAMMAR_GUARD',
    prompt: 'Choose the sentence with correct subject-verb agreement.',
    choices: [
      'Neither the guard nor the wizard are ready.',
      'Neither the guard nor the wizard is ready.',
      'Neither the guard nor the wizard be ready.',
      'Neither the guard nor the wizard were ready.',
    ],
    answerIndex: 1,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getGrammarGuardRunQuestions = (levelId: number, count = 10): GrammarGuardQuestion[] => {
  const base = rotate(GRAMMAR_GUARD_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

