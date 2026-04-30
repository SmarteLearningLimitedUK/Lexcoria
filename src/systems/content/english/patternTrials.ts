import { MiniGameType } from '../../../types';

export type PatternTrialsQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'PATTERN_TRIALS'>;
  prompt: string;
  choices: string[];
  answerIndex: number;
};

export const PATTERN_TRIALS_QUESTIONS: PatternTrialsQuestion[] = [
  {
    id: 'pt-001',
    gameType: 'PATTERN_TRIALS',
    prompt: "Choose the correct spelling for the /sh/ sound ending: usually 'cial'.",
    choices: ['spechial', 'special', 'spetial', 'speshal'],
    answerIndex: 1,
  },
  {
    id: 'pt-002',
    gameType: 'PATTERN_TRIALS',
    prompt: "Choose the correct spelling: words ending with 'tion' often sound like /shun/.",
    choices: ['invention', 'inventshun', 'inventtion', 'inventian'],
    answerIndex: 0,
  },
  {
    id: 'pt-003',
    gameType: 'PATTERN_TRIALS',
    prompt: "Choose the correct spelling: 'ie' after 'c' for this word.",
    choices: ['recieve', 'receive', 'receeve', 'receiv'],
    answerIndex: 1,
  },
  {
    id: 'pt-004',
    gameType: 'PATTERN_TRIALS',
    prompt: "Choose the correct spelling for the /ch/ sound in this word.",
    choices: ['mature', 'nature', 'picture', 'sicher'],
    answerIndex: 2,
  },
  {
    id: 'pt-005',
    gameType: 'PATTERN_TRIALS',
    prompt: "Choose the correct spelling: 'ough' can make different sounds, but this word uses /uff/.",
    choices: ['tough', 'though', 'through', 'thought'],
    answerIndex: 0,
  },
  {
    id: 'pt-006',
    gameType: 'PATTERN_TRIALS',
    prompt: "Choose the correct spelling: the /or/ sound is spelled 'aw'.",
    choices: ['cort', 'court', 'caught', 'cawt'],
    answerIndex: 2,
  },
  {
    id: 'pt-007',
    gameType: 'PATTERN_TRIALS',
    prompt: 'Choose the correct spelling.',
    choices: ['privilege', 'privilage', 'privelege', 'prevelege'],
    answerIndex: 0,
  },
  {
    id: 'pt-008',
    gameType: 'PATTERN_TRIALS',
    prompt: "Choose the correct spelling: double the consonant before adding '-ed'.",
    choices: ['forgeted', 'forgotted', 'forgotten', 'forgoted'],
    answerIndex: 2,
  },
  {
    id: 'pt-009',
    gameType: 'PATTERN_TRIALS',
    prompt: "Choose the correct spelling: 'y' changes to 'i' before adding '-ly'.",
    choices: ['happily', 'happyly', 'happylly', 'happeely'],
    answerIndex: 0,
  },
  {
    id: 'pt-010',
    gameType: 'PATTERN_TRIALS',
    prompt: "Choose the correct spelling: 'able' not 'ible' for this word.",
    choices: ['available', 'availible', 'avialable', 'availabel'],
    answerIndex: 0,
  },
  {
    id: 'pt-011',
    gameType: 'PATTERN_TRIALS',
    prompt: "Choose the correct spelling: 'ible' not 'able' for this word.",
    choices: ['responsable', 'responsible', 'responsablee', 'responsibel'],
    answerIndex: 1,
  },
  {
    id: 'pt-012',
    gameType: 'PATTERN_TRIALS',
    prompt: 'Choose the correct spelling.',
    choices: ['parliament', 'parliment', 'parllyament', 'parlement'],
    answerIndex: 0,
  },
  {
    id: 'pt-013',
    gameType: 'PATTERN_TRIALS',
    prompt: "Choose the correct spelling: the /ee/ sound in this word is spelled 'ei'.",
    choices: ['seize', 'sieze', 'seeze', 'ceize'],
    answerIndex: 0,
  },
  {
    id: 'pt-014',
    gameType: 'PATTERN_TRIALS',
    prompt: "Choose the correct spelling: use 'ch' for the /k/ sound in this word.",
    choices: ['kord', 'cord', 'chorus', 'chorid'],
    answerIndex: 2,
  },
  {
    id: 'pt-015',
    gameType: 'PATTERN_TRIALS',
    prompt: 'Choose the correct spelling.',
    choices: ['soldier', 'souldier', 'soldger', 'sollier'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getPatternTrialsRunQuestions = (levelId: number, count = 10): PatternTrialsQuestion[] => {
  const base = rotate(PATTERN_TRIALS_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

