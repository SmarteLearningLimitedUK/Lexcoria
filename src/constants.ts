import { AvatarData, IslandData, LevelData, ShopItem, DailyQuest, MathFamily, CloudCollapseLevelConfig, PotionPanicLevelConfig, Achievement } from "./types";
import { CHARACTER_AVATARS } from './assets/characters';
import world01Map from './assets/maps/forect.jpg';
import world02Map from './assets/maps/reef2.jpg';
import world03Map from './assets/maps/backgroundsforgames/castle.jpg';
import world04Map from './assets/maps/harbour.jpg';
import world05Map from './assets/maps/finalamendedworldmap.png';
import world06Map from './assets/maps/finalmap.png';

const mergeIslandLevels = (...groups: LevelData[][]): LevelData[] => {
  const flattened = groups.flat().map((level, index) => ({
    ...level,
    id: index + 1,
  }));

  const seen = new Set<string>();
  return flattened.map((level) => {
    const practiceKey = level.blueprintKey || `${level.gameType || 'level'}-${level.id}`;
    const isPractice = !seen.has(practiceKey);
    seen.add(practiceKey);
    return {
      ...level,
      isPractice: level.isPractice ?? isPractice,
    };
  });
};


export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_win', title: 'First Victory', description: 'Complete your first level', icon: '\u{1F3C6}', type: 'levels', target: 1 },
  { id: 'star_collector', title: 'Star Collector', description: 'Earn 10 total stars', icon: '\u2B50', type: 'stars', target: 10 },
  { id: 'rich', title: 'Money Maker', description: 'Accumulate 1000 coins', icon: '\u{1F4B0}', type: 'coins', target: 1000 },
  { id: 'math_master', title: 'Math Master', description: 'Complete 10 levels', icon: '\u{1F9E0}', type: 'levels', target: 10 },
  { id: 'star_champion', title: 'Star Champion', description: 'Earn 50 total stars', icon: '\u{1F31F}', type: 'stars', target: 50 },
  { id: 'gem_hoarder', title: 'Gem Hoarder', description: 'Accumulate 100 gems', icon: '\u{1F48E}', type: 'coins', target: 100 },
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
    name: 'Grammar Grove',
    category: 'Grammar',
    isLocked: false,
    color: 'bg-[#7ED321]',
    themeName: 'Grammar Grove',
    bgGradient: 'from-emerald-900 to-slate-950',
    groundColor: 'bg-emerald-950',
    mapImage: world01Map,
    decorations: [],
    levels: mergeIslandLevels([
      { id: 1, stars: 0, isLocked: false, blueprintKey: 'word_warden', displayName: 'Word Warden', gameType: 'WORD_WARDEN' },
      { id: 2, stars: 0, isLocked: false, blueprintKey: 'tense_tower', displayName: 'Tense Tower', gameType: 'TENSE_TOWER' },
      { id: 3, stars: 0, isLocked: false, blueprintKey: 'clause_keep', displayName: 'Clause Keep', gameType: 'CLAUSE_KEEP' },
      { id: 4, stars: 0, isLocked: false, blueprintKey: 'conjunction_crossing', displayName: 'Conjunction Crossing', gameType: 'CONJUNCTION_CROSSING' },
      { id: 5, stars: 0, isLocked: false, blueprintKey: 'grammar_guard', displayName: 'Grammar Guard', gameType: 'GRAMMAR_GUARD' },
    ]),
  },
  {
    id: 2,
    name: 'Punctuation Peaks',
    category: 'Punctuation',
    isLocked: false,
    color: 'bg-[#2CC7D9]',
    themeName: 'Punctuation Peaks',
    bgGradient: 'from-sky-900 to-slate-950',
    groundColor: 'bg-sky-950',
    mapImage: world02Map,
    decorations: [],
    levels: mergeIslandLevels([
      { id: 1, stars: 0, isLocked: false, blueprintKey: 'comma_cannon', displayName: 'Comma Cannon', gameType: 'COMMA_CANNON' },
      { id: 2, stars: 0, isLocked: false, blueprintKey: 'apostrophe_outlaws', displayName: 'Apostrophe Outlaws', gameType: 'APOSTROPHE_OUTLAWS' },
      { id: 3, stars: 0, isLocked: false, blueprintKey: 'punctuation_patrol', displayName: 'Punctuation Patrol', gameType: 'PUNCTUATION_PATROL' },
    ]),
  },
  {
    id: 3,
    name: 'Spelling Stronghold',
    category: 'Spelling',
    isLocked: false,
    color: 'bg-[#F5A623]',
    themeName: 'Spelling Stronghold',
    bgGradient: 'from-amber-900 to-slate-950',
    groundColor: 'bg-amber-950',
    mapImage: world03Map,
    decorations: [],
    levels: mergeIslandLevels([
      { id: 1, stars: 0, isLocked: false, blueprintKey: 'stronghold_sprint', displayName: 'Stronghold Sprint', gameType: 'STRONGHOLD_SPRINT' },
      { id: 2, stars: 0, isLocked: false, blueprintKey: 'prefix_patrol', displayName: 'Prefix Patrol', gameType: 'PREFIX_PATROL' },
      { id: 3, stars: 0, isLocked: false, blueprintKey: 'forge_of_suffixes', displayName: 'Forge of Suffixes', gameType: 'FORGE_OF_SUFFIXES' },
      { id: 4, stars: 0, isLocked: false, blueprintKey: 'hall_of_echoes', displayName: 'Hall of Echoes', gameType: 'HALL_OF_ECHOES' },
      { id: 5, stars: 0, isLocked: false, blueprintKey: 'spelling_forge', displayName: 'Spelling Forge', gameType: 'SPELLING_FORGE' },
      { id: 6, stars: 0, isLocked: false, blueprintKey: 'pattern_trials', displayName: 'Pattern Trials', gameType: 'PATTERN_TRIALS' },
      { id: 7, stars: 0, isLocked: false, blueprintKey: 'word_morph', displayName: 'Word Morph', gameType: 'WORD_MORPH' },
    ]),
  },
  {
    id: 4,
    name: 'Sentence Smithy',
    category: 'Writing',
    isLocked: false,
    color: 'bg-[#8F76FF]',
    themeName: 'Sentence Smithy',
    bgGradient: 'from-indigo-900 to-slate-950',
    groundColor: 'bg-indigo-950',
    mapImage: world04Map,
    decorations: [],
    levels: mergeIslandLevels([
      { id: 1, stars: 0, isLocked: false, blueprintKey: 'sentence_smith', displayName: 'Sentence Smith', gameType: 'SENTENCE_SMITH' },
      { id: 2, stars: 0, isLocked: false, blueprintKey: 'sentence_shift', displayName: 'Sentence Shift', gameType: 'SENTENCE_SHIFT' },
      { id: 3, stars: 0, isLocked: false, blueprintKey: 'blade_refiner', displayName: 'Blade Refiner', gameType: 'BLADE_REFINER' },
      { id: 4, stars: 0, isLocked: false, blueprintKey: 'power_infusion', displayName: 'Power Infusion', gameType: 'POWER_INFUSION' },
      { id: 5, stars: 0, isLocked: false, blueprintKey: 'forge_repair', displayName: 'Forge Repair', gameType: 'FORGE_REPAIR' },
    ]),
  },
  {
    id: 5,
    name: 'Vocabulary Vale',
    category: 'Vocabulary',
    isLocked: false,
    color: 'bg-[#FF4D8D]',
    themeName: 'Vocabulary Vale',
    bgGradient: 'from-fuchsia-900 to-slate-950',
    groundColor: 'bg-fuchsia-950',
    mapImage: world05Map,
    decorations: [],
    levels: mergeIslandLevels([
      { id: 1, stars: 0, isLocked: false, blueprintKey: 'word_sense', displayName: 'Word Sense', gameType: 'WORD_SENSE' },
      { id: 2, stars: 0, isLocked: false, blueprintKey: 'twin_words_trial', displayName: 'Twin Words Trial', gameType: 'TWIN_WORDS_TRIAL' },
      { id: 3, stars: 0, isLocked: false, blueprintKey: 'antonym_ambush', displayName: 'Antonym Ambush', gameType: 'ANTONYM_AMBUSH' },
      { id: 4, stars: 0, isLocked: false, blueprintKey: 'tone_trader', displayName: 'Tone Trader', gameType: 'TONE_TRADER' },
      { id: 5, stars: 0, isLocked: false, blueprintKey: 'meaning_match', displayName: 'Meaning Match', gameType: 'MEANING_MATCH' },
    ]),
  },
  {
    id: 6,
    name: 'Comprehension Cove',
    category: 'Reading',
    isLocked: false,
    color: 'bg-[#2C2A4A]',
    themeName: 'Comprehension Cove',
    bgGradient: 'from-slate-900 to-slate-950',
    groundColor: 'bg-slate-950',
    mapImage: world06Map,
    decorations: [],
    levels: mergeIslandLevels([
      { id: 1, stars: 0, isLocked: false, blueprintKey: 'retrieval_rapids', displayName: 'Retrieval Rapids', gameType: 'RETRIEVAL_RAPIDS' },
      { id: 2, stars: 0, isLocked: false, blueprintKey: 'inference_isle', displayName: 'Inference Isle', gameType: 'INFERENCE_ISLE' },
      { id: 3, stars: 0, isLocked: false, blueprintKey: 'evidence_explorer', displayName: 'Evidence Explorer', gameType: 'EVIDENCE_EXPLORER' },
      { id: 4, stars: 0, isLocked: false, blueprintKey: 'sequence_stream', displayName: 'Sequence Stream', gameType: 'SEQUENCE_STREAM' },
      { id: 5, stars: 0, isLocked: false, blueprintKey: 'author_intent', displayName: 'Author Intent', gameType: 'AUTHOR_INTENT' },
      { id: 6, stars: 0, isLocked: false, blueprintKey: 'summary_select', displayName: 'Summary Select', gameType: 'SUMMARY_SELECT' },
      { id: 7, stars: 0, isLocked: false, blueprintKey: 'evidence_chain', displayName: 'Evidence Chain', gameType: 'EVIDENCE_CHAIN' },
      { id: 8, stars: 0, isLocked: false, blueprintKey: 'passage_quest', displayName: 'Passage Quest', gameType: 'PASSAGE_QUEST' },
      { id: 9, stars: 0, isLocked: false, blueprintKey: 'evidence_highlight', displayName: 'Evidence Highlight', gameType: 'EVIDENCE_HIGHLIGHT' },
    ]),
  },
  {
    id: 7,
    name: 'Logic Lighthouse',
    category: 'Logic',
    isLocked: false,
    color: 'bg-[#34D399]',
    themeName: 'Logic Lighthouse',
    bgGradient: 'from-teal-900 to-slate-950',
    groundColor: 'bg-teal-950',
    mapImage: world02Map,
    decorations: [],
    levels: mergeIslandLevels([
      { id: 1, stars: 0, isLocked: false, blueprintKey: 'twin_tick_trial', displayName: 'Twin Tick Trial', gameType: 'TWIN_TICK_TRIAL' },
      { id: 2, stars: 0, isLocked: false, blueprintKey: 'rule_breaker', displayName: 'Rule Breaker', gameType: 'RULE_BREAKER' },
      { id: 3, stars: 0, isLocked: false, blueprintKey: 'best_answer_quest', displayName: 'Best Answer Quest', gameType: 'BEST_ANSWER_QUEST' },
    ]),
  },
  {
    id: 8,
    name: "Scholar's Summit",
    category: 'Final',
    isLocked: false,
    color: 'bg-[#F59E0B]',
    themeName: "Scholar's Summit",
    bgGradient: 'from-amber-900 to-slate-950',
    groundColor: 'bg-amber-950',
    mapImage: world03Map,
    decorations: [],
    levels: mergeIslandLevels([
      { id: 1, stars: 0, isLocked: false, blueprintKey: 'mixed_mastery', displayName: 'Mixed Mastery', gameType: 'MIXED_MASTERY' },
      { id: 2, stars: 0, isLocked: false, blueprintKey: 'legends_challenge', displayName: 'Legends Challenge', gameType: 'LEGENDS_CHALLENGE' },
      { id: 3, stars: 0, isLocked: false, blueprintKey: 'reading_rescue', displayName: 'Reading Rescue', gameType: 'READING_RESCUE' },
      { id: 4, stars: 0, isLocked: false, blueprintKey: 'grammar_gauntlet', displayName: 'Grammar Gauntlet', gameType: 'GRAMMAR_GAUNTLET' },
      { id: 5, stars: 0, isLocked: false, blueprintKey: 'wordsmith_trials', displayName: 'Wordsmith Trials', gameType: 'WORDSMITH_TRIALS' },
    ]),
  },
];

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'hat_1', name: 'Wizard Hat', type: 'hat', price: 100, currency: 'coins', isLocked: false },
  { id: 'costume_1', name: 'Hero Cape', type: 'costume', price: 50, currency: 'gems', isLocked: false },
  { id: 'acc_1', name: 'Magic Wand', type: 'accessory', price: 250, currency: 'coins', isLocked: true, levelRequired: 5 },
  { id: 'effect_1', name: 'Sparkle Trail', type: 'effect', price: 100, currency: 'gems', isLocked: true, levelRequired: 10 },
];

// SATs Legends specific constants
export const CLOUD_COLLAPSE_LEVELS: CloudCollapseLevelConfig[] = [
  { id: 1, targetScore: 300, duration: 60, gridSize: 5, mathTypes: ['FRACTIONS'] },
  { id: 2, targetScore: 600, duration: 75, gridSize: 5, mathTypes: ['DECIMALS'] },
  { id: 3, targetScore: 1000, duration: 90, gridSize: 6, mathTypes: ['FRACTIONS', 'DECIMALS'] },
  { id: 4, targetScore: 1200, duration: 90, gridSize: 6, mathTypes: ['ADDITION', 'FRACTIONS'] },
  { id: 5, targetScore: 1500, duration: 100, gridSize: 6, mathTypes: ['DECIMALS', 'SUBTRACTION'] },
  { id: 6, targetScore: 1800, duration: 120, gridSize: 7, mathTypes: ['FRACTIONS', 'DECIMALS', 'ADDITION'] },
  { id: 7, targetScore: 2200, duration: 120, gridSize: 7, mathTypes: ['MULTIPLICATION', 'FRACTIONS'] },
  { id: 8, targetScore: 2500, duration: 150, gridSize: 8, mathTypes: ['FRACTIONS', 'DECIMALS', 'DIVISION'] },
  { id: 9, targetScore: 3000, duration: 180, gridSize: 8, mathTypes: ['ADDITION', 'SUBTRACTION', 'FRACTIONS', 'DECIMALS'] },
  { id: 10, targetScore: 5000, duration: 200, gridSize: 9, mathTypes: ['ADDITION', 'SUBTRACTION', 'MULTIPLICATION', 'DIVISION', 'FRACTIONS', 'DECIMALS'] },
];

export const POTION_PANIC_LEVELS: PotionPanicLevelConfig[] = [
  { id: 1, targetScore: 500, duration: 60, mathTypes: ['FRACTIONS'] },
  { id: 2, targetScore: 800, duration: 75, mathTypes: ['DECIMALS'] },
  { id: 3, targetScore: 1200, duration: 90, mathTypes: ['FRACTIONS', 'DECIMALS'] },
  { id: 4, targetScore: 1500, duration: 90, mathTypes: ['ADDITION', 'FRACTIONS'] },
  { id: 5, targetScore: 2000, duration: 100, mathTypes: ['DECIMALS', 'SUBTRACTION'] },
];

export const MATH_FAMILIES: MathFamily[] = [
  {
    id: 'half',
    targetValue: 0.5,
    expressions: [
      { display: '1/2', type: 'FRACTIONS' },
      { display: '2/4', type: 'FRACTIONS' },
      { display: '0.5', type: 'DECIMALS' },
      { display: '50%', type: 'FRACTIONS' },
      { display: '4/8', type: 'FRACTIONS' },
    ]
  },
  {
    id: 'quarter',
    targetValue: 0.25,
    expressions: [
      { display: '1/4', type: 'FRACTIONS' },
      { display: '0.25', type: 'DECIMALS' },
      { display: '25%', type: 'FRACTIONS' },
      { display: '2/8', type: 'FRACTIONS' },
    ]
  },
  {
    id: 'three-quarters',
    targetValue: 0.75,
    expressions: [
      { display: '3/4', type: 'FRACTIONS' },
      { display: '0.75', type: 'DECIMALS' },
      { display: '75%', type: 'FRACTIONS' },
      { display: '6/8', type: 'FRACTIONS' },
    ]
  },
  {
    id: 'one-fifth',
    targetValue: 0.2,
    expressions: [
      { display: '1/5', type: 'FRACTIONS' },
      { display: '0.2', type: 'DECIMALS' },
      { display: '20%', type: 'FRACTIONS' },
      { display: '2/10', type: 'FRACTIONS' },
    ]
  },
  {
    id: 'ten',
    targetValue: 10,
    expressions: [
      { display: '5+5', type: 'ADDITION' },
      { display: '12-2', type: 'SUBTRACTION' },
      { display: '2x5', type: 'MULTIPLICATION' },
      { display: '20/2', type: 'DIVISION' },
      { display: '10', type: 'ADDITION' },
    ]
  },
  {
    id: 'twelve',
    targetValue: 12,
    expressions: [
      { display: '6+6', type: 'ADDITION' },
      { display: '15-3', type: 'SUBTRACTION' },
      { display: '3x4', type: 'MULTIPLICATION' },
      { display: '24/2', type: 'DIVISION' },
      { display: '12', type: 'ADDITION' },
    ]
  },
  {
    id: 'twenty',
    targetValue: 20,
    expressions: [
      { display: '10+10', type: 'ADDITION' },
      { display: '25-5', type: 'SUBTRACTION' },
      { display: '4x5', type: 'MULTIPLICATION' },
      { display: '40/2', type: 'DIVISION' },
      { display: '20', type: 'ADDITION' },
    ]
  },
  {
    id: 'one',
    targetValue: 1,
    expressions: [
      { display: '1/1', type: 'FRACTIONS' },
      { display: '1.0', type: 'DECIMALS' },
      { display: '100%', type: 'FRACTIONS' },
      { display: '0.5+0.5', type: 'ADDITION' },
      { display: '2-1', type: 'SUBTRACTION' },
    ]
  }
];



