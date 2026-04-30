import { MiniGameType } from '../../../types';

export type ApostropheOutlawsQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'APOSTROPHE_OUTLAWS'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const APOSTROPHE_OUTLAWS_QUESTIONS: ApostropheOutlawsQuestion[] = [
  {
    id: 'ap-001',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ cloak was torn.',
    choices: ['wizard’s', 'wizards', 'wizards’', 'wizard s'],
    answerIndex: 0,
  },
  {
    id: 'ap-002',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ boots were muddy.',
    choices: ['knights’', 'knight’s', 'knights', 'knight s’'],
    answerIndex: 0,
  },
  {
    id: 'ap-003',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'I ___ believe the gate is open.',
    choices: ["can’t", 'cant', "cant'", 'c’nt'],
    answerIndex: 0,
  },
  {
    id: 'ap-004',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ roar echoed across the valley.',
    choices: ['dragon’s', 'dragons', 'dragons’', "dragon’s’"],
    answerIndex: 0,
  },
  {
    id: 'ap-005',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ room was locked.',
    choices: ['children’s', 'childrens', 'childrens’', 'childrens’s'],
    answerIndex: 0,
  },
  {
    id: 'ap-006',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ lanterns lit the path.',
    choices: ['guards’', "guard’s", 'guards', "guard’s’"],
    answerIndex: 0,
  },
  {
    id: 'ap-007',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'She ___ finished her work.',
    choices: ["hasn’t", 'hasnt', "has'nt", "hasn’t’"],
    answerIndex: 0,
  },
  {
    id: 'ap-008',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ helmets shone in the sun.',
    choices: ['soldiers’', "soldier’s", 'soldiers', 'soldier s’'],
    answerIndex: 0,
  },
  {
    id: 'ap-009',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'That ___ not my map.',
    choices: ["isn’t", 'isnt', "is'nt", 'isn t'],
    answerIndex: 0,
  },
  {
    id: 'ap-010',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ wings were enormous.',
    choices: ['eagle’s', 'eagles', 'eagles’', "eagle s’"],
    answerIndex: 0,
  },
  {
    id: 'ap-011',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ classroom was quiet.',
    choices: ['teacher’s', 'teachers’', 'teachers', 'teacher s'],
    answerIndex: 0,
  },
  {
    id: 'ap-012',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ books were stacked on the table.',
    choices: ['teachers’', "teacher’s", 'teachers', "teacher’s’"],
    answerIndex: 0,
  },
  {
    id: 'ap-013',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ den was hidden behind the waterfall.',
    choices: ['fox’s', 'foxs', 'foxs’', "fox’"],
    answerIndex: 0,
  },
  {
    id: 'ap-014',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ nests were high in the trees.',
    choices: ['birds’', "bird’s", 'birds', "bird’s’"],
    answerIndex: 0,
  },
  {
    id: 'ap-015',
    gameType: 'APOSTROPHE_OUTLAWS',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'We ___ going to be late.',
    choices: ["we’re", 'were', 'were’', "we' re"],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getApostropheOutlawsRunQuestions = (levelId: number, count = 10): ApostropheOutlawsQuestion[] => {
  const base = rotate(APOSTROPHE_OUTLAWS_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

