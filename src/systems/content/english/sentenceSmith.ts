import { MiniGameType } from '../../../types';

export type SentenceSmithQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'SENTENCE_SMITH'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const SENTENCE_SMITH_QUESTIONS: SentenceSmithQuestion[] = [
  {
    id: 'ssm-001',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'The knight ran quickly, he was late.',
    choices: [
      'The knight ran quickly because he was late.',
      'The knight ran quickly; he was late.',
      'The knight ran quickly he was late.',
      'The knight ran quickly: he was late.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssm-002',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'The dragon was hungry it ate the sheep.',
    choices: [
      'The dragon was hungry, it ate the sheep.',
      'The dragon was hungry; it ate the sheep.',
      'The dragon was hungry it ate the sheep.',
      'The dragon was hungry: it ate the sheep.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssm-003',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'Mina opened the gate and she looked around.',
    choices: [
      'Mina opened the gate, and she looked around.',
      'Mina opened the gate and looked around.',
      'Mina opened the gate; and looked around.',
      'Mina opened, the gate and looked around.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssm-004',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'The map was old, it was torn and stained.',
    choices: [
      'The map was old, it was torn and stained.',
      'The map was old; it was torn and stained.',
      'The map was old it was torn and stained.',
      'The map was old: it was torn and stained.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssm-005',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'The wizard smiled he knew the answer.',
    choices: [
      'The wizard smiled because he knew the answer.',
      'The wizard smiled; he knew the answer.',
      'The wizard smiled he knew the answer.',
      'The wizard smiled, he knew the answer.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssm-006',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'The villagers cheered. Loudly.',
    choices: [
      'The villagers cheered loudly.',
      'The villagers cheered, loudly.',
      'The villagers cheered; loudly.',
      'The villagers cheered: loudly.',
    ],
    answerIndex: 0,
  },
  {
    id: 'ssm-007',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'The guard shouted, “Stop”.',
    choices: [
      'The guard shouted, “Stop.”',
      'The guard shouted “Stop”.',
      'The guard shouted: “Stop”.',
      'The guard shouted, “Stop”,',
    ],
    answerIndex: 0,
  },
  {
    id: 'ssm-008',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'The torch was heavy but it was useful.',
    choices: [
      'The torch was heavy, but it was useful.',
      'The torch was heavy; but it was useful.',
      'The torch was heavy but, it was useful.',
      'The torch was heavy: but it was useful.',
    ],
    answerIndex: 0,
  },
  {
    id: 'ssm-009',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'Because the wind howled the lantern flickered.',
    choices: [
      'Because the wind howled the lantern flickered.',
      'Because the wind howled, the lantern flickered.',
      'Because, the wind howled the lantern flickered.',
      'Because the wind howled the lantern, flickered.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssm-010',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'The heroes packed rope water and food.',
    choices: [
      'The heroes packed rope, water and food.',
      'The heroes packed rope water, and food.',
      'The heroes packed rope water and, food.',
      'The heroes packed, rope water and food.',
    ],
    answerIndex: 0,
  },
  {
    id: 'ssm-011',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'If you hurry you will catch up.',
    choices: [
      'If you hurry you will catch up.',
      'If you hurry, you will catch up.',
      'If, you hurry you will catch up.',
      'If you hurry you, will catch up.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssm-012',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'The wizard said “Be careful”.',
    choices: [
      'The wizard said, “Be careful.”',
      'The wizard said “Be careful.”',
      'The wizard said: “Be careful”.',
      'The wizard said, “Be careful”,',
    ],
    answerIndex: 0,
  },
  {
    id: 'ssm-013',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'The dragon roared. The villagers hid.',
    choices: [
      'The dragon roared, the villagers hid.',
      'The dragon roared; the villagers hid.',
      'The dragon roared: the villagers hid.',
      'The dragon roared the villagers hid.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssm-014',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'The path was narrow, it was safe.',
    choices: [
      'The path was narrow, it was safe.',
      'The path was narrow; it was safe.',
      'The path was narrow it was safe.',
      'The path was narrow: it was safe.',
    ],
    answerIndex: 1,
  },
  {
    id: 'ssm-015',
    gameType: 'SENTENCE_SMITH',
    prompt: 'Choose the best revision to improve this sentence.',
    sentence: 'The gate opened, and the crowd cheered.',
    choices: [
      'The gate opened, and the crowd cheered.',
      'The gate opened and, the crowd cheered.',
      'The gate opened; and the crowd cheered.',
      'The gate opened, and, the crowd cheered.',
    ],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getSentenceSmithRunQuestions = (levelId: number, count = 10): SentenceSmithQuestion[] => {
  const base = rotate(SENTENCE_SMITH_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

