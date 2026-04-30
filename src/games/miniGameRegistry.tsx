import React, { lazy } from 'react';
const AngleArenaGame = lazy(() => import('./AngleArenaGame'));
const AreaArchitectGame = lazy(() => import('./AreaArchitectGame'));
const BossEncounterGame = lazy(() => import('./BossEncounterGame'));
const CalculationCrashGame = lazy(() => import('./CalculationCrashGame'));
const CloudCollapseGame = lazy(() => import('./CloudCollapseGame'));
const ChangeCounterGame = lazy(() => import('./ChangeCounterGame'));
const CoordinatesQuestGame = lazy(() => import('./CoordinatesQuestGame'));
const CurriculumChallengeGame = lazy(() => import('./CurriculumChallengeGame'));
const DataDungeonGame = lazy(() => import('./DataDungeonGame'));
const DataDetectiveGame = lazy(() => import('./DataDetectiveGame'));
const DecimalSniperGame = lazy(() => import('./DecimalSniperGame'));
const FactorFrenzyGame = lazy(() => import('./FactorFrenzyGame'));
const FormulaForgeGame = lazy(() => import('./FormulaForgeGame'));
const FractionForgeGame = lazy(() => import('./FractionForgeGame'));
const FractionMatchGame = lazy(() => import('./FractionMatchGame'));
const LineGraphLabGame = lazy(() => import('./LineGraphLabGame'));
const MathsVsZombiesGame = lazy(() => import('./MathsVsZombiesGame'));
const MeanMachineGame = lazy(() => import('./MeanMachineGame'));
const MedianMountainGame = lazy(() => import('./MedianMountainGame'));
const ConversionCanyonGame = lazy(() => import('./ConversionCanyonGame'));
const MultiplicationMineGame = lazy(() => import('./MultiplicationMineGame'));
const MonsterMarketGame = lazy(() => import('./MonsterMarketGame'));
const NumberLineNinjaGame = lazy(() => import('./NumberLineNinjaGame'));
const OrderOpsArenaGame = lazy(() => import('./OrderOpsArenaGame'));
const PerimeterPathGame = lazy(() => import('./PerimeterPathGame'));
const PercentPowerGame = lazy(() => import('./PercentPowerGame'));
const PlaceValuePanicGame = lazy(() => import('./PlaceValuePanicGame'));
const PolygonPalaceGame = lazy(() => import('./PolygonPalaceGame'));
const ProblemPyramidGame = lazy(() => import('./ProblemPyramidGame'));
const PotionPanicGame = lazy(() => import('./PotionPanicGame'));
const PrimePopGame = lazy(() => import('./PrimePopGame'));
const RatioRacerGame = lazy(() => import('./RatioRacerGame'));
const RemainderRunGame = lazy(() => import('./RemainderRunGame'));
const RoundingRocketGame = lazy(() => import('./RoundingRocketGame'));
const RotationStationGame = lazy(() => import('./RotationStationGame'));
const ReasoningQuestGame = lazy(() => import('./ReasoningQuestGame'));
const ScaleBuilderGame = lazy(() => import('./ScaleBuilderGame'));
const ShareSplitterGame = lazy(() => import('./ShareSplitterGame'));
const SimplifySprintGame = lazy(() => import('./SimplifySprintGame'));
const TakeOutRushGame = lazy(() => import('./TakeOutRushGame'));
const ChronoDashGame = lazy(() => import('./ChronoDashGame'));
const TowerOfFactorsGame = lazy(() => import('./TowerOfFactorsGame'));
const GraphGrabberGame = lazy(() => import('./GraphGrabberGame'));
const TreasurePathGame = lazy(() => import('./TreasurePathGame'));
const LavaPathGame = lazy(() => import('./LavaPathGame'));
const LogicSort = lazy(() => import('./reasoning/LogicSort'));
const MatrixMatch = lazy(() => import('./reasoning/MatrixMatch'));
const ReasoningGame = lazy(() => import('./reasoning/ReasoningGame'));
const EnglishStubGame = lazy(() => import('./english/EnglishStubGame'));
const WordWardenGame = lazy(() => import('./english/WordWardenGame'));
const TenseTowerGame = lazy(() => import('./english/TenseTowerGame'));
const ClauseKeepGame = lazy(() => import('./english/ClauseKeepGame'));
const ConjunctionCrossingGame = lazy(() => import('./english/ConjunctionCrossingGame'));
const GrammarGuardGame = lazy(() => import('./english/GrammarGuardGame'));
const CommaCannonGame = lazy(() => import('./english/CommaCannonGame'));
const ApostropheOutlawsGame = lazy(() => import('./english/ApostropheOutlawsGame'));
const PunctuationPatrolGame = lazy(() => import('./english/PunctuationPatrolGame'));
const SpellingForgeGame = lazy(() => import('./english/SpellingForgeGame'));
const HomophoneHuntGame = lazy(() => import('./english/HomophoneHuntGame'));
const SuffixSiegeGame = lazy(() => import('./english/SuffixSiegeGame'));
const StrongholdSprintGame = lazy(() => import('./english/StrongholdSprintGame'));
const PrefixPatrolGame = lazy(() => import('./english/PrefixPatrolGame'));
const ForgeOfSuffixesGame = lazy(() => import('./english/ForgeOfSuffixesGame'));
const SentenceSmithGame = lazy(() => import('./english/SentenceSmithGame'));
const ParagraphPatchGame = lazy(() => import('./english/ParagraphPatchGame'));
const ConnectiveCrafterGame = lazy(() => import('./english/ConnectiveCrafterGame'));
const WordWizardGame = lazy(() => import('./english/WordWizardGame'));
const MeaningMinesGame = lazy(() => import('./english/MeaningMinesGame'));
const SynonymSiegeGame = lazy(() => import('./english/SynonymSiegeGame'));
import { createMiniGame, MiniGame } from './MiniGame';

export type MiniGameRegistryKey =
  | 'AngleArenaGame'
  | 'AreaArchitectGame'
  | 'BossEncounterGame'
  | 'CalculationCrashGame'
  | 'CloudCollapseGame'
  | 'ChangeCounterGame'
  | 'CoordinatesQuestGame'
  | 'CurriculumChallengeGame'
  | 'DataDungeonGame'
  | 'DataDetectiveGame'
  | 'DecimalSniperGame'
  | 'FactorFrenzyGame'
  | 'FormulaForgeGame'
  | 'FractionForgeGame'
  | 'FractionMatchGame'
  | 'LineGraphLabGame'
  | 'MathsVsZombiesGame'
  | 'MeanMachineGame'
  | 'MedianMountainGame'
  | 'ConversionCanyonGame'
  | 'MultiplicationMineGame'
  | 'MonsterMarketGame'
  | 'NumberLineNinjaGame'
  | 'OrderOpsArenaGame'
  | 'PerimeterPathGame'
  | 'PercentPowerGame'
  | 'PlaceValuePanicGame'
  | 'PolygonPalaceGame'
  | 'ProblemPyramidGame'
  | 'PotionPanicGame'
  | 'PrimePopGame'
  | 'RatioRacerGame'
  | 'RemainderRunGame'
  | 'RoundingRocketGame'
  | 'RotationStationGame'
  | 'ReasoningQuestGame'
  | 'ScaleBuilderGame'
  | 'ShareSplitterGame'
  | 'SimplifySprintGame'
  | 'TakeOutRushGame'
  | 'ChronoDashGame'
  | 'TowerOfFactorsGame'
  | 'GraphGrabberGame'
  | 'TreasurePathGame'
  | 'LavaPathGame'
  | 'ReasoningGame'
  | 'LogicSort'
  | 'MatrixMatch'
  | 'EnglishStubGame'
  | 'WordWardenGame'
  | 'TenseTowerGame'
  | 'ClauseKeepGame'
  | 'ConjunctionCrossingGame'
  | 'GrammarGuardGame'
  | 'CommaCannonGame'
  | 'ApostropheOutlawsGame'
  | 'PunctuationPatrolGame'
  | 'SpellingForgeGame'
  | 'HomophoneHuntGame'
  | 'SuffixSiegeGame'
  | 'StrongholdSprintGame'
  | 'PrefixPatrolGame'
  | 'ForgeOfSuffixesGame'
  | 'SentenceSmithGame'
  | 'ParagraphPatchGame'
  | 'ConnectiveCrafterGame'
  | 'WordWizardGame'
  | 'MeaningMinesGame'
  | 'SynonymSiegeGame';

const asMiniGame = <P extends Record<string, unknown>>(
  id: string,
  Component: React.ComponentType<P>,
): MiniGame<P> => createMiniGame(id, Component);

/**
 * Single source of truth: every game in src/games is adapted to the standard
 * MiniGame interface (init/update/handleInput/getState/render).
 */
export const MINI_GAME_REGISTRY: Record<MiniGameRegistryKey, MiniGame<any>> = {
  AngleArenaGame: asMiniGame('angle_arena', AngleArenaGame),
  AreaArchitectGame: asMiniGame('area_architect', AreaArchitectGame),
  BossEncounterGame: asMiniGame('boss_encounter', BossEncounterGame),
  CalculationCrashGame: asMiniGame('calculation_crash', CalculationCrashGame),
  ChangeCounterGame: asMiniGame('change_counter', ChangeCounterGame),
  CloudCollapseGame: asMiniGame('cloud_collapse', CloudCollapseGame),
  CoordinatesQuestGame: asMiniGame('coordinates_quest', CoordinatesQuestGame),
  CurriculumChallengeGame: asMiniGame('curriculum_challenge', CurriculumChallengeGame),
  DataDungeonGame: asMiniGame('data_dungeon', DataDungeonGame),
  DataDetectiveGame: asMiniGame('data_detective', DataDetectiveGame),
  DecimalSniperGame: asMiniGame('decimal_sniper', DecimalSniperGame),
  FactorFrenzyGame: asMiniGame('factor_frenzy', FactorFrenzyGame),
  FormulaForgeGame: asMiniGame('formula_forge', FormulaForgeGame),
  FractionForgeGame: asMiniGame('fraction_forge', FractionForgeGame),
  FractionMatchGame: asMiniGame('fraction_match', FractionMatchGame),
  LineGraphLabGame: asMiniGame('line_graph_lab', LineGraphLabGame),
  MathsVsZombiesGame: asMiniGame('maths_vs_zombies', MathsVsZombiesGame),
  MeanMachineGame: asMiniGame('mean_machine', MeanMachineGame),
  MedianMountainGame: asMiniGame('median_mountain', MedianMountainGame),
  ConversionCanyonGame: asMiniGame('conversion_canyon', ConversionCanyonGame),
  MultiplicationMineGame: asMiniGame('multiplication_mine', MultiplicationMineGame),
  MonsterMarketGame: asMiniGame('monster_market', MonsterMarketGame),
  NumberLineNinjaGame: asMiniGame('number_line_ninja', NumberLineNinjaGame),
  OrderOpsArenaGame: asMiniGame('order_ops_arena', OrderOpsArenaGame),
  PerimeterPathGame: asMiniGame('perimeter_path', PerimeterPathGame),
  PercentPowerGame: asMiniGame('percent_power', PercentPowerGame),
  PlaceValuePanicGame: asMiniGame('place_value_panic', PlaceValuePanicGame),
  PolygonPalaceGame: asMiniGame('polygon_palace', PolygonPalaceGame),
  ProblemPyramidGame: asMiniGame('problem_pyramid', ProblemPyramidGame),
  PotionPanicGame: asMiniGame('potion_pour', PotionPanicGame),
  PrimePopGame: asMiniGame('prime_pop', PrimePopGame),
  RatioRacerGame: asMiniGame('ratio_fractions', RatioRacerGame),
  RemainderRunGame: asMiniGame('remainder_run', RemainderRunGame),
  RoundingRocketGame: asMiniGame('rounding_rocket', RoundingRocketGame),
  RotationStationGame: asMiniGame('rotation_station', RotationStationGame),
  ReasoningQuestGame: asMiniGame('reasoning_quest', ReasoningQuestGame),
  ScaleBuilderGame: asMiniGame('scale_builder', ScaleBuilderGame),
  ShareSplitterGame: asMiniGame('share_splitter', ShareSplitterGame),
  SimplifySprintGame: asMiniGame('simplify_sprint', SimplifySprintGame),
  TakeOutRushGame: asMiniGame('take_out_rush', TakeOutRushGame),
  ChronoDashGame: asMiniGame('timekeeper_temple', ChronoDashGame),
  TowerOfFactorsGame: asMiniGame('tower_of_factors', TowerOfFactorsGame),
  GraphGrabberGame: asMiniGame('graph_grabber', GraphGrabberGame),
  TreasurePathGame: asMiniGame('treasure_path', TreasurePathGame),
  LavaPathGame: asMiniGame('unit_mixer', LavaPathGame),
  ReasoningGame: asMiniGame('reasoning', ReasoningGame),
  LogicSort: asMiniGame('logic_sort', LogicSort),
  MatrixMatch: asMiniGame('matrix_match', MatrixMatch),
  EnglishStubGame: asMiniGame('english_stub', EnglishStubGame),
  WordWardenGame: asMiniGame('word_warden', WordWardenGame),
  TenseTowerGame: asMiniGame('tense_tower', TenseTowerGame),
  ClauseKeepGame: asMiniGame('clause_keep', ClauseKeepGame),
  ConjunctionCrossingGame: asMiniGame('conjunction_crossing', ConjunctionCrossingGame),
  GrammarGuardGame: asMiniGame('grammar_guard', GrammarGuardGame),
  CommaCannonGame: asMiniGame('comma_cannon', CommaCannonGame),
  ApostropheOutlawsGame: asMiniGame('apostrophe_outlaws', ApostropheOutlawsGame),
  PunctuationPatrolGame: asMiniGame('punctuation_patrol', PunctuationPatrolGame),
  SpellingForgeGame: asMiniGame('spelling_forge', SpellingForgeGame),
  HomophoneHuntGame: asMiniGame('homophone_hunt', HomophoneHuntGame),
  SuffixSiegeGame: asMiniGame('suffix_siege', SuffixSiegeGame),
  StrongholdSprintGame: asMiniGame('stronghold_sprint', StrongholdSprintGame),
  PrefixPatrolGame: asMiniGame('prefix_patrol', PrefixPatrolGame),
  ForgeOfSuffixesGame: asMiniGame('forge_of_suffixes', ForgeOfSuffixesGame),
  SentenceSmithGame: asMiniGame('sentence_smith', SentenceSmithGame),
  ParagraphPatchGame: asMiniGame('paragraph_patch', ParagraphPatchGame),
  ConnectiveCrafterGame: asMiniGame('connective_crafter', ConnectiveCrafterGame),
  WordWizardGame: asMiniGame('word_wizard', WordWizardGame),
  MeaningMinesGame: asMiniGame('meaning_mines', MeaningMinesGame),
  SynonymSiegeGame: asMiniGame('synonym_siege', SynonymSiegeGame),
};

export const getMiniGame = (key: MiniGameRegistryKey): MiniGame<any> => MINI_GAME_REGISTRY[key];
