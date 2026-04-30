import { MiniGameType } from '../../../types';

export type SummitQuestion = {
  id: string;
  gameType:
    | Extract<MiniGameType, 'MIXED_MASTERY'>
    | Extract<MiniGameType, 'LEGENDS_CHALLENGE'>
    | Extract<MiniGameType, 'GRAMMAR_GAUNTLET'>
    | Extract<MiniGameType, 'WORDSMITH_TRIALS'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
};

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const MIXED_MASTERY_QUESTIONS: SummitQuestion[] = [
  {
    id: 'mmx-001',
    gameType: 'MIXED_MASTERY',
    prompt: 'Choose the correct sentence.',
    choices: [
      'Me and my friend went to the castle.',
      'My friend and I went to the castle.',
      'My friend and me went to the castle.',
      'I and my friend went to the castle.',
    ],
    answerIndex: 1,
  },
  {
    id: 'mmx-002',
    gameType: 'MIXED_MASTERY',
    prompt: 'Choose the correct spelling.',
    choices: ['definately', 'definitely', 'definitly', 'definetely'],
    answerIndex: 1,
  },
  {
    id: 'mmx-003',
    gameType: 'MIXED_MASTERY',
    prompt: 'Choose the best synonym for "cautious".',
    choices: ['careful', 'careless', 'angry', 'sleepy'],
    answerIndex: 0,
  },
  {
    id: 'mmx-004',
    gameType: 'MIXED_MASTERY',
    prompt: 'Choose the sentence with correct punctuation.',
    choices: [
      'After the storm the bridge collapsed.',
      'After the storm, the bridge collapsed.',
      'After, the storm the bridge collapsed.',
      'After the storm, the bridge, collapsed.',
    ],
    answerIndex: 1,
  },
  {
    id: 'mmx-005',
    gameType: 'MIXED_MASTERY',
    prompt: 'Choose the best meaning of "reluctant".',
    choices: ['unwilling', 'excited', 'confused', 'fast'],
    answerIndex: 0,
  },
];

export const LEGENDS_CHALLENGE_QUESTIONS: SummitQuestion[] = [
  {
    id: 'lc-001',
    gameType: 'LEGENDS_CHALLENGE',
    prompt: 'Choose the best option (close distractors).',
    choices: [
      'The knight ran quickly to the gate.',
      'The knight ran slowly to the gate.',
      'The knight ran quietly to the gate.',
      'The knight ran loudly to the gate.',
    ],
    answerIndex: 0,
  },
  {
    id: 'lc-002',
    gameType: 'LEGENDS_CHALLENGE',
    prompt: 'Choose the sentence written in standard English.',
    choices: [
      "I done my homework already.",
      'I did my homework already.',
      'I have did my homework already.',
      'I done did my homework already.',
    ],
    answerIndex: 1,
  },
  {
    id: 'lc-003',
    gameType: 'LEGENDS_CHALLENGE',
    prompt: 'Choose the correct apostrophe.',
    choices: [
      'The dragons wings were huge.',
      "The dragon's wings were huge.",
      "The dragons' wing's were huge.",
      "The dragon wings' were huge.",
    ],
    answerIndex: 1,
  },
  {
    id: 'lc-004',
    gameType: 'LEGENDS_CHALLENGE',
    prompt: 'Choose the correct spelling.',
    choices: ['accommodate', 'accomodate', 'acommodate', 'accomoddate'],
    answerIndex: 0,
  },
  {
    id: 'lc-005',
    gameType: 'LEGENDS_CHALLENGE',
    prompt: 'Choose the best antonym for "scarce".',
    choices: ['plentiful', 'rare', 'careful', 'gentle'],
    answerIndex: 0,
  },
];

export const GRAMMAR_GAUNTLET_QUESTIONS: SummitQuestion[] = [
  {
    id: 'ggt-001',
    gameType: 'GRAMMAR_GAUNTLET',
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
    id: 'ggt-002',
    gameType: 'GRAMMAR_GAUNTLET',
    prompt: 'Choose the correct pronoun.',
    choices: [
      'Between you and I, the treasure is nearby.',
      'Between you and me, the treasure is nearby.',
      'Between we, the treasure is nearby.',
      'Between us and I, the treasure is nearby.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ggt-003',
    gameType: 'GRAMMAR_GAUNTLET',
    prompt: 'Choose the best conjunction.',
    choices: ['because', 'although', 'however', 'therefore'],
    answerIndex: 1,
  },
  {
    id: 'ggt-004',
    gameType: 'GRAMMAR_GAUNTLET',
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
    id: 'ggt-005',
    gameType: 'GRAMMAR_GAUNTLET',
    prompt: 'Choose the sentence that uses a relative clause correctly.',
    choices: [
      'The knight, who wore silver armour, entered the hall.',
      'The knight entered the hall who wore silver armour.',
      'The knight wore silver armour entered the hall.',
      'The knight entered the hall and wore silver armour.',
    ],
    answerIndex: 0,
  },
];

export const WORDSMITH_TRIALS_QUESTIONS: SummitQuestion[] = [
  {
    id: 'wst-001',
    gameType: 'WORDSMITH_TRIALS',
    prompt: 'Choose the closest meaning.',
    choices: ['ancient = old', 'ancient = noisy', 'ancient = hungry', 'ancient = tiny'],
    answerIndex: 0,
  },
  {
    id: 'wst-002',
    gameType: 'WORDSMITH_TRIALS',
    prompt: 'Choose the best word form.',
    choices: ['decision', 'decide', 'deciding', 'decisive'],
    answerIndex: 0,
  },
  {
    id: 'wst-003',
    gameType: 'WORDSMITH_TRIALS',
    prompt: 'Choose the best antonym for "reluctant".',
    choices: ['eager', 'tired', 'quiet', 'calm'],
    answerIndex: 0,
  },
  {
    id: 'wst-004',
    gameType: 'WORDSMITH_TRIALS',
    prompt: 'Choose the best meaning for "stern".',
    choices: ['strict', 'sleepy', 'silly', 'tiny'],
    answerIndex: 0,
  },
  {
    id: 'wst-005',
    gameType: 'WORDSMITH_TRIALS',
    prompt: 'Choose the most formal word.',
    choices: ['depart', 'bounce', 'leg it', 'head off quick'],
    answerIndex: 0,
  },
];

export const getSummitRunQuestions = (
  gameType: SummitQuestion['gameType'],
  levelId: number,
  count = 10,
): SummitQuestion[] => {
  const source = gameType === 'MIXED_MASTERY'
    ? MIXED_MASTERY_QUESTIONS
    : gameType === 'LEGENDS_CHALLENGE'
      ? LEGENDS_CHALLENGE_QUESTIONS
      : gameType === 'GRAMMAR_GAUNTLET'
        ? GRAMMAR_GAUNTLET_QUESTIONS
        : WORDSMITH_TRIALS_QUESTIONS;
  const base = rotate(source, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

