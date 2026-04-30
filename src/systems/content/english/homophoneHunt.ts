import { MiniGameType } from '../../../types';

export type HomophoneHuntQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'HOMOPHONE_HUNT'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const HOMOPHONE_HUNT_QUESTIONS: HomophoneHuntQuestion[] = [
  {
    id: 'hh-001',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The dragon hid ___ treasure in the cave.',
    choices: ['its', "it’s", 'its’', 'it s'],
    answerIndex: 0,
  },
  {
    id: 'hh-002',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: '___ going to the harbour after lunch.',
    choices: ["We’re", 'Were', 'Where', 'Wear'],
    answerIndex: 0,
  },
  {
    id: 'hh-003',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The guard stood ___ the gate all night.',
    choices: ['by', 'buy', 'bye', 'bi'],
    answerIndex: 0,
  },
  {
    id: 'hh-004',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'I can ___ the lighthouse from here.',
    choices: ['see', 'sea', 'ce', 'sie'],
    answerIndex: 0,
  },
  {
    id: 'hh-005',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'She packed two apples and ___ pears.',
    choices: ['four', 'for', 'fore', 'phor'],
    answerIndex: 0,
  },
  {
    id: 'hh-006',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The map is over ___.',
    choices: ['there', 'their', "they’re", 'thare'],
    answerIndex: 0,
  },
  {
    id: 'hh-007',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The knight tied the rope to the ___ post.',
    choices: ['wooden', 'woulden', 'wouden', 'woodin'],
    answerIndex: 0,
  },
  {
    id: 'hh-008',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ was quiet at sunrise.',
    choices: ['village', 'villige', 'vilej', 'villagee'],
    answerIndex: 0,
  },
  {
    id: 'hh-009',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'I would like to ___ a new lantern.',
    choices: ['buy', 'by', 'bye', 'bi'],
    answerIndex: 0,
  },
  {
    id: 'hh-010',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The wizard took the ___ path through the woods.',
    choices: ['right', 'write', 'rite', 'writ'],
    answerIndex: 0,
  },
  {
    id: 'hh-011',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The heroes will ___ the treasure at noon.',
    choices: ['find', 'fined', 'phind', 'fyind'],
    answerIndex: 0,
  },
  {
    id: 'hh-012',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The dragon flew ___ the clouds.',
    choices: ['through', 'threw', 'thru', 'throu'],
    answerIndex: 0,
  },
  {
    id: 'hh-013',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'Please ___ your cloak before we leave.',
    choices: ['wear', 'where', "we’re", 'were'],
    answerIndex: 0,
  },
  {
    id: 'hh-014',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The ___ climbed the tower.',
    choices: ['knight', 'night', 'nite', 'knyte'],
    answerIndex: 0,
  },
  {
    id: 'hh-015',
    gameType: 'HOMOPHONE_HUNT',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'We listened to the ___ roar.',
    choices: ['sea', 'see', 'cee', 'sie'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getHomophoneHuntRunQuestions = (levelId: number, count = 10): HomophoneHuntQuestion[] => {
  const base = rotate(HOMOPHONE_HUNT_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

