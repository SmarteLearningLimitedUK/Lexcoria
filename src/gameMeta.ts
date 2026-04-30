import { MiniGameType } from './types';
import { getCanonicalGameLabel } from './gameNames';

export interface GameRuleSet {
  title: string;
  summary: string;
  bullets: string[];
}

export interface GameMeta {
  label: string;
  focus: string;
  mode?: 'standard' | 'special';
  rules: GameRuleSet;
}

const simpleRules = (title: string, summary: string, bullets: string[]): GameRuleSet => ({
  title,
  summary,
  bullets,
});

export const GAME_META: Partial<Record<MiniGameType, GameMeta>> = {
  WORD_WARDEN: {
    label: 'Word Warden',
    focus: 'Word classes and grammar',
    rules: simpleRules('Word Warden', 'Identify the correct word class.', [
      'Read the sentence and look for the highlighted word.',
      'Choose the best word class for that word.',
      'Confirm to lock in your answer.',
    ]),
  },
  TENSE_TOWER: {
    label: 'Tense Tower',
    focus: 'Verb tense recognition',
    rules: simpleRules('Tense Tower', 'Choose the tense or the best verb form.', [
      'Read the sentence carefully.',
      'Pick the option that matches the tense needed.',
      'Confirm to continue.',
    ]),
  },
  CLAUSE_KEEP: {
    label: 'Clause Keep',
    focus: 'Main and subordinate clauses',
    rules: simpleRules('Clause Keep', 'Identify the correct clause in each sentence.', [
      'Read the full sentence first.',
      'Choose the option that matches the prompt.',
      'Confirm to continue.',
    ]),
  },
  CONJUNCTION_CROSSING: {
    label: 'Conjunction Crossing',
    focus: 'Conjunction choice and sentence flow',
    rules: simpleRules('Conjunction Crossing', 'Pick the best conjunction to complete the sentence.', [
      'Preview the sentence with your choice.',
      'Choose the option that makes the best sense.',
      'Confirm to lock in the crossing.',
    ]),
  },
  GRAMMAR_GUARD: {
    label: 'Grammar Guard',
    focus: 'Grammar accuracy',
    rules: simpleRules('Grammar Guard', 'Defend the gate with the strongest grammar choice.', [
      'Read the prompt quickly but carefully.',
      'Eliminate near-miss distractors.',
      'Confirm below.',
    ]),
  },
  COMMA_CANNON: {
    label: 'Comma Cannon',
    focus: 'Comma placement',
    rules: simpleRules('Comma Cannon', 'Choose the sentence with correct comma use.', [
      'Look for clauses and pauses.',
      'Pick the clearest correctly punctuated option.',
      'Confirm below.',
    ]),
  },
  APOSTROPHE_OUTLAWS: {
    label: 'Apostrophe Outlaws',
    focus: 'Apostrophes for possession and contraction',
    rules: simpleRules('Apostrophe Outlaws', 'Pick the option with the correct apostrophe.', [
      'Decide: possession or contraction?',
      'Choose the correctly punctuated sentence.',
      'Confirm below.',
    ]),
  },
  PUNCTUATION_PATROL: {
    label: 'Punctuation Patrol',
    focus: 'Punctuation and sentence correctness',
    rules: simpleRules('Punctuation Patrol', 'Choose the best punctuated sentence.', [
      'Scan for missing or incorrect punctuation.',
      'Pick the cleanest correct option.',
      'Confirm below.',
    ]),
  },
  STRONGHOLD_SPRINT: {
    label: 'Stronghold Sprint',
    focus: 'Spelling and word patterns',
    rules: simpleRules('Stronghold Sprint', 'Choose the correct spelling under pressure.', [
      'Watch for common traps.',
      'Pick the correct spelling.',
      'Confirm below.',
    ]),
  },
  PREFIX_PATROL: {
    label: 'Prefix Patrol',
    focus: 'Prefixes and meaning',
    rules: simpleRules('Prefix Patrol', 'Choose the prefix that fits the meaning.', [
      'Read the prompt and the target word.',
      'Pick the best prefix choice.',
      'Confirm below.',
    ]),
  },
  FORGE_OF_SUFFIXES: {
    label: 'Forge of Suffixes',
    focus: 'Suffix meaning and word-building',
    rules: simpleRules('Forge of Suffixes', 'Choose the suffix that forms the correct word.', [
      'Look for the correct word form.',
      'Pick the best suffix option.',
      'Confirm below.',
    ]),
  },
  HALL_OF_ECHOES: {
    label: 'Hall of Echoes',
    focus: 'Word meaning and usage',
    rules: simpleRules('Hall of Echoes', 'Choose the best meaning or usage.', [
      'Use context clues.',
      'Choose the strongest option.',
      'Confirm below.',
    ]),
  },
  SPELLING_FORGE: {
    label: 'Spelling Forge',
    focus: 'Spelling accuracy',
    rules: simpleRules('Spelling Forge', 'Choose the correct spelling.', [
      'Check each option carefully.',
      'Pick the correct spelling.',
      'Confirm below.',
    ]),
  },
  PATTERN_TRIALS: {
    label: 'Pattern Trials',
    focus: 'Spelling patterns',
    rules: simpleRules('Pattern Trials', 'Spot the pattern and choose the correct option.', [
      'Look for the repeated pattern.',
      'Pick the option that fits.',
      'Confirm below.',
    ]),
  },
  WORD_MORPH: {
    label: 'Word Morph',
    focus: 'Word forms and morphology',
    rules: simpleRules('Word Morph', 'Choose the best word form.', [
      'Read the prompt.',
      'Pick the correct form of the word.',
      'Confirm below.',
    ]),
  },
  HOMOPHONE_HUNT: {
    label: 'Homophone Hunt',
    focus: 'Homophones in context',
    rules: simpleRules('Homophone Hunt', 'Choose the correct homophone for the sentence.', [
      'Use context to decide meaning.',
      'Pick the correct homophone.',
      'Confirm below.',
    ]),
  },
  SUFFIX_SIEGE: {
    label: 'Suffix Siege',
    focus: 'Suffix rules and spelling',
    rules: simpleRules('Suffix Siege', 'Choose the correct suffix spelling.', [
      'Check the base word and ending rule.',
      'Pick the correct spelling.',
      'Confirm below.',
    ]),
  },
  SENTENCE_SMITH: {
    label: 'Sentence Smith',
    focus: 'Sentence correctness',
    rules: simpleRules('Sentence Smith', 'Choose the best written sentence.', [
      'Check grammar and clarity.',
      'Pick the strongest option.',
      'Confirm below.',
    ]),
  },
  SENTENCE_SHIFT: {
    label: 'Sentence Shift',
    focus: 'Sentence improvement',
    rules: simpleRules('Sentence Shift', 'Choose the best revision.', [
      'Look for clarity and correctness.',
      'Pick the best improvement.',
      'Confirm below.',
    ]),
  },
  BLADE_REFINER: {
    label: 'Blade Refiner',
    focus: 'Editing for accuracy',
    rules: simpleRules('Blade Refiner', 'Refine the sentence by choosing the best option.', [
      'Find the best correction.',
      'Avoid near-miss options.',
      'Confirm below.',
    ]),
  },
  POWER_INFUSION: {
    label: 'Power Infusion',
    focus: 'Vocabulary and meaning',
    rules: simpleRules('Power Infusion', 'Choose the best meaning or word choice.', [
      'Use context clues.',
      'Pick the strongest option.',
      'Confirm below.',
    ]),
  },
  FORGE_REPAIR: {
    label: 'Forge Repair',
    focus: 'Fixing sentence errors',
    rules: simpleRules('Forge Repair', 'Choose the correction that fixes the sentence.', [
      'Spot the error first.',
      'Pick the correction.',
      'Confirm below.',
    ]),
  },
  PARAGRAPH_PATCH: {
    label: 'Paragraph Patch',
    focus: 'Cohesion and editing',
    rules: simpleRules('Paragraph Patch', 'Choose the best edit for the paragraph.', [
      'Focus on meaning and flow.',
      'Pick the strongest option.',
      'Confirm below.',
    ]),
  },
  CONNECTIVE_CRAFTER: {
    label: 'Connective Crafter',
    focus: 'Connectives and cohesion',
    rules: simpleRules('Connective Crafter', 'Choose the best connective.', [
      'Decide the relationship between ideas.',
      'Pick the best connective.',
      'Confirm below.',
    ]),
  },
  WORD_SENSE: {
    label: 'Word Sense',
    focus: 'Meaning and nuance',
    rules: simpleRules('Word Sense', 'Choose the best meaning.', [
      'Use context clues.',
      'Pick the closest meaning.',
      'Confirm below.',
    ]),
  },
  TWIN_WORDS_TRIAL: {
    label: 'Twin Words Trial',
    focus: 'Word pairs and meaning',
    rules: simpleRules('Twin Words Trial', 'Choose the best pairing.', [
      'Check meaning and usage.',
      'Pick the strongest option.',
      'Confirm below.',
    ]),
  },
  ANTONYM_AMBUSH: {
    label: 'Antonym Ambush',
    focus: 'Opposites and vocabulary',
    rules: simpleRules('Antonym Ambush', 'Choose the antonym.', [
      'Read the target word.',
      'Pick the opposite meaning.',
      'Confirm below.',
    ]),
  },
  TONE_TRADER: {
    label: 'Tone Trader',
    focus: 'Tone and intent',
    rules: simpleRules('Tone Trader', 'Choose the option that matches the tone.', [
      'Look for attitude and feeling in the wording.',
      'Pick the best match.',
      'Confirm below.',
    ]),
  },
  MEANING_MATCH: {
    label: 'Meaning Match',
    focus: 'Meaning and synonyms',
    rules: simpleRules('Meaning Match', 'Choose the closest meaning.', [
      'Use synonyms and context clues.',
      'Pick the closest meaning.',
      'Confirm below.',
    ]),
  },
  WORD_WIZARD: {
    label: 'Word Wizard',
    focus: 'Vocabulary mastery',
    rules: simpleRules('Word Wizard', 'Choose the best word choice.', [
      'Read the prompt carefully.',
      'Pick the strongest option.',
      'Confirm below.',
    ]),
  },
  MEANING_MINES: {
    label: 'Meaning Mines',
    focus: 'Vocabulary in context',
    rules: simpleRules('Meaning Mines', 'Choose the meaning from context.', [
      'Use the sentence to infer meaning.',
      'Pick the best option.',
      'Confirm below.',
    ]),
  },
  SYNONYM_SIEGE: {
    label: 'Synonym Siege',
    focus: 'Synonyms',
    rules: simpleRules('Synonym Siege', 'Choose the best synonym.', [
      'Avoid near-miss distractors.',
      'Pick the closest synonym.',
      'Confirm below.',
    ]),
  },
  RETRIEVAL_RAPIDS: {
    label: 'Retrieval Rapids',
    focus: 'Reading retrieval',
    rules: simpleRules('Retrieval Rapids', 'Find answers directly from the text.', [
      'Tap Read story when needed.',
      'Find the detail in the passage.',
      'Confirm below.',
    ]),
  },
  INFERENCE_ISLE: {
    label: 'Inference Isle',
    focus: 'Reading inference',
    rules: simpleRules('Inference Isle', 'Infer the best answer from the text.', [
      'Use clues from the passage.',
      'Avoid unsupported guesses.',
      'Confirm below.',
    ]),
  },
  TEXT_DETECTIVE: {
    label: 'Text Detective',
    focus: 'Direct comprehension and retrieval',
    rules: simpleRules('Text Detective', 'Answer using facts and exact details from the passage.', [
      'Keep the passage open while you answer.',
      'Choose the option that matches the text exactly.',
      'Confirm below to continue.',
    ]),
  },
  STORY_SEQUENCER: {
    label: 'Story Sequencer',
    focus: 'Ordering events (chronology)',
    rules: simpleRules('Story Sequencer', 'Build the correct event order from the passage.', [
      'Read the passage carefully.',
      'Tap events in the order they happened.',
      'Confirm below to continue.',
    ]),
  },
  FACT_OR_FICTION_FORGE: {
    label: 'Fact or Fiction Forge',
    focus: 'Fact vs opinion / true vs false',
    rules: simpleRules('Fact or Fiction Forge', 'Decide whether a statement is factual or a judgement.', [
      'Read the statement carefully.',
      'Choose the best classification.',
      'Confirm below to continue.',
    ]),
  },
  COMPARE_CONTRAST_CANYON: {
    label: 'Compare & Contrast Canyon',
    focus: 'Comparing ideas across extracts',
    rules: simpleRules('Compare & Contrast Canyon', 'Compare two extracts and choose the best answer.', [
      'Read both extracts.',
      'Look for similarities and differences.',
      'Confirm below to continue.',
    ]),
  },
  EVIDENCE_EXPLORER: {
    label: 'Evidence Explorer',
    focus: 'Evidence selection',
    rules: simpleRules('Evidence Explorer', 'Choose the best evidence from the text.', [
      'Read story for support.',
      'Pick the strongest evidence.',
      'Confirm below.',
    ]),
  },
  SEQUENCE_STREAM: {
    label: 'Sequence Stream',
    focus: 'Order and sequence',
    rules: simpleRules('Sequence Stream', 'Choose the best order of events.', [
      'Track the story timeline.',
      'Pick the strongest option.',
      'Confirm below.',
    ]),
  },
  AUTHOR_INTENT: {
    label: 'Author Intent',
    focus: 'Author purpose',
    rules: simpleRules('Author Intent', 'Choose why the author included the detail.', [
      'Use the passage to justify your choice.',
      'Pick the strongest reason.',
      'Confirm below.',
    ]),
  },
  SUMMARY_SELECT: {
    label: 'Summary Select',
    focus: 'Summarising',
    rules: simpleRules('Summary Select', 'Choose the best summary.', [
      'Pick the option that covers the main idea.',
      'Avoid tiny details.',
      'Confirm below.',
    ]),
  },
  PASSAGE_QUEST: {
    label: 'Passage Quest',
    focus: 'Mixed reading questions',
    rules: simpleRules('Passage Quest', 'Answer mixed questions about the passage.', [
      'Use the text to support every answer.',
      'Reread when unsure.',
      'Confirm below.',
    ]),
  },
  EVIDENCE_HIGHLIGHT: {
    label: 'Evidence Highlight',
    focus: 'Highlighting evidence',
    rules: simpleRules('Evidence Highlight', 'Pick the best supporting chunk.', [
      'Use Read story to check.',
      'Choose the strongest proof.',
      'Confirm below.',
    ]),
  },
  EVIDENCE_CHAIN: {
    label: 'Evidence Chain',
    focus: 'Answer → evidence → reason',
    rules: simpleRules('Evidence Chain', 'Build a full evidence chain.', [
      'Step 1: choose the best answer.',
      'Step 2: choose the best evidence.',
      'Step 3: choose the best reason.',
    ]),
  },
  TWIN_TICK_TRIAL: {
    label: 'Twin Tick Trial',
    focus: 'Select-two reading',
    rules: simpleRules('Twin Tick Trial', 'Select two correct answers.', [
      'Pick exactly two options.',
      'Choose only text-supported answers.',
      'Confirm below.',
    ]),
  },
  RULE_BREAKER: {
    label: 'Rule Breaker',
    focus: 'Rules and exceptions',
    rules: simpleRules('Rule Breaker', 'Choose the option that follows the rule.', [
      'Find the rule first.',
      'Pick the best match.',
      'Confirm below.',
    ]),
  },
  BEST_ANSWER_QUEST: {
    label: 'Best Answer Quest',
    focus: 'Best-answer selection',
    rules: simpleRules('Best Answer Quest', 'Choose the best answer.', [
      'Eliminate weak answers.',
      'Pick the strongest supported option.',
      'Confirm below.',
    ]),
  },
  MIXED_MASTERY: {
    label: 'Mixed Mastery',
    focus: 'Mixed English recap',
    rules: simpleRules('Mixed Mastery', 'A mixed set across English skills.', [
      'Read each prompt twice.',
      'Stay calm with close distractors.',
      'Confirm below.',
    ]),
  },
  LEGENDS_CHALLENGE: {
    label: 'Legends Challenge',
    focus: 'Harder mixed round',
    rules: simpleRules('Legends Challenge', 'A tougher mixed set with closer distractors.', [
      'Read each prompt twice.',
      'Eliminate near-miss distractors calmly.',
      'Confirm below.',
    ]),
  },
  READING_RESCUE: {
    label: 'Reading Rescue',
    focus: 'Reading-focused mixed round',
    rules: simpleRules('Reading Rescue', 'Rescue the meaning with careful reading choices.', [
      'Use the text to support every answer.',
      'Avoid guesses not backed by evidence.',
      'Confirm below.',
    ]),
  },
  GRAMMAR_GAUNTLET: {
    label: 'Grammar Gauntlet',
    focus: 'Grammar-focused mixed round',
    rules: simpleRules('Grammar Gauntlet', 'A grammar-heavy run with quick decisions.', [
      'Watch for clause and word-class clues.',
      'Choose the strongest option each time.',
      'Confirm below.',
    ]),
  },
  WORDSMITH_TRIALS: {
    label: 'Wordsmith Trials',
    focus: 'Vocabulary and word-building recap',
    rules: simpleRules('Wordsmith Trials', 'Prove wordcraft by choosing meanings, synonyms, and correct forms.', [
      'Use context for meaning.',
      'Avoid near-miss synonyms.',
      'Confirm below.',
    ]),
  },
  NOUN_PHRASE_BUILDER: {
    label: 'Noun Phrase Builder',
    focus: 'Expanded noun phrases',
    rules: simpleRules('Noun Phrase Builder', 'Build the expanded noun phrase by choosing modifiers.', [
      'Add modifiers in the best order.',
      'Check the full phrase reads correctly.',
      'Confirm below to continue.',
    ]),
  },
  VOICE_SWITCH_VAULT: {
    label: 'Voice Switch Vault',
    focus: 'Active vs passive voice',
    rules: simpleRules('Voice Switch Vault', 'Identify whether the sentence is active or passive.', [
      'Find who is doing the action.',
      'Choose active or passive.',
      'Confirm below to continue.',
    ]),
  },
  FORMAL_FIXER: {
    label: 'Formal Fixer',
    focus: 'Formal vs informal language',
    rules: simpleRules('Formal Fixer', 'Replace informal phrases with formal equivalents.', [
      'Spot the informal wording.',
      'Choose the formal replacement.',
      'Confirm below to continue.',
    ]),
  },
  COHESION_CONNECTOR: {
    label: 'Cohesion Connector',
    focus: 'Linking ideas and pronouns',
    rules: simpleRules('Cohesion Connector', 'Choose the correct linking word or pronoun.', [
      'Read both sentences together.',
      'Choose the word that keeps meaning clear.',
      'Confirm below to continue.',
    ]),
  },
  PUNCTUATION_MASTERY: {
    label: 'Punctuation Mastery',
    focus: 'Advanced punctuation',
    rules: simpleRules('Punctuation Mastery', 'Insert the correct punctuation (colon, semicolon, brackets, hyphen).', [
      'Read for meaning and structure.',
      'Pick the punctuation that fits best.',
      'Confirm below to continue.',
    ]),
  },
};

export const getGameLabel = (gameType?: MiniGameType | null) => (
  getCanonicalGameLabel(gameType) || (gameType ? GAME_META[gameType]?.label || gameType.replace(/_/g, ' ') : '')
);
