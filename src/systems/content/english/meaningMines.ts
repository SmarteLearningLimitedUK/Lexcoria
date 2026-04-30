import { MiniGameType } from '../../../types';

export type MeaningMinesQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'MEANING_MINES'>;
  prompt: string;
  sentence: string;
  target: string;
  choices: string[];
  answerIndex: number;
};

export const MEANING_MINES_QUESTIONS: MeaningMinesQuestion[] = [
  {
    id: 'mm-001',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The wizard gave a stern warning before the journey.',
    target: 'stern',
    choices: ['strict', 'funny', 'sleepy', 'bright'],
    answerIndex: 0,
  },
  {
    id: 'mm-002',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The villagers were relieved when the storm passed.',
    target: 'relieved',
    choices: ['comforted', 'angry', 'lost', 'confused'],
    answerIndex: 0,
  },
  {
    id: 'mm-003',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'Mina glanced at the map and nodded.',
    target: 'glanced',
    choices: ['looked quickly', 'fell asleep', 'spoke loudly', 'ran away'],
    answerIndex: 0,
  },
  {
    id: 'mm-004',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The dragon’s scales gleamed in the sunlight.',
    target: 'gleamed',
    choices: ['shone', 'crumbled', 'whispered', 'froze'],
    answerIndex: 0,
  },
  {
    id: 'mm-005',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The path was treacherous, so they moved slowly.',
    target: 'treacherous',
    choices: ['dangerous', 'delicious', 'easy', 'silent'],
    answerIndex: 0,
  },
  {
    id: 'mm-006',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The wizard was reluctant to share the secret.',
    target: 'reluctant',
    choices: ['unwilling', 'excited', 'certain', 'friendly'],
    answerIndex: 0,
  },
  {
    id: 'mm-007',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The crowd grew restless as they waited.',
    target: 'restless',
    choices: ['unable to relax', 'very tired', 'perfectly calm', 'completely silent'],
    answerIndex: 0,
  },
  {
    id: 'mm-008',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'Mina made a bold decision and stepped forward.',
    target: 'bold',
    choices: ['brave', 'careless', 'tiny', 'slow'],
    answerIndex: 0,
  },
  {
    id: 'mm-009',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The message was concealed beneath the stone.',
    target: 'concealed',
    choices: ['hidden', 'shouted', 'painted', 'broken'],
    answerIndex: 0,
  },
  {
    id: 'mm-010',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The wizard spoke in a calm tone.',
    target: 'calm',
    choices: ['peaceful', 'angry', 'noisy', 'confusing'],
    answerIndex: 0,
  },
  {
    id: 'mm-011',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The knight inspected the gate carefully.',
    target: 'inspected',
    choices: ['examined', 'ignored', 'closed', 'forgot'],
    answerIndex: 0,
  },
  {
    id: 'mm-012',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The wizard’s advice was practical for the journey.',
    target: 'practical',
    choices: ['useful', 'imaginary', 'dangerous', 'boring'],
    answerIndex: 0,
  },
  {
    id: 'mm-013',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The hero hurried to the harbour.',
    target: 'hurried',
    choices: ['moved quickly', 'sat down', 'laughed', 'slept'],
    answerIndex: 0,
  },
  {
    id: 'mm-014',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The dragon was furious about the lost gold.',
    target: 'furious',
    choices: ['very angry', 'very hungry', 'very happy', 'very tired'],
    answerIndex: 0,
  },
  {
    id: 'mm-015',
    gameType: 'MEANING_MINES',
    prompt: 'What does the highlighted word mean in this sentence?',
    sentence: 'The wizard muttered under his breath.',
    target: 'muttered',
    choices: ['spoke quietly', 'sang loudly', 'waved', 'ran'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getMeaningMinesRunQuestions = (levelId: number, count = 10): MeaningMinesQuestion[] => {
  const base = rotate(MEANING_MINES_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

