
export type MiniGameType =
  // SATs Legends mini-games (English strand)
  | 'WORD_WARDEN'
  | 'TENSE_TOWER'
  | 'CLAUSE_KEEP'
  | 'CONJUNCTION_CROSSING'
  | 'GRAMMAR_GUARD'
  | 'COMMA_CANNON'
  | 'APOSTROPHE_OUTLAWS'
  | 'PUNCTUATION_PATROL'
  | 'STRONGHOLD_SPRINT'
  | 'PREFIX_PATROL'
  | 'FORGE_OF_SUFFIXES'
  | 'HALL_OF_ECHOES'
  | 'SPELLING_FORGE'
  | 'PATTERN_TRIALS'
  | 'WORD_MORPH'
  | 'HOMOPHONE_HUNT'
  | 'SUFFIX_SIEGE'
  | 'SENTENCE_SMITH'
  | 'SENTENCE_SHIFT'
  | 'BLADE_REFINER'
  | 'POWER_INFUSION'
  | 'FORGE_REPAIR'
  | 'PARAGRAPH_PATCH'
  | 'CONNECTIVE_CRAFTER'
  | 'WORD_SENSE'
  | 'TWIN_WORDS_TRIAL'
  | 'ANTONYM_AMBUSH'
  | 'TONE_TRADER'
  | 'MEANING_MATCH'
  | 'WORD_WIZARD'
  | 'MEANING_MINES'
  | 'SYNONYM_SIEGE'
  | 'EVIDENCE_HIGHLIGHT'
  | 'RETRIEVAL_RAPIDS'
  | 'INFERENCE_ISLE'
  | 'TEXT_DETECTIVE'
  | 'EVIDENCE_EXPLORER'
  | 'SEQUENCE_STREAM'
  | 'AUTHOR_INTENT'
  | 'SUMMARY_SELECT'
  | 'EVIDENCE_CHAIN'
  | 'PASSAGE_QUEST'
  | 'INFERENCE_INVADERS'
  | 'RETRIEVAL_RAID'
  | 'LOGIC_LADDER'
  | 'TWIN_TICK_TRIAL'
  | 'RULE_BREAKER'
  | 'BEST_ANSWER_QUEST'
  | 'EDITORS_TRIAL'
  | 'MIXED_MASTERY'
  | 'LEGENDS_CHALLENGE'
  | 'READING_RESCUE'
  | 'GRAMMAR_GAUNTLET'
  | 'WORDSMITH_TRIALS'
  | 'SCHOLARS_SUMMIT';

export interface LevelData {
  id: number;
  stars: number;
  isLocked: boolean;
  isPractice?: boolean;
  // Stable content-planning key for curriculum and design mapping.
  blueprintKey?: string;
  // Optional display override for island-specific mini-game naming.
  displayName?: string;
  // Optional campaign lane metadata for multi-level mini-game packs.
  miniGameKey?: string;
  miniGameLevel?: number;
  difficultyTier?: 1 | 2 | 3 | 4 | 5;
  skillTags?: string[];
  isBoss?: boolean;
  bossUnlockCoins?: number;
  gameType?: MiniGameType;
}

export interface IslandData {
  id: number;
  name: string;
  category: string;
  isLocked: boolean;
  levels: LevelData[];
  color: string;
  themeName?: string;
  backgroundLabel?: string;
  bgGradient?: string;
  groundColor?: string;
  mapImage?: string;
  decorations?: string[];
}

export interface AvatarData {
  id: string;
  name: string;
  image: string;
  portrait?: string;
  color: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  level: number;
  imagePrompt?: string;
  sprite?: {
    row: number;
    colStart: number;
    frames: number;
  };
  poses?: Partial<Record<AnimationState, string[]>>;
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'costume' | 'hat' | 'accessory' | 'effect';
  price: number;
  currency: 'coins' | 'gems';
  isLocked: boolean;
  levelRequired?: number;
}

export type ShopCategory = 'outfit' | 'hat' | 'accessory' | 'handheld' | 'trail' | 'skin';
export type ShopUnlockType = 'currency' | 'event' | 'starter';
export type ShopRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface CosmeticShopItem {
  itemId: string;
  name: string;
  category: ShopCategory;
  price: number;
  rarity?: ShopRarity;
  iconKey?: string;
  unlockType: ShopUnlockType;
  characterCompatibility?: string[];
}

export interface PlayerShopState {
  ownedItemIds: string[];
  equippedByCategory: Record<ShopCategory, string | null>;
}

export interface TopicStat {
  topicId: string;
  attempts: number;
  completions: number;
  accuracy: number;
  avgTimeSec: number;
  lastPlayed: number | null;
}

export interface GameStat {
  gameId: string;
  attempts: number;
  correct: number;
  incorrect: number;
  sessions: number;
  completions: number;
  accuracy: number;
  avgScore: number;
  totalTimeSec: number;
  avgTimeSec: number;
  lastPlayed: number | null;
}

export interface PlayerTelemetry {
  sessionsPlayed: number;
  totalPlayTimeSec: number;
  correctAnswers: number;
  incorrectAnswers: number;
  currentCorrectStreak: number;
  bestCorrectStreak: number;
  topicStats: Record<string, TopicStat>;
  gameStats: Record<string, GameStat>;
}

export interface PlayerAchievementState {
  earned: string[];
  progress: Record<string, number>;
  claimed: string[];
  updatedAt?: number;
}

export interface ParentReportSummary {
  favoriteGame: ParentGameSummary | null;
  leastPlayedGame: ParentGameSummary | null;
  fastestGame: ParentGameSummary | null;
  slowestGame: ParentGameSummary | null;
  overallAccuracy: number;
  averageSessionTimeSec: number;
  needsPractice: string[];
  mostPlayed: string[];
  nextFocus: string[];
  excelling: string[];
  updatedAt: number;
}

export interface ParentGameSummary {
  gameId: string;
  label: string;
  sessions: number;
  accuracy: number;
  avgTimeSec: number;
  totalTimeSec: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'stars' | 'streak' | 'levels' | 'coins';
  target: number;
}

export interface DailyQuest {
  id: string;
  description: string;
  target: number;
  current: number;
  reward: { type: 'coins' | 'gems' | 'xp', amount: number };
  isClaimed: boolean;
}

export interface PlayerData {
  playerName: string;
  avatarId: string;
  level: number;
  xp: number;
  coins: number;
  gems: number;
  unlockedIslands: number[];
  completedLevels: Record<number, number[]>; // islandId -> levelIds
  levelStars: Record<string, number>; // islandId-levelId -> best stars
  dailyQuests: DailyQuest[];
  customSpriteUrl?: string;
  achievements: string[];
  calmTokens?: number;
  shopState?: PlayerShopState;
  telemetry?: PlayerTelemetry;
  achievementState?: PlayerAchievementState;
  reportCache?: ParentReportSummary;
  stats: {
    totalStars: number;
    totalGamesPlayed: number;
    totalCoinsEarned: number;
  };
}

export type AnimationState =
  | 'idle'
  | 'walk'
  | 'jump'
  | 'attack'
  | 'hit'
  | 'victory'
  | 'sad'
  | 'special'
  | 'sitting'
  | 'waving'
  | 'casting'
  | 'sleeping'
  | 'thinking';

export type GameScreen =
  | 'splash'
  | 'profile_setup'
  | 'avatar_selection'
  | 'world_map'
  | 'island_levels'
  | 'gameplay'
  | 'wellbeing_hub'
  | 'wellbeing_activity'
  | 'level_result'
  | 'shop'
  | 'achievements_tracker'
  | 'profile'
  | 'settings'
  | 'parent_dashboard';

// SATs Legends specific types
export type MathType = 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION' | 'FRACTIONS' | 'DECIMALS';
export type PowerUpType = 'ROW_CLEAR' | 'COLUMN_CLEAR' | 'BOMB';

export interface TileData {
  id: string;
  value: number;
  display: string;
  mathType: MathType;
  familyId: string;
  powerUp?: PowerUpType;
  isMatched: boolean;
  x: number;
  y: number;
}

export type Grid = (TileData | null)[][];

export interface CloudCollapseLevelConfig {
  id: number;
  targetScore: number;
  duration: number;
  gridSize: number;
  mathTypes: MathType[];
}

export interface PotionPanicLevelConfig {
  id: number;
  targetScore: number;
  duration: number;
  mathTypes: MathType[];
}

export interface MathFamily {
  id: string;
  targetValue: number;
  expressions: { display: string; type: MathType }[];
}
