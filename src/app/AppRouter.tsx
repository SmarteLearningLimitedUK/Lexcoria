import React, { Suspense, useMemo } from 'react';
import { motion } from 'motion/react';
import AvatarSelect from '../screens/AvatarSelect';
import WorldMap from '../screens/WorldMap';
import IslandLevels from '../screens/IslandLevels';
import ParentDashboard from '../screens/ParentDashboard';
import PlayerProfile from '../screens/PlayerProfile';
import CharacterShop from '../screens/CharacterShop';
import AchievementTracker from '../screens/AchievementTracker';
import WellbeingHub from '../wellbeing/WellbeingHub';
import { WELLBEING_ACTIVITIES, WELLBEING_ACTIVITY_BY_ISLAND, WELLBEING_BY_ID } from '../wellbeing/data';
import { WellbeingActivityId } from '../wellbeing/types';
import GameplayContentViewport from '../components/GameplayContentViewport';
import GameLoadBoundary, { GameLoadFallback } from '../components/GameLoadBoundary';
import {
  FramedPanel,
  GameScreenShell,
  HUDBar,
  PrimaryActionButton,
  PremiumHeaderBar,
  RewardPanel,
} from '../layout/ScreenPrimitives';
import { getMiniGame, MiniGameRegistryKey } from '../games';
import { GameScreen, IslandData, LevelData, PlayerData } from '../types';
import { getLevelGameTitle } from '../utils/gameNames';
import splashPoster from '../assets/casual_ui/splashrep1.png';
import { LEVEL_TIMERS_DISABLED } from './testingFlags';
import {
  bindMiniGameSessionHandlers,
  emitMiniGameSessionEvent,
  GameplaySessionEventHandlers,
  GameplaySessionState,
} from './gameplaySessionContract';

interface RuleSet {
  title: string;
  summary: string;
  bullets: string[];
}

interface AppRouterProps {
  screen: GameScreen;
  player: PlayerData;
  draftName: string;
  setDraftName: (value: string) => void;
  selectedIsland: IslandData | null;
  selectedLevel: LevelData | null;
  selectedRuleSet: RuleSet | null;
  hintRuleSet: RuleSet | null;
  gameplayTypeClass: string;
  gameplayRestartKey: number;
  usesQuestionMatchFrame: boolean;
  globalMiniGameHudTimeLeft: number;
  globalMiniGameLives: number;
  globalMiniGameHudDurationSeconds: number;
  sessionState: GameplaySessionState;
  sessionEvents: GameplaySessionEventHandlers;
  onStartAdventure: () => void;
  onAvatarSelect: (avatarId: string) => void;
  onAvatarConfirm: () => void;
  onGoHome: () => void;
  onBackToSplash: () => void;
  onSelectIsland: (island: IslandData) => void;
  onSelectLevel: (level: LevelData) => void;
  onBackToIslandLevels: () => void;
  onOpenWellbeingHub: () => void;
  onOpenWellbeingActivity: (activityId: WellbeingActivityId) => void;
  onExitWellbeing: () => void;
  onCompleteWellbeingActivity: () => void;
  wellbeingActivityId: WellbeingActivityId | null;
  calmTokens: number;
  onGameplayVictory: (stars: number, XP: number) => void;
  onGameplayOver: (XP: number) => void;
  onOpenShop: () => void;
  onOpenAchievements: () => void;
  onOpenParentReport: () => void;
  onUpdatePlayer: (updater: (prev: PlayerData) => PlayerData) => void;
}

export const AppRouter: React.FC<AppRouterProps> = ({
  screen,
  player,
  draftName,
  setDraftName,
  selectedIsland,
  selectedLevel,
  selectedRuleSet,
  hintRuleSet,
  gameplayTypeClass,
  gameplayRestartKey,
  usesQuestionMatchFrame,
  globalMiniGameHudTimeLeft,
  globalMiniGameLives,
  globalMiniGameHudDurationSeconds,
  sessionState,
  sessionEvents,
  onStartAdventure,
  onAvatarSelect,
  onAvatarConfirm,
  onGoHome,
  onBackToSplash,
  onSelectIsland,
  onSelectLevel,
  onBackToIslandLevels,
  onOpenWellbeingHub,
  onOpenWellbeingActivity,
  onExitWellbeing,
  onCompleteWellbeingActivity,
  wellbeingActivityId,
  calmTokens,
  onGameplayVictory,
  onGameplayOver,
  onOpenShop,
  onOpenAchievements,
  onOpenParentReport,
  onUpdatePlayer,
}) => {
  const renderGameplay = () => {
    if (!selectedLevel) {
      return (
        <GameLoadFallback
          title="This game is missing"
          subtitle="We could not find the selected level data."
          onBack={onBackToIslandLevels}
        />
      );
    }

    const renderFromRegistry = <P extends Record<string, unknown>>(key: MiniGameRegistryKey, props: P) => (
      <GameLoadBoundary
        key={`${key}-${selectedLevel.id}-${gameplayRestartKey}`}
        onBack={onBackToIslandLevels}
        context={{
          title: getLevelGameTitle(selectedLevel),
          gameType: selectedLevel.gameType,
          levelId: selectedLevel.id,
          blueprintKey: selectedLevel.blueprintKey,
        }}
      >
        <Suspense
          fallback={(
            <div className="flex h-full w-full items-center justify-center rounded-[2rem] border border-cyan-100/30 bg-[linear-gradient(180deg,rgba(10,31,83,0.72),rgba(6,19,56,0.86))] text-center shadow-[0_18px_36px_rgba(2,6,23,0.35)]">
              <div className="px-6 py-8 text-sm font-black uppercase tracking-[0.2em] text-cyan-100/80">
                Loading game…
              </div>
            </div>
          )}
        >
          {getMiniGame(key).render(props)}
        </Suspense>
      </GameLoadBoundary>
    );

    const sharedProps = {
      levelId: selectedLevel.id,
      avatarId: player.avatarId,
      useSharedTopHud: true,
      isPractice: Boolean(selectedLevel.isPractice),
      practiceBriefing: hintRuleSet,
      gameTitle: getLevelGameTitle(selectedLevel),
      onVictory: onGameplayVictory,
      onGameOver: onGameplayOver,
      onBack: onBackToIslandLevels,
      sessionState,
      sessionEvents: bindMiniGameSessionHandlers(sessionEvents, {
        gameType: selectedLevel.gameType,
        levelId: selectedLevel.id,
      }),
    };

    switch (selectedLevel.gameType) {
      case 'WORD_WARDEN':
        return renderFromRegistry('WordWardenGame', sharedProps);
      case 'TENSE_TOWER':
        return renderFromRegistry('TenseTowerGame', sharedProps);
      case 'CLAUSE_KEEP':
        return renderFromRegistry('ClauseKeepGame', sharedProps);
      case 'CONJUNCTION_CROSSING':
        return renderFromRegistry('ConjunctionCrossingGame', sharedProps);
      case 'GRAMMAR_GUARD':
        return renderFromRegistry('GrammarGuardGame', sharedProps);
      case 'COMMA_CANNON':
        return renderFromRegistry('CommaCannonGame', sharedProps);
      case 'APOSTROPHE_OUTLAWS':
        return renderFromRegistry('ApostropheOutlawsGame', sharedProps);
      case 'PUNCTUATION_PATROL':
        return renderFromRegistry('PunctuationPatrolGame', sharedProps);
      case 'STRONGHOLD_SPRINT':
        return renderFromRegistry('StrongholdSprintGame', sharedProps);
      case 'PREFIX_PATROL':
        return renderFromRegistry('PrefixPatrolGame', sharedProps);
      case 'FORGE_OF_SUFFIXES':
        return renderFromRegistry('ForgeOfSuffixesGame', sharedProps);
      case 'SPELLING_FORGE':
        return renderFromRegistry('SpellingForgeGame', sharedProps);
      case 'HALL_OF_ECHOES':
        return renderFromRegistry('HallOfEchoesGame', sharedProps);
      case 'PATTERN_TRIALS':
        return renderFromRegistry('PatternTrialsGame', sharedProps);
      case 'WORD_MORPH':
        return renderFromRegistry('WordMorphGame', sharedProps);
      case 'HOMOPHONE_HUNT':
        return renderFromRegistry('HomophoneHuntGame', sharedProps);
      case 'SUFFIX_SIEGE':
        return renderFromRegistry('SuffixSiegeGame', sharedProps);
      case 'SENTENCE_SMITH':
        return renderFromRegistry('SentenceSmithGame', sharedProps);
      case 'SENTENCE_SHIFT':
        return renderFromRegistry('SentenceShiftGame', sharedProps);
      case 'BLADE_REFINER':
        return renderFromRegistry('BladeRefinerGame', sharedProps);
      case 'POWER_INFUSION':
        return renderFromRegistry('PowerInfusionGame', sharedProps);
      case 'FORGE_REPAIR':
        return renderFromRegistry('ForgeRepairGame', sharedProps);
      case 'PARAGRAPH_PATCH':
        return renderFromRegistry('ParagraphPatchGame', sharedProps);
      case 'CONNECTIVE_CRAFTER':
        return renderFromRegistry('ConnectiveCrafterGame', sharedProps);
      case 'WORD_WIZARD':
        return renderFromRegistry('WordWizardGame', sharedProps);
      case 'MEANING_MINES':
        return renderFromRegistry('MeaningMinesGame', sharedProps);
      case 'SYNONYM_SIEGE':
        return renderFromRegistry('SynonymSiegeGame', sharedProps);
      case 'WORD_SENSE':
        return renderFromRegistry('WordSenseGame', sharedProps);
      case 'TWIN_WORDS_TRIAL':
        return renderFromRegistry('TwinWordsTrialGame', sharedProps);
      case 'ANTONYM_AMBUSH':
        return renderFromRegistry('AntonymAmbushGame', sharedProps);
      case 'TONE_TRADER':
        return renderFromRegistry('ToneTraderGame', sharedProps);
      case 'MEANING_MATCH':
        return renderFromRegistry('MeaningMatchGame', sharedProps);
      case 'RETRIEVAL_RAPIDS':
        return renderFromRegistry('RetrievalRapidsGame', sharedProps);
      case 'INFERENCE_ISLE':
        return renderFromRegistry('InferenceIsleGame', sharedProps);
      case 'TEXT_DETECTIVE':
        return renderFromRegistry('TextDetectiveGame', sharedProps);
      case 'STORY_SEQUENCER':
        return renderFromRegistry('StorySequencerGame', sharedProps);
      case 'FACT_OR_FICTION_FORGE':
        return renderFromRegistry('FactOrFictionForgeGame', sharedProps);
      case 'COMPARE_CONTRAST_CANYON':
        return renderFromRegistry('CompareContrastCanyonGame', sharedProps);
      case 'EVIDENCE_EXPLORER':
        return renderFromRegistry('EvidenceExplorerGame', sharedProps);
      case 'SEQUENCE_STREAM':
        return renderFromRegistry('SequenceStreamGame', sharedProps);
      case 'AUTHOR_INTENT':
        return renderFromRegistry('AuthorIntentGame', sharedProps);
      case 'SUMMARY_SELECT':
        return renderFromRegistry('SummarySelectGame', sharedProps);
      case 'EVIDENCE_CHAIN':
        return renderFromRegistry('EvidenceChainGame', sharedProps);
      case 'PASSAGE_QUEST':
        return renderFromRegistry('PassageQuestGame', sharedProps);
      case 'EVIDENCE_HIGHLIGHT':
        return renderFromRegistry('EvidenceHighlightGame', sharedProps);
      case 'TWIN_TICK_TRIAL':
        return renderFromRegistry('TwinTickTrialGame', sharedProps);
      case 'RULE_BREAKER':
        return renderFromRegistry('RuleBreakerGame', sharedProps);
      case 'BEST_ANSWER_QUEST':
        return renderFromRegistry('BestAnswerQuestGame', sharedProps);
      case 'MIXED_MASTERY':
        return renderFromRegistry('MixedMasteryGame', sharedProps);
      case 'LEGENDS_CHALLENGE':
        return renderFromRegistry('LegendsChallengeGame', sharedProps);
      case 'READING_RESCUE':
        return renderFromRegistry('ReadingRescueGame', sharedProps);
      case 'GRAMMAR_GAUNTLET':
        return renderFromRegistry('GrammarGauntletGame', sharedProps);
      case 'WORDSMITH_TRIALS':
        return renderFromRegistry('WordsmithTrialsGame', sharedProps);
      case 'NOUN_PHRASE_BUILDER':
        return renderFromRegistry('NounPhraseBuilderGame', sharedProps);
      case 'VOICE_SWITCH_VAULT':
        return renderFromRegistry('VoiceSwitchVaultGame', sharedProps);
      case 'FORMAL_FIXER':
        return renderFromRegistry('FormalFixerGame', sharedProps);
      case 'COHESION_CONNECTOR':
        return renderFromRegistry('CohesionConnectorGame', sharedProps);
      case 'PUNCTUATION_MASTERY':
        return renderFromRegistry('PunctuationMasteryGame', sharedProps);
      case 'SCHOLARS_SUMMIT':
      case 'INFERENCE_INVADERS':
      case 'RETRIEVAL_RAID':
      case 'LOGIC_LADDER':
      case 'EDITORS_TRIAL':
        return renderFromRegistry('EnglishStubGame', { ...sharedProps, englishGameType: selectedLevel.gameType });
      default:
        return (
          <div className="my-auto flex flex-col items-center gap-6 rounded-[2.2rem] border border-cyan-100/35 bg-[linear-gradient(180deg,rgba(18,48,102,0.84),rgba(12,31,78,0.88))] p-8 text-center shadow-[0_18px_32px_rgba(2,6,23,0.4)]">
            <h2 className="text-4xl font-black text-amber-100">Mini-game incoming</h2>
            <p className="max-w-xl text-lg font-semibold text-cyan-100/88">
              This slot is wired into the adventure flow, but the gameplay scene is still being built.
            </p>
            <button
              onClick={onBackToIslandLevels}
              className="ui-button-primary rounded-2xl px-8 py-4 font-black text-white"
            >
              Back to island
            </button>
          </div>
        );
    }
  };

  switch (screen) {
    case 'splash':
      return (
        <div className="relative h-full w-full overflow-hidden">
          <motion.img
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            src={splashPoster}
            alt="SATs Legends splash screen"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: '50% 0%' }}
            draggable={false}
          />

          <div className="absolute bottom-[7.5%] left-1/2 h-14 w-56 -translate-x-1/2 sm:h-16 sm:w-64">
            <button
              type="button"
              onClick={onStartAdventure}
              aria-label="Start"
              className="ui-button-primary flex h-full w-full items-center justify-center border-0 bg-transparent px-4 py-0 text-lg font-black uppercase tracking-[0.12em] text-[#16233d] sm:text-xl"
            >
              Start
            </button>
          </div>
        </div>
      );
    case 'profile_setup':
    case 'avatar_selection':
      return (
        <AvatarSelect
          selectedId={player.avatarId}
          onSelect={onAvatarSelect}
          draftName={draftName}
          onDraftNameChange={setDraftName}
          onBackToSplash={onBackToSplash}
          onConfirm={onAvatarConfirm}
        />
      );

    case 'world_map':
      return (
        <WorldMap
          player={player}
          onSelectIsland={onSelectIsland}
          onOpenShop={onOpenShop}
          onOpenAchievements={onOpenAchievements}
          onOpenParentReport={onOpenParentReport}
        />
      );

    case 'island_levels':
      return selectedIsland ? (
        <IslandLevels
          island={selectedIsland}
          player={player}
          onBack={onGoHome}
          onSelectLevel={onSelectLevel}
          wellbeingTitle={WELLBEING_BY_ID[WELLBEING_ACTIVITY_BY_ISLAND[selectedIsland.id]]?.title}
          wellbeingSubtitle={WELLBEING_BY_ID[WELLBEING_ACTIVITY_BY_ISLAND[selectedIsland.id]]?.description}
          wellbeingType={WELLBEING_BY_ID[WELLBEING_ACTIVITY_BY_ISLAND[selectedIsland.id]]?.type}
          onOpenWellbeing={() => onOpenWellbeingActivity(WELLBEING_ACTIVITY_BY_ISLAND[selectedIsland.id])}
        />
      ) : null;

    case 'shop':
      return (
        <CharacterShop
          player={player}
          onBack={onGoHome}
          onUpdatePlayer={onUpdatePlayer}
        />
      );

    case 'achievements_tracker':
      return <AchievementTracker player={player} onBack={onGoHome} />;

    case 'wellbeing_hub':
      return (
        <WellbeingHub
          activities={WELLBEING_ACTIVITIES}
          calmTokens={calmTokens}
          onSelect={onOpenWellbeingActivity}
          onExit={onExitWellbeing}
        />
      );

    case 'wellbeing_activity': {
      if (!wellbeingActivityId) return null;
      const SelectedWellbeingActivity = WELLBEING_BY_ID[wellbeingActivityId]?.component;
      return SelectedWellbeingActivity ? (
        <SelectedWellbeingActivity onComplete={onCompleteWellbeingActivity} onExit={onExitWellbeing} />
      ) : null;
    }

    case 'gameplay':
      const hideMiniGameTimer = useMemo(() => {
        if (screen !== 'gameplay' || !selectedLevel) return false;
        if (LEVEL_TIMERS_DISABLED) return true;
        return selectedLevel.gameType === 'basketball_rebounder';
      }, [screen, selectedLevel]);

    const shellStyle = {
        '--game-shell-top-inset': '0.8rem',
        '--game-shell-bottom-inset': hideMiniGameTimer || LEVEL_TIMERS_DISABLED ? '3.6rem' : '4rem',
      } as React.CSSProperties;

      return (
        <div
          className={`game-shell-host unified-minigame-hud-enabled ${gameplayTypeClass} ${usesQuestionMatchFrame ? 'question-match-shell' : ''} relative flex h-[100dvh] max-h-[100dvh] w-full min-h-0 flex-col overflow-hidden md:h-full md:max-h-full`.trim()}
          data-island={selectedIsland?.id}
          style={shellStyle}
        >
            <div className="game-shell-contract relative z-[2] flex h-full max-h-full w-full min-h-0 flex-col overflow-hidden">

            <div
              className="structured-game-layout relative flex h-full max-h-full w-full min-h-0 flex-1 flex-col overflow-hidden"
              style={{
                paddingTop: 'var(--game-shell-top-inset)',
                paddingBottom: 'var(--game-shell-bottom-inset)',
                paddingLeft: '0.3rem',
                paddingRight: '0.3rem',
              }}
            >
              <GameplayContentViewport>
                {renderGameplay()}
              </GameplayContentViewport>
            </div>

          </div>
        </div>
      );

    case 'parent_dashboard':
      return <ParentDashboard player={player} onBack={onGoHome} />;

    case 'profile':
      return <PlayerProfile player={player} onBack={onGoHome} />;

    case 'settings':
      return (
        <GameScreenShell className="my-auto flex items-center justify-center">
          <FramedPanel variant="surface" className="flex w-full max-w-md flex-col gap-4 p-4 text-center md:max-w-2xl md:gap-6 md:p-8">
            <PremiumHeaderBar eyebrow="Adventure menu" title={screen === 'profile' ? 'Profile' : 'Settings'} className="justify-center text-center" />
            <RewardPanel className="mx-auto max-w-xl">
              <p className="text-sm font-black leading-relaxed text-amber-950 md:text-base">
                This screen is parked for the next premium UI pass. The main adventure flow is live and fully playable.
              </p>
            </RewardPanel>
            <PrimaryActionButton onClick={onGoHome} className="mx-auto rounded-[1.25rem] px-8 py-3 text-base md:rounded-2xl md:px-10 md:py-4 md:text-lg">
              Return to map
            </PrimaryActionButton>
          </FramedPanel>
        </GameScreenShell>
      );

    default:
      return (
        <GameScreenShell className="my-auto flex items-center justify-center">
          <FramedPanel variant="surface" className="flex w-full max-w-md flex-col gap-4 p-4 text-center md:max-w-2xl md:gap-6 md:p-8">
            <HUDBar eyebrow="Screen missing" title={`Screen ${screen}`} className="justify-center text-center" />
            <RewardPanel className="mx-auto max-w-xl">
              <p className="text-sm font-black text-amber-950 md:text-base">
                This route is not wired into the live adventure flow yet.
              </p>
            </RewardPanel>
            <PrimaryActionButton onClick={onGoHome} className="mx-auto rounded-[1.25rem] px-8 py-3 text-base md:rounded-2xl md:px-10 md:py-4 md:text-lg">
              Return to map
            </PrimaryActionButton>
          </FramedPanel>
        </GameScreenShell>
      );
  }
};
