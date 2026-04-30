import { MiniGameType } from '../../../types';

export type HallOfEchoesQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'HALL_OF_ECHOES'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
};

export const HALL_OF_ECHOES_QUESTIONS: HallOfEchoesQuestion[] = [
  {
    id: 'hoe-001',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The knight will ____ the oath tomorrow."',
    choices: ['swear', 'sware', 'sweer', 'sweerre'],
    answerIndex: 0,
  },
  {
    id: 'hoe-002',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The scroll was ____ on the table."',
    choices: ['laid', 'lade', 'layed', 'lied'],
    answerIndex: 0,
  },
  {
    id: 'hoe-003',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "Please ____ your voice in the library."',
    choices: ['lower', 'lour', 'loar', 'lore'],
    answerIndex: 0,
  },
  {
    id: 'hoe-004',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The team must ____ together to win."',
    choices: ['work', 'wurck', 'wok', 'worc'],
    answerIndex: 0,
  },
  {
    id: 'hoe-005',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The wizard tried to ____ the problem."',
    choices: ['solve', 'sohlv', 'soulve', 'sovle'],
    answerIndex: 0,
  },
  {
    id: 'hoe-006',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "We must ____ the rules to stay safe."',
    choices: ['follow', 'fallow', 'follaw', 'folow'],
    answerIndex: 0,
  },
  {
    id: 'hoe-007',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The hero did not want to ____ his friend."',
    choices: ['betray', 'beetray', 'betraye', 'bitray'],
    answerIndex: 0,
  },
  {
    id: 'hoe-008',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The message was meant for ____."',
    choices: ['you', 'yew', 'yoo', 'yu'],
    answerIndex: 0,
  },
  {
    id: 'hoe-009',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The apprentice said, \\"I can’t ____ the lever.\\""',
    choices: ['pull', 'pool', 'pule', 'powl'],
    answerIndex: 0,
  },
  {
    id: 'hoe-010',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The dragon’s ____ shook the stones."',
    choices: ['roar', 'rawer', 'rore', 'rour'],
    answerIndex: 0,
  },
  {
    id: 'hoe-011',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The queen will ____ the winners."',
    choices: ['choose', 'chews', 'chose', 'chuze'],
    answerIndex: 0,
  },
  {
    id: 'hoe-012',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The bridge was ____ by a storm."',
    choices: ['broken', 'broaken', 'brocken', 'brokeen'],
    answerIndex: 0,
  },
  {
    id: 'hoe-013',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The guard will ____ the gate at dusk."',
    choices: ['lock', 'lok', 'loch', 'lokk'],
    answerIndex: 0,
  },
  {
    id: 'hoe-014',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The explorer found a ____ of coins."',
    choices: ['pile', 'pyle', 'pial', 'pyll'],
    answerIndex: 0,
  },
  {
    id: 'hoe-015',
    gameType: 'HALL_OF_ECHOES',
    prompt: 'Choose the correct word: "The map was ____ to the wall."',
    choices: ['pinned', 'pind', 'pined', 'pinnd'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getHallOfEchoesRunQuestions = (levelId: number, count = 10): HallOfEchoesQuestion[] => {
  const base = rotate(HALL_OF_ECHOES_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

