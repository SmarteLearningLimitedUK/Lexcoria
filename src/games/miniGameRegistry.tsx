import React, { lazy } from 'react';
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
const HallOfEchoesGame = lazy(() => import('./english/HallOfEchoesGame'));
const PatternTrialsGame = lazy(() => import('./english/PatternTrialsGame'));
const WordMorphGame = lazy(() => import('./english/WordMorphGame'));
const SentenceSmithGame = lazy(() => import('./english/SentenceSmithGame'));
const SentenceShiftGame = lazy(() => import('./english/SentenceShiftGame'));
const BladeRefinerGame = lazy(() => import('./english/BladeRefinerGame'));
const PowerInfusionGame = lazy(() => import('./english/PowerInfusionGame'));
const ForgeRepairGame = lazy(() => import('./english/ForgeRepairGame'));
const ParagraphPatchGame = lazy(() => import('./english/ParagraphPatchGame'));
const ConnectiveCrafterGame = lazy(() => import('./english/ConnectiveCrafterGame'));
const WordSenseGame = lazy(() => import('./english/WordSenseGame'));
const TwinWordsTrialGame = lazy(() => import('./english/TwinWordsTrialGame'));
const AntonymAmbushGame = lazy(() => import('./english/AntonymAmbushGame'));
const ToneTraderGame = lazy(() => import('./english/ToneTraderGame'));
const MeaningMatchGame = lazy(() => import('./english/MeaningMatchGame'));
const RetrievalRapidsGame = lazy(() => import('./english/RetrievalRapidsGame'));
const InferenceIsleGame = lazy(() => import('./english/InferenceIsleGame'));
const TextDetectiveGame = lazy(() => import('./english/TextDetectiveGame'));
const EvidenceExplorerGame = lazy(() => import('./english/EvidenceExplorerGame'));
const SequenceStreamGame = lazy(() => import('./english/SequenceStreamGame'));
const AuthorIntentGame = lazy(() => import('./english/AuthorIntentGame'));
const SummarySelectGame = lazy(() => import('./english/SummarySelectGame'));
const PassageQuestGame = lazy(() => import('./english/PassageQuestGame'));
const EvidenceHighlightGame = lazy(() => import('./english/EvidenceHighlightGame'));
const EvidenceChainGame = lazy(() => import('./english/EvidenceChainGame'));
const TwinTickTrialGame = lazy(() => import('./english/TwinTickTrialGame'));
const RuleBreakerGame = lazy(() => import('./english/RuleBreakerGame'));
const BestAnswerQuestGame = lazy(() => import('./english/BestAnswerQuestGame'));
const MixedMasteryGame = lazy(() => import('./english/MixedMasteryGame'));
const LegendsChallengeGame = lazy(() => import('./english/LegendsChallengeGame'));
const ReadingRescueGame = lazy(() => import('./english/ReadingRescueGame'));
const GrammarGauntletGame = lazy(() => import('./english/GrammarGauntletGame'));
const WordsmithTrialsGame = lazy(() => import('./english/WordsmithTrialsGame'));
const WordWizardGame = lazy(() => import('./english/WordWizardGame'));
const MeaningMinesGame = lazy(() => import('./english/MeaningMinesGame'));
const SynonymSiegeGame = lazy(() => import('./english/SynonymSiegeGame'));
import { createMiniGame, MiniGame } from './MiniGame';

export type MiniGameRegistryKey =
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
  | 'HallOfEchoesGame'
  | 'PatternTrialsGame'
  | 'WordMorphGame'
  | 'SentenceSmithGame'
  | 'SentenceShiftGame'
  | 'BladeRefinerGame'
  | 'PowerInfusionGame'
  | 'ForgeRepairGame'
  | 'ParagraphPatchGame'
  | 'ConnectiveCrafterGame'
  | 'WordSenseGame'
  | 'TwinWordsTrialGame'
  | 'AntonymAmbushGame'
  | 'ToneTraderGame'
  | 'MeaningMatchGame'
  | 'RetrievalRapidsGame'
  | 'InferenceIsleGame'
  | 'TextDetectiveGame'
  | 'EvidenceExplorerGame'
  | 'SequenceStreamGame'
  | 'AuthorIntentGame'
  | 'SummarySelectGame'
  | 'PassageQuestGame'
  | 'EvidenceHighlightGame'
  | 'EvidenceChainGame'
  | 'TwinTickTrialGame'
  | 'RuleBreakerGame'
  | 'BestAnswerQuestGame'
  | 'MixedMasteryGame'
  | 'LegendsChallengeGame'
  | 'ReadingRescueGame'
  | 'GrammarGauntletGame'
  | 'WordsmithTrialsGame'
  | 'WordWizardGame'
  | 'MeaningMinesGame'
  | 'SynonymSiegeGame';

const asMiniGame = <P extends Record<string, unknown>>(
  id: string,
  Component: React.ComponentType<P>,
): MiniGame<P> => createMiniGame(id, Component);

export const MINI_GAME_REGISTRY: Record<MiniGameRegistryKey, MiniGame<any>> = {
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
  HallOfEchoesGame: asMiniGame('hall_of_echoes', HallOfEchoesGame),
  PatternTrialsGame: asMiniGame('pattern_trials', PatternTrialsGame),
  WordMorphGame: asMiniGame('word_morph', WordMorphGame),
  SentenceSmithGame: asMiniGame('sentence_smith', SentenceSmithGame),
  SentenceShiftGame: asMiniGame('sentence_shift', SentenceShiftGame),
  BladeRefinerGame: asMiniGame('blade_refiner', BladeRefinerGame),
  PowerInfusionGame: asMiniGame('power_infusion', PowerInfusionGame),
  ForgeRepairGame: asMiniGame('forge_repair', ForgeRepairGame),
  ParagraphPatchGame: asMiniGame('paragraph_patch', ParagraphPatchGame),
  ConnectiveCrafterGame: asMiniGame('connective_crafter', ConnectiveCrafterGame),
  WordSenseGame: asMiniGame('word_sense', WordSenseGame),
  TwinWordsTrialGame: asMiniGame('twin_words_trial', TwinWordsTrialGame),
  AntonymAmbushGame: asMiniGame('antonym_ambush', AntonymAmbushGame),
  ToneTraderGame: asMiniGame('tone_trader', ToneTraderGame),
  MeaningMatchGame: asMiniGame('meaning_match', MeaningMatchGame),
  RetrievalRapidsGame: asMiniGame('retrieval_rapids', RetrievalRapidsGame),
  InferenceIsleGame: asMiniGame('inference_isle', InferenceIsleGame),
  TextDetectiveGame: asMiniGame('text_detective', TextDetectiveGame),
  EvidenceExplorerGame: asMiniGame('evidence_explorer', EvidenceExplorerGame),
  SequenceStreamGame: asMiniGame('sequence_stream', SequenceStreamGame),
  AuthorIntentGame: asMiniGame('author_intent', AuthorIntentGame),
  SummarySelectGame: asMiniGame('summary_select', SummarySelectGame),
  PassageQuestGame: asMiniGame('passage_quest', PassageQuestGame),
  EvidenceHighlightGame: asMiniGame('evidence_highlight', EvidenceHighlightGame),
  EvidenceChainGame: asMiniGame('evidence_chain', EvidenceChainGame),
  TwinTickTrialGame: asMiniGame('twin_tick_trial', TwinTickTrialGame),
  RuleBreakerGame: asMiniGame('rule_breaker', RuleBreakerGame),
  BestAnswerQuestGame: asMiniGame('best_answer_quest', BestAnswerQuestGame),
  MixedMasteryGame: asMiniGame('mixed_mastery', MixedMasteryGame),
  LegendsChallengeGame: asMiniGame('legends_challenge', LegendsChallengeGame),
  ReadingRescueGame: asMiniGame('reading_rescue', ReadingRescueGame),
  GrammarGauntletGame: asMiniGame('grammar_gauntlet', GrammarGauntletGame),
  WordsmithTrialsGame: asMiniGame('wordsmith_trials', WordsmithTrialsGame),
  WordWizardGame: asMiniGame('word_wizard', WordWizardGame),
  MeaningMinesGame: asMiniGame('meaning_mines', MeaningMinesGame),
  SynonymSiegeGame: asMiniGame('synonym_siege', SynonymSiegeGame),
};

export const getMiniGame = (key: MiniGameRegistryKey): MiniGame<any> => MINI_GAME_REGISTRY[key];
