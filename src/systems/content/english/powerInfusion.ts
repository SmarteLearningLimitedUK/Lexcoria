import { MiniGameType } from '../../../types';

export type PowerInfusionQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'POWER_INFUSION'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
};

export const POWER_INFUSION_QUESTIONS: PowerInfusionQuestion[] = [
  {
    id: 'pi-001',
    gameType: 'POWER_INFUSION',
    prompt: 'Choose the sentence that adds detail without changing meaning.',
    choices: [
      'The knight ran to the gate.',
      'The knight sprinted to the gate, his boots thudding on the stone.',
      'The knight ran away from the gate.',
      'The knight ran to the gate yesterday and tomorrow.',
    ],
    answerIndex: 1,
  },
  {
    id: 'pi-002',
    gameType: 'POWER_INFUSION',
    prompt: 'Choose the sentence that adds detail without changing meaning.',
    choices: [
      'The wizard whispered a spell.',
      'The wizard shouted a spell.',
      'The wizard whispered a spell, barely louder than a breath.',
      'The wizard forgot the spell.',
    ],
    answerIndex: 2,
  },
  {
    id: 'pi-003',
    gameType: 'POWER_INFUSION',
    prompt: 'Choose the sentence that adds detail without changing meaning.',
    choices: [
      'The cave was dark.',
      'The cave was dark, and the air felt cold and damp.',
      'The cave was bright and sunny.',
      'The cave was dark because it was actually a room.',
    ],
    answerIndex: 1,
  },
  {
    id: 'pi-004',
    gameType: 'POWER_INFUSION',
    prompt: 'Choose the sentence that adds detail without changing meaning.',
    choices: [
      'The dragon flew over the valley.',
      'The dragon crawled over the valley.',
      'The dragon flew over the valley, casting a wide shadow below.',
      'The dragon flew under the valley.',
    ],
    answerIndex: 2,
  },
  {
    id: 'pi-005',
    gameType: 'POWER_INFUSION',
    prompt: 'Choose the sentence that adds detail without changing meaning.',
    choices: [
      'The guard watched the door.',
      'The guard watched the door, gripping his spear tightly.',
      'The guard watched the door and fell asleep instantly.',
      'The guard watched the window, not the door.',
    ],
    answerIndex: 1,
  },
  {
    id: 'pi-006',
    gameType: 'POWER_INFUSION',
    prompt: 'Choose the sentence that adds detail without changing meaning.',
    choices: [
      'The storm arrived.',
      'The storm arrived, and thunder rolled across the hills.',
      'The storm arrived yesterday and left before it arrived.',
      'The storm arrived because it was a sunny day.',
    ],
    answerIndex: 1,
  },
  {
    id: 'pi-007',
    gameType: 'POWER_INFUSION',
    prompt: 'Choose the sentence that adds detail without changing meaning.',
    choices: [
      'The explorer opened the chest.',
      'The explorer opened the chest, its hinges creaking loudly.',
      'The explorer closed the chest.',
      'The explorer opened the chest by never touching it.',
    ],
    answerIndex: 1,
  },
  {
    id: 'pi-008',
    gameType: 'POWER_INFUSION',
    prompt: 'Choose the sentence that adds detail without changing meaning.',
    choices: [
      'The village was quiet.',
      'The village was quiet, with only the wind stirring the banners.',
      'The village was noisy and quiet at the same time.',
      'The village was quiet because it was empty of people and full of crowds.',
    ],
    answerIndex: 1,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getPowerInfusionRunQuestions = (levelId: number, count = 10): PowerInfusionQuestion[] => {
  const base = rotate(POWER_INFUSION_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

