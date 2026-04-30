import { MiniGameType } from '../../../types';

export type BladeRefinerQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'BLADE_REFINER'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
};

export const BLADE_REFINER_QUESTIONS: BladeRefinerQuestion[] = [
  {
    id: 'br-001',
    gameType: 'BLADE_REFINER',
    prompt: 'Replace the weak word: "The dragon was ____."',
    choices: ['big', 'enormous', 'nice', 'ok'],
    answerIndex: 1,
  },
  {
    id: 'br-002',
    gameType: 'BLADE_REFINER',
    prompt: 'Replace the weak word: "The explorer walked ____ into the cave."',
    choices: ['carefully', 'badly', 'sadly', 'loudly'],
    answerIndex: 0,
  },
  {
    id: 'br-003',
    gameType: 'BLADE_REFINER',
    prompt: 'Replace the weak word: "The wizard said the spell was ____."',
    choices: ['good', 'powerful', 'tasty', 'tiny'],
    answerIndex: 1,
  },
  {
    id: 'br-004',
    gameType: 'BLADE_REFINER',
    prompt: 'Replace the weak word: "The guard looked ____ at the map."',
    choices: ['confused', 'yummy', 'fluffy', 'stripy'],
    answerIndex: 0,
  },
  {
    id: 'br-005',
    gameType: 'BLADE_REFINER',
    prompt: 'Replace the weak word: "The storm was ____."',
    choices: ['bad', 'fierce', 'funny', 'gentle'],
    answerIndex: 1,
  },
  {
    id: 'br-006',
    gameType: 'BLADE_REFINER',
    prompt: 'Replace the weak word: "The knight felt ____ about the quest."',
    choices: ['worried', 'delighted', 'wooden', 'square'],
    answerIndex: 0,
  },
  {
    id: 'br-007',
    gameType: 'BLADE_REFINER',
    prompt: 'Replace the weak word: "The path was ____ to see."',
    choices: ['hard', 'difficult', 'sweet', 'noisy'],
    answerIndex: 1,
  },
  {
    id: 'br-008',
    gameType: 'BLADE_REFINER',
    prompt: 'Replace the weak word: "The message was ____."',
    choices: ['clear', 'messy', 'sleepy', 'angry'],
    answerIndex: 0,
  },
  {
    id: 'br-009',
    gameType: 'BLADE_REFINER',
    prompt: 'Replace the weak word: "The crowd was ____."',
    choices: ['excited', 'grey', 'dusty', 'quiet'],
    answerIndex: 0,
  },
  {
    id: 'br-010',
    gameType: 'BLADE_REFINER',
    prompt: 'Replace the weak word: "The cave was ____."',
    choices: ['dark', 'bright', 'tasty', 'tiny'],
    answerIndex: 0,
  },
  {
    id: 'br-011',
    gameType: 'BLADE_REFINER',
    prompt: 'Replace the weak word: "The hero moved ____."',
    choices: ['swiftly', 'slowly', 'softly', 'sadly'],
    answerIndex: 0,
  },
  {
    id: 'br-012',
    gameType: 'BLADE_REFINER',
    prompt: 'Replace the weak word: "The dragon’s eyes were ____."',
    choices: ['fierce', 'blue', 'round', 'small'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getBladeRefinerRunQuestions = (levelId: number, count = 10): BladeRefinerQuestion[] => {
  const base = rotate(BLADE_REFINER_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

