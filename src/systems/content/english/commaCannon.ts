import { MiniGameType } from '../../../types';

export type CommaCannonQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'COMMA_CANNON'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
};

export const COMMA_CANNON_QUESTIONS: CommaCannonQuestion[] = [
  {
    id: 'cm-001',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'After the battle the villagers cheered loudly.',
      'After the battle, the villagers cheered loudly.',
      'After, the battle the villagers cheered loudly.',
      'After the, battle the villagers cheered loudly.',
    ],
    answerIndex: 1,
  },
  {
    id: 'cm-002',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'In the cave we found coins, gems and a map.',
      'In the cave, we found coins, gems, and a map.',
      'In the cave we found, coins gems and a map.',
      'In the cave, we found coins gems and a map.',
    ],
    answerIndex: 1,
  },
  {
    id: 'cm-003',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'Although it was late, we continued walking.',
      'Although it was late we, continued walking.',
      'Although, it was late we continued walking.',
      'Although it was, late we continued walking.',
    ],
    answerIndex: 0,
  },
  {
    id: 'cm-004',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'The wizard, who wore a blue cloak, smiled.',
      'The wizard who wore a blue cloak, smiled.',
      'The wizard, who wore a blue cloak smiled.',
      'The wizard who wore, a blue cloak, smiled.',
    ],
    answerIndex: 0,
  },
  {
    id: 'cm-005',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'First, we packed the lantern then we left.',
      'First we packed, the lantern, then we left.',
      'First, we packed the lantern, then we left.',
      'First we packed the lantern then, we left.',
    ],
    answerIndex: 2,
  },
  {
    id: 'cm-006',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'Yes I can help you.',
      'Yes, I can help you.',
      'Yes I, can help you.',
      'Yes, I can, help you.',
    ],
    answerIndex: 1,
  },
  {
    id: 'cm-007',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'If you listen carefully, you can hear the river.',
      'If you listen carefully you, can hear the river.',
      'If, you listen carefully you can hear the river.',
      'If you, listen carefully you can hear the river.',
    ],
    answerIndex: 0,
  },
  {
    id: 'cm-008',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'The knight grabbed his shield, and ran.',
      'The knight grabbed his shield and ran.',
      'The knight grabbed his shield, and, ran.',
      'The knight grabbed, his shield and ran.',
    ],
    answerIndex: 1,
  },
  {
    id: 'cm-009',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'In the morning, we will leave, and we will not return.',
      'In the morning we will leave and we will not return.',
      'In the morning, we will leave and we will not return.',
      'In the morning we, will leave and we will not return.',
    ],
    answerIndex: 2,
  },
  {
    id: 'cm-010',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'The torch was heavy, but it was useful.',
      'The torch was heavy but, it was useful.',
      'The torch was heavy, but, it was useful.',
      'The torch, was heavy but it was useful.',
    ],
    answerIndex: 0,
  },
  {
    id: 'cm-011',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'Before you enter, check your supplies.',
      'Before, you enter check your supplies.',
      'Before you, enter check your supplies.',
      'Before you enter check, your supplies.',
    ],
    answerIndex: 0,
  },
  {
    id: 'cm-012',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'I brought bread, cheese, and apples.',
      'I brought bread cheese, and apples.',
      'I brought, bread, cheese and apples.',
      'I brought bread, cheese and, apples.',
    ],
    answerIndex: 0,
  },
  {
    id: 'cm-013',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'Suddenly, the gate swung open.',
      'Suddenly the gate, swung open.',
      'Suddenly the, gate swung open.',
      'Suddenly the gate swung, open.',
    ],
    answerIndex: 0,
  },
  {
    id: 'cm-014',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'My brother, and my sister, ran ahead.',
      'My brother and my sister ran ahead.',
      'My brother and, my sister ran ahead.',
      'My brother, and my sister ran ahead.',
    ],
    answerIndex: 1,
  },
  {
    id: 'cm-015',
    gameType: 'COMMA_CANNON',
    prompt: 'Choose the sentence with commas used correctly.',
    choices: [
      'The map was old, stained and torn.',
      'The map was old stained, and torn.',
      'The map was old, stained, and torn.',
      'The map, was old stained and torn.',
    ],
    answerIndex: 2,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getCommaCannonRunQuestions = (levelId: number, count = 10): CommaCannonQuestion[] => {
  const base = rotate(COMMA_CANNON_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

