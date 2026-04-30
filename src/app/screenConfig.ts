import { GameScreen, MiniGameType } from '../types';

export const MAP_LAYOUT_SCREENS: GameScreen[] = ['world_map', 'island_levels'];

export const QUESTION_MATCH_FRAME_GAMES: MiniGameType[] = [
  'WORD_WARDEN',
  'TENSE_TOWER',
  'CLAUSE_KEEP',
  'CONJUNCTION_CROSSING',
  'GRAMMAR_GUARD',
  'COMMA_CANNON',
  'APOSTROPHE_OUTLAWS',
  'PUNCTUATION_PATROL',
  'STRONGHOLD_SPRINT',
  'PREFIX_PATROL',
  'FORGE_OF_SUFFIXES',
  'HALL_OF_ECHOES',
  'SPELLING_FORGE',
  'PATTERN_TRIALS',
  'WORD_MORPH',
  'HOMOPHONE_HUNT',
  'SUFFIX_SIEGE',
  'SENTENCE_SMITH',
  'SENTENCE_SHIFT',
  'BLADE_REFINER',
  'POWER_INFUSION',
  'FORGE_REPAIR',
  'PARAGRAPH_PATCH',
  'CONNECTIVE_CRAFTER',
  'WORD_SENSE',
  'TWIN_WORDS_TRIAL',
  'ANTONYM_AMBUSH',
  'TONE_TRADER',
  'MEANING_MATCH',
  'WORD_WIZARD',
  'MEANING_MINES',
  'SYNONYM_SIEGE',
  'EVIDENCE_HIGHLIGHT',
  'RETRIEVAL_RAPIDS',
  'INFERENCE_ISLE',
  'EVIDENCE_EXPLORER',
  'SEQUENCE_STREAM',
  'AUTHOR_INTENT',
  'SUMMARY_SELECT',
  'EVIDENCE_CHAIN',
  'PASSAGE_QUEST',
  'TWIN_TICK_TRIAL',
  'RULE_BREAKER',
  'BEST_ANSWER_QUEST',
  'MIXED_MASTERY',
  'LEGENDS_CHALLENGE',
  'READING_RESCUE',
  'GRAMMAR_GAUNTLET',
  'WORDSMITH_TRIALS',
];

export const SCREEN_BEHAVIOR: Record<GameScreen, {
  scrollable: boolean;
  shell: 'splash' | 'compact' | 'playfield';
  family: 'hub' | 'game' | 'overlay';
}> = {
  splash: { scrollable: false, shell: 'splash', family: 'hub' },
  profile_setup: { scrollable: false, shell: 'playfield', family: 'hub' },
  avatar_selection: { scrollable: false, shell: 'playfield', family: 'hub' },
  world_map: { scrollable: true, shell: 'playfield', family: 'hub' },
  island_levels: { scrollable: true, shell: 'playfield', family: 'hub' },
  gameplay: { scrollable: false, shell: 'playfield', family: 'game' },
  wellbeing_hub: { scrollable: false, shell: 'playfield', family: 'hub' },
  wellbeing_activity: { scrollable: false, shell: 'playfield', family: 'hub' },
  level_result: { scrollable: false, shell: 'playfield', family: 'overlay' },
  shop: { scrollable: false, shell: 'compact', family: 'hub' },
  achievements_tracker: { scrollable: true, shell: 'compact', family: 'hub' },
  profile: { scrollable: true, shell: 'compact', family: 'hub' },
  settings: { scrollable: false, shell: 'compact', family: 'hub' },
  parent_dashboard: { scrollable: true, shell: 'playfield', family: 'hub' },
};

export const IPHONE_STAGE_WIDTH = 390;
export const IPHONE_STAGE_HEIGHT = 844;
export const IPAD_STAGE_WIDTH = 768;
export const IPAD_STAGE_HEIGHT = 1024;
