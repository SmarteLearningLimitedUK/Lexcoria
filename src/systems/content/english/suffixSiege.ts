import { MiniGameType } from '../../../types';

export type SuffixSiegeQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'SUFFIX_SIEGE'>;
  prompt: string;
  sentence: string;
  choices: string[];
  answerIndex: number;
};

export const SUFFIX_SIEGE_QUESTIONS: SuffixSiegeQuestion[] = [
  {
    id: 'ss-001',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The hero was ___ than the others.',
    choices: ['braver', 'braveer', 'bravver', 'bravverr'],
    answerIndex: 0,
  },
  {
    id: 'ss-002',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The dragon’s fire was the ___ of all.',
    choices: ['hottest', 'hotest', 'hotttest', 'hottist'],
    answerIndex: 0,
  },
  {
    id: 'ss-003',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The kingdom was full of ___.',
    choices: ['happiness', 'happyness', 'hapiness', 'happines'],
    answerIndex: 0,
  },
  {
    id: 'ss-004',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'She ___ the scroll carefully.',
    choices: ['studied', 'studyed', 'studdyed', 'studing'],
    answerIndex: 0,
  },
  {
    id: 'ss-005',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'He was ___ by the riddle.',
    choices: ['confused', 'confuzed', 'confussed', 'confusinged'],
    answerIndex: 0,
  },
  {
    id: 'ss-006',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The wizard began ___ a new spell.',
    choices: ['writing', 'writeing', 'writting', 'writtingg'],
    answerIndex: 0,
  },
  {
    id: 'ss-007',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'They walked ___ across the bridge.',
    choices: ['carefully', 'carefuly', 'carefullly', 'carefulley'],
    answerIndex: 0,
  },
  {
    id: 'ss-008',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The guard was ___ at his post.',
    choices: ['stationary', 'stationery', 'stasionary', 'stationarey'],
    answerIndex: 0,
  },
  {
    id: 'ss-009',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The villagers were ___ when the storm ended.',
    choices: ['relieved', 'reliefed', 'releived', 'relived'],
    answerIndex: 0,
  },
  {
    id: 'ss-010',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The knights trained ___ each day.',
    choices: ['harder', 'hardder', 'harderest', 'hardiest'],
    answerIndex: 0,
  },
  {
    id: 'ss-011',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The dragon was ___ than before.',
    choices: ['angrier', 'angryer', 'angriier', 'angreer'],
    answerIndex: 0,
  },
  {
    id: 'ss-012',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The wizard was ___ about the plan.',
    choices: ['hopeful', 'hopful', 'hopefull', 'hopfull'],
    answerIndex: 0,
  },
  {
    id: 'ss-013',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The noise grew ___ as the crowd arrived.',
    choices: ['louder', 'loudder', 'loudest', 'loudier'],
    answerIndex: 0,
  },
  {
    id: 'ss-014',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'The apprentice felt ___ after practise.',
    choices: ['tiredness', 'tirednesss', 'tirednes', 'tyredness'],
    answerIndex: 0,
  },
  {
    id: 'ss-015',
    gameType: 'SUFFIX_SIEGE',
    prompt: 'Choose the correct word to complete the sentence.',
    sentence: 'They planned their route ___.',
    choices: ['carefully', 'carefuly', 'carefullyy', 'carefulli'],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getSuffixSiegeRunQuestions = (levelId: number, count = 10): SuffixSiegeQuestion[] => {
  const base = rotate(SUFFIX_SIEGE_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

