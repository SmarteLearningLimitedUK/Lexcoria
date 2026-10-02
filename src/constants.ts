import {
  AvatarData,
  IslandData,
  LevelData,
  ShopItem,
  DailyQuest,
  MathFamily,
  CloudCollapseLevelConfig,
  PotionPanicLevelConfig,
  Achievement,
} from './types';
import { CHARACTER_AVATARS } from './assets/characters';
import world01Map from './assets/maps/forect.jpg';
import world02Map from './assets/maps/reef2.jpg';
import world03Map from './assets/maps/backgroundsforgames/castle.jpg';

const mergeIslandLevels = (...groups: LevelData[][]): LevelData[] => {
  const flattened = groups.flat().map((level, index) => ({
    ...level,
    id: index + 1,
  }));

  return flattened.map((level) => ({ ...level, isPractice: level.isPractice ?? false }));
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_win', title: 'First Victory', description: 'Complete your first level', icon: '\u{1F3C6}', type: 'levels', target: 1 },
  { id: 'star_collector', title: 'Star Collector', description: 'Earn 10 total stars', icon: '\u2B50', type: 'stars', target: 10 },
  { id: 'rich', title: 'Money Maker', description: 'Accumulate 1000 coins', icon: '\u{1F4B0}', type: 'coins', target: 1000 },
];

export const INITIAL_DAILY_QUESTS: DailyQuest[] = [
  { id: 'q1', description: 'Complete 2 levels', target: 2, current: 0, reward: { type: 'coins', amount: 150 }, isClaimed: false },
  { id: 'q2', description: 'Earn 3 stars in a level', target: 1, current: 0, reward: { type: 'xp', amount: 50 }, isClaimed: false },
  { id: 'q3', description: 'Visit the shop', target: 1, current: 0, reward: { type: 'gems', amount: 2 }, isClaimed: false },
];

export const AVATARS: AvatarData[] = CHARACTER_AVATARS;

export const ISLANDS: IslandData[] = [
  {
    id: 1,
    name: 'GPS Grounds',
    category: 'GPS',
    isLocked: false,
    color: 'bg-[#2CC7D9]',
    themeName: 'GPS Grounds',
    bgGradient: 'from-sky-900 to-slate-950',
    groundColor: 'bg-sky-950',
    mapImage: world02Map,
    decorations: [],
    levels: mergeIslandLevels([
      { id: 1, stars: 0, isLocked: false, blueprintKey: 'grammar_gauntlet', displayName: 'Grammar Gauntlet', gameType: 'GRAMMAR_GAUNTLET' },
      { id: 2, stars: 0, isLocked: false, blueprintKey: 'tense_trials', displayName: 'Tense Trials', gameType: 'TENSE_TOWER' },
      { id: 3, stars: 0, isLocked: false, blueprintKey: 'punctuation_panic', displayName: 'Punctuation Panic', gameType: 'PUNCTUATION_PATROL' },
      { id: 4, stars: 0, isLocked: false, blueprintKey: 'sentence_surgery', displayName: 'Sentence Surgery', gameType: 'SENTENCE_SMITH' },
    ]),
  },
  {
    id: 2,
    name: 'Reading Realm',
    category: 'Reading',
    isLocked: false,
    color: 'bg-[#7ED321]',
    themeName: 'Reading Realm',
    bgGradient: 'from-emerald-900 to-slate-950',
    groundColor: 'bg-emerald-950',
    mapImage: world01Map,
    decorations: [],
    levels: mergeIslandLevels([
      { id: 1, stars: 0, isLocked: false, blueprintKey: 'inference_island', displayName: 'Inference Island', gameType: 'INFERENCE_ISLE' },
      { id: 2, stars: 0, isLocked: false, blueprintKey: 'evidence_hunter', displayName: 'Evidence Hunter', gameType: 'EVIDENCE_HIGHLIGHT' },
      { id: 3, stars: 0, isLocked: false, blueprintKey: 'word_meaning_woods', displayName: 'Word Meaning Woods', gameType: 'WORD_SENSE' },
      { id: 4, stars: 0, isLocked: false, blueprintKey: 'summit_summariser', displayName: 'Summit Summariser', gameType: 'SUMMARY_SELECT' },
      { id: 5, stars: 0, isLocked: false, blueprintKey: 'author_intent_arena', displayName: "Author’s Intent Arena", gameType: 'AUTHOR_INTENT' },
      { id: 6, stars: 0, isLocked: false, blueprintKey: 'text_detective', displayName: 'Text Detective', gameType: 'TEXT_DETECTIVE' },
      { id: 7, stars: 0, isLocked: false, blueprintKey: 'story_sequencer', displayName: 'Story Sequencer', gameType: 'STORY_SEQUENCER' },
      { id: 8, stars: 0, isLocked: false, blueprintKey: 'fact_or_fiction_forge', displayName: 'Fact or Fiction Forge', gameType: 'FACT_OR_FICTION_FORGE' },
      { id: 9, stars: 0, isLocked: false, blueprintKey: 'compare_contrast_canyon', displayName: 'Compare & Contrast Canyon', gameType: 'COMPARE_CONTRAST_CANYON' },
    ]),
  },
  {
    id: 3,
    name: 'GPS Stronghold',
    category: 'GPS',
    isLocked: false,
    color: 'bg-[#5C7CFA]',
    themeName: 'GPS Stronghold',
    bgGradient: 'from-indigo-900 to-slate-950',
    groundColor: 'bg-indigo-950',
    mapImage: world02Map,
    decorations: [],
    levels: mergeIslandLevels([
      { id: 1, stars: 0, isLocked: false, blueprintKey: 'clause_crusher', displayName: 'Clause Crusher', gameType: 'CLAUSE_KEEP' },
      { id: 2, stars: 0, isLocked: false, blueprintKey: 'word_class_wars', displayName: 'Word Class Wars', gameType: 'WORD_WARDEN' },
      { id: 3, stars: 0, isLocked: false, blueprintKey: 'spellbound_forge', displayName: 'Spellbound Forge', gameType: 'SPELLING_FORGE' },
      { id: 4, stars: 0, isLocked: false, blueprintKey: 'noun_phrase_builder', displayName: 'Noun Phrase Builder', gameType: 'NOUN_PHRASE_BUILDER' },
      { id: 5, stars: 0, isLocked: false, blueprintKey: 'voice_switch_vault', displayName: 'Voice Switch Vault', gameType: 'VOICE_SWITCH_VAULT' },
      { id: 6, stars: 0, isLocked: false, blueprintKey: 'formal_fixer', displayName: 'Formal Fixer', gameType: 'FORMAL_FIXER' },
      { id: 7, stars: 0, isLocked: false, blueprintKey: 'cohesion_connector', displayName: 'Cohesion Connector', gameType: 'COHESION_CONNECTOR' },
      { id: 8, stars: 0, isLocked: false, blueprintKey: 'punctuation_mastery', displayName: 'Punctuation Mastery', gameType: 'PUNCTUATION_MASTERY' },
    ]),
  },
  {
    id: 4,
    name: 'Practice SATs Papers',
    category: 'Boss',
    isLocked: false,
    color: 'bg-[#F5A623]',
    themeName: 'Practice SATs Papers',
    bgGradient: 'from-amber-900 to-slate-950',
    groundColor: 'bg-amber-950',
    mapImage: world03Map,
    decorations: [],
    levels: mergeIslandLevels([
      { id: 1, stars: 0, isLocked: false, blueprintKey: 'trial_of_reading', displayName: 'Trial of Reading', gameType: 'READING_RESCUE', isBoss: true },
      { id: 2, stars: 0, isLocked: false, blueprintKey: 'trial_of_gps', displayName: 'Trial of GPS', gameType: 'WORDSMITH_TRIALS', isBoss: true },
    ]),
  },
];

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'hat_1', name: 'Wizard Hat', type: 'hat', price: 100, currency: 'coins', isLocked: false },
  { id: 'costume_1', name: 'Hero Cape', type: 'costume', price: 50, currency: 'gems', isLocked: false },
];

// Legacy maths-mode exports kept for build compatibility; no maths levels reference them.
export const CLOUD_COLLAPSE_LEVELS: CloudCollapseLevelConfig[] = [];
export const POTION_PANIC_LEVELS: PotionPanicLevelConfig[] = [];
export const MATH_FAMILIES: MathFamily[] = [];
