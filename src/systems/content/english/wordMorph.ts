import { MiniGameType } from '../../../types';

export type WordMorphQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'WORD_MORPH'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
};

export const WORD_MORPH_QUESTIONS: WordMorphQuestion[] = [
  {
    id: 'wm-001',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The council made a ____ to repair the bridge."',
    choices: ['decide', 'decision', 'decisive', 'deciding'],
    answerIndex: 1,
  },
  {
    id: 'wm-002',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The explorer’s ____ helped the team stay safe."',
    choices: ['brave', 'bravery', 'bravely', 'braveness'],
    answerIndex: 1,
  },
  {
    id: 'wm-003',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The ____ of the castle took years."',
    choices: ['construct', 'construction', 'constructive', 'constructed'],
    answerIndex: 1,
  },
  {
    id: 'wm-004',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The guard gave a ____ warning."',
    choices: ['repeat', 'repetition', 'repetitive', 'repeated'],
    answerIndex: 3,
  },
  {
    id: 'wm-005',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The message was full of ____."',
    choices: ['mysterious', 'mystery', 'mystify', 'mysteriously'],
    answerIndex: 1,
  },
  {
    id: 'wm-006',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The wizard spoke with great ____."',
    choices: ['confident', 'confidence', 'confidential', 'confiding'],
    answerIndex: 1,
  },
  {
    id: 'wm-007',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The sudden ____ startled everyone."',
    choices: ['appear', 'appearance', 'apparition', 'apparently'],
    answerIndex: 1,
  },
  {
    id: 'wm-008',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The captain’s ____ was clear to the crew."',
    choices: ['intend', 'intention', 'intensive', 'intentional'],
    answerIndex: 1,
  },
  {
    id: 'wm-009',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The ____ of the storm was surprising."',
    choices: ['strong', 'strength', 'strengthen', 'strongly'],
    answerIndex: 1,
  },
  {
    id: 'wm-010',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The ____ of the potion was powerful."',
    choices: ['create', 'creator', 'creation', 'creative'],
    answerIndex: 2,
  },
  {
    id: 'wm-011',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The team’s ____ improved each day."',
    choices: ['cooperate', 'cooperation', 'cooperative', 'cooperatively'],
    answerIndex: 1,
  },
  {
    id: 'wm-012',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The ____ of the map helped us."',
    choices: ['accurate', 'accuracy', 'accurately', 'accuration'],
    answerIndex: 1,
  },
  {
    id: 'wm-013',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The ____ of the cave made it hard to see."',
    choices: ['dark', 'darkness', 'darkly', 'darken'],
    answerIndex: 1,
  },
  {
    id: 'wm-014',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The wizard’s ____ saved the village."',
    choices: ['prepare', 'preparation', 'preparatory', 'preparedly'],
    answerIndex: 1,
  },
  {
    id: 'wm-015',
    gameType: 'WORD_MORPH',
    prompt: 'Choose the best word: "The knight acted with ____."',
    choices: ['honesty', 'honest', 'honestly', 'honestness'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getWordMorphRunQuestions = (levelId: number, count = 10): WordMorphQuestion[] => {
  const base = rotate(WORD_MORPH_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

