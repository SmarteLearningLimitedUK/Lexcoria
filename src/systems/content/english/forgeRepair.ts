import { MiniGameType } from '../../../types';

export type ForgeRepairQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'FORGE_REPAIR'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
};

export const FORGE_REPAIR_QUESTIONS: ForgeRepairQuestion[] = [
  {
    id: 'fr-001',
    gameType: 'FORGE_REPAIR',
    prompt: 'Choose the sentence that is corrected.',
    choices: [
      'The knights armour was heavy.',
      "The knight's armour was heavy.",
      "The knights' armour was heavy.",
      "The knight armour's was heavy.",
    ],
    answerIndex: 1,
  },
  {
    id: 'fr-002',
    gameType: 'FORGE_REPAIR',
    prompt: 'Choose the sentence that is corrected.',
    choices: [
      'When the bell rang the apprentices ran outside.',
      'When the bell rang, the apprentices ran outside.',
      'When, the bell rang the apprentices ran outside.',
      'When the bell, rang the apprentices ran outside.',
    ],
    answerIndex: 1,
  },
  {
    id: 'fr-003',
    gameType: 'FORGE_REPAIR',
    prompt: 'Choose the sentence that is corrected.',
    choices: [
      'Me and my friend went to the harbour.',
      'My friend and I went to the harbour.',
      'My friend and me went to the harbour.',
      'I and my friend went to the harbour.',
    ],
    answerIndex: 1,
  },
  {
    id: 'fr-004',
    gameType: 'FORGE_REPAIR',
    prompt: 'Choose the sentence that is corrected.',
    choices: [
      'The pack of wolves are howling.',
      'The pack of wolves is howling.',
      'The pack of wolves were howling.',
      'The pack of wolves be howling.',
    ],
    answerIndex: 1,
  },
  {
    id: 'fr-005',
    gameType: 'FORGE_REPAIR',
    prompt: 'Choose the sentence that is corrected.',
    choices: [
      'Its a long journey across the mountains.',
      "It's a long journey across the mountains.",
      "Its' a long journey across the mountains.",
      'Itts a long journey across the mountains.',
    ],
    answerIndex: 1,
  },
  {
    id: 'fr-006',
    gameType: 'FORGE_REPAIR',
    prompt: 'Choose the sentence that is corrected.',
    choices: [
      'The wizard gave the scroll to I.',
      'The wizard gave the scroll to me.',
      'The wizard gave the scroll to he.',
      'The wizard gave the scroll to we.',
    ],
    answerIndex: 1,
  },
  {
    id: 'fr-007',
    gameType: 'FORGE_REPAIR',
    prompt: 'Choose the sentence that is corrected.',
    choices: [
      'We was ready for the quest.',
      'We were ready for the quest.',
      'We be ready for the quest.',
      'We are ready for the quest yesterday.',
    ],
    answerIndex: 1,
  },
  {
    id: 'fr-008',
    gameType: 'FORGE_REPAIR',
    prompt: 'Choose the sentence that is corrected.',
    choices: [
      'The dragon, flew over the valley.',
      'The dragon flew over the valley.',
      'The dragon flew, over the valley.',
      'The dragon flew over, the valley.',
    ],
    answerIndex: 1,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getForgeRepairRunQuestions = (levelId: number, count = 10): ForgeRepairQuestion[] => {
  const base = rotate(FORGE_REPAIR_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

