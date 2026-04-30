import { MiniGameType } from './types';
import mixedMasteryBackground from './assets/maps/backgroundsforgames/Mixed Mastery.jpg';

export interface GameSceneMeta {
  background?: string;
  glow: string;
  tint: string;
  panelTint: string;
}

const ENGLISH_SCENE: GameSceneMeta = {
  glow: 'from-sky-300/22 via-indigo-300/12 to-transparent',
  tint: 'from-sky-300/14 via-blue-300/10 to-slate-950/92',
  panelTint: 'from-cyan-200/16 via-sky-300/10 to-transparent',
};

const withBackground = (scene: GameSceneMeta, background: string): GameSceneMeta => ({
  ...scene,
  background,
});

export const GAME_SCENE_META: Partial<Record<MiniGameType, GameSceneMeta>> = {
  WORD_WARDEN: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  TENSE_TOWER: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  CLAUSE_KEEP: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  CONJUNCTION_CROSSING: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  GRAMMAR_GUARD: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  COMMA_CANNON: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  APOSTROPHE_OUTLAWS: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  PUNCTUATION_PATROL: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  STRONGHOLD_SPRINT: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  PREFIX_PATROL: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  FORGE_OF_SUFFIXES: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  HALL_OF_ECHOES: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  SPELLING_FORGE: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  PATTERN_TRIALS: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  WORD_MORPH: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  HOMOPHONE_HUNT: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  SUFFIX_SIEGE: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  SENTENCE_SMITH: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  SENTENCE_SHIFT: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  BLADE_REFINER: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  POWER_INFUSION: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  FORGE_REPAIR: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  PARAGRAPH_PATCH: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  CONNECTIVE_CRAFTER: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  WORD_SENSE: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  TWIN_WORDS_TRIAL: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  ANTONYM_AMBUSH: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  TONE_TRADER: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  MEANING_MATCH: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  WORD_WIZARD: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  MEANING_MINES: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  SYNONYM_SIEGE: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  EVIDENCE_HIGHLIGHT: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  RETRIEVAL_RAPIDS: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  INFERENCE_ISLE: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  EVIDENCE_EXPLORER: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  SEQUENCE_STREAM: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  AUTHOR_INTENT: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  SUMMARY_SELECT: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  EVIDENCE_CHAIN: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  PASSAGE_QUEST: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  INFERENCE_INVADERS: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  RETRIEVAL_RAID: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  LOGIC_LADDER: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  TWIN_TICK_TRIAL: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  RULE_BREAKER: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  BEST_ANSWER_QUEST: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  EDITORS_TRIAL: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  MIXED_MASTERY: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  LEGENDS_CHALLENGE: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  READING_RESCUE: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  GRAMMAR_GAUNTLET: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  WORDSMITH_TRIALS: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
  SCHOLARS_SUMMIT: withBackground(ENGLISH_SCENE, mixedMasteryBackground),
};

