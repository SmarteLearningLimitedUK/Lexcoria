import { MiniGameType } from '../../../types';

export type ClauseKeepQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'CLAUSE_KEEP'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const CLAUSE_KEEP_QUESTIONS: ClauseKeepQuestion[] = [
  {
    id: 'ck-001',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the main clause?',
    sentence: 'Although the rain fell, the knight continued the journey.',
    choices: ['Although the rain fell', 'the knight continued the journey', 'the journey', 'continued the'],
    answerIndex: 1,
  },
  {
    id: 'ck-002',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the subordinate clause?',
    sentence: 'The dragon slept because it was exhausted.',
    choices: ['The dragon slept', 'because it was exhausted', 'slept because', 'it was'],
    answerIndex: 1,
  },
  {
    id: 'ck-003',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the main clause?',
    sentence: 'When the bell rang, the apprentices rushed outside.',
    choices: ['When the bell rang', 'the apprentices rushed outside', 'the bell', 'rushed outside'],
    answerIndex: 1,
  },
  {
    id: 'ck-004',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the subordinate clause?',
    sentence: 'We waited until the guard returned.',
    choices: ['We waited', 'until the guard returned', 'the guard', 'returned until'],
    answerIndex: 1,
  },
  {
    id: 'ck-005',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the main clause?',
    sentence: 'If you read the map carefully, you will find the treasure.',
    choices: ['If you read the map carefully', 'you will find the treasure', 'read the map', 'carefully you will'],
    answerIndex: 1,
  },
  {
    id: 'ck-006',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the subordinate clause?',
    sentence: 'The villagers cheered after the hero returned.',
    choices: ['The villagers cheered', 'after the hero returned', 'the hero', 'cheered after'],
    answerIndex: 1,
  },
  {
    id: 'ck-007',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the main clause?',
    sentence: 'Because the path was steep, they walked slowly.',
    choices: ['Because the path was steep', 'they walked slowly', 'the path', 'was steep they'],
    answerIndex: 1,
  },
  {
    id: 'ck-008',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the subordinate clause?',
    sentence: 'The wizard smiled while the potion bubbled.',
    choices: ['The wizard smiled', 'while the potion bubbled', 'the potion', 'smiled while'],
    answerIndex: 1,
  },
  {
    id: 'ck-009',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the main clause?',
    sentence: 'Even though the lantern flickered, the tunnel stayed clear.',
    choices: ['Even though the lantern flickered', 'the tunnel stayed clear', 'the lantern', 'stayed clear'],
    answerIndex: 1,
  },
  {
    id: 'ck-010',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the subordinate clause?',
    sentence: 'She packed her bag before the storm arrived.',
    choices: ['She packed her bag', 'before the storm arrived', 'packed her', 'storm arrived'],
    answerIndex: 1,
  },
  {
    id: 'ck-011',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the main clause?',
    sentence: 'Whenever the owl hooted, the guards tightened their grip.',
    choices: ['Whenever the owl hooted', 'the guards tightened their grip', 'the owl', 'tightened their'],
    answerIndex: 1,
  },
  {
    id: 'ck-012',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the subordinate clause?',
    sentence: 'The door opened as soon as the key turned.',
    choices: ['The door opened', 'as soon as the key turned', 'the key', 'opened as soon'],
    answerIndex: 1,
  },
  {
    id: 'ck-013',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the main clause?',
    sentence: 'Although Mina was nervous, she answered the riddle.',
    choices: ['Although Mina was nervous', 'she answered the riddle', 'Mina was', 'answered the'],
    answerIndex: 1,
  },
  {
    id: 'ck-014',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the subordinate clause?',
    sentence: 'They travelled quickly so that they could arrive on time.',
    choices: ['They travelled quickly', 'so that they could arrive on time', 'they could arrive', 'arrive on time'],
    answerIndex: 1,
  },
  {
    id: 'ck-015',
    gameType: 'CLAUSE_KEEP',
    prompt: 'Which option is the main clause?',
    sentence: 'If the torch goes out, the room will be dark.',
    choices: ['If the torch goes out', 'the room will be dark', 'the torch', 'will be'],
    answerIndex: 1,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getClauseKeepRunQuestions = (levelId: number, count = 10): ClauseKeepQuestion[] => {
  const base = rotate(CLAUSE_KEEP_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

