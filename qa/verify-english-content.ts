import assert from 'node:assert/strict';
import {
  AUTHOR_INTENT_QUESTIONS, CLAUSE_CRUSHER_QUESTIONS, COHESION_CONNECTOR_QUESTIONS,
  COMPARE_CONTRAST_CANYON_QUESTIONS, EVIDENCE_HUNTER_QUESTIONS, FACT_OR_FICTION_FORGE_QUESTIONS,
  FORMAL_FIXER_QUESTIONS, GRAMMAR_GAUNTLET_QUESTIONS, INFERENCE_ISLAND_QUESTIONS,
  NOUN_PHRASE_BUILDER_QUESTIONS, PUNCTUATION_MASTERY_QUESTIONS, PUNCTUATION_PANIC_QUESTIONS,
  SENTENCE_SURGERY_QUESTIONS, SPELLBOUND_FORGE_QUESTIONS, STORY_SEQUENCER_QUESTIONS,
  SUMMIT_SUMMARISER_QUESTIONS, TENSE_TRIALS_QUESTIONS, TEXT_DETECTIVE_LEVELS,
  VOICE_SWITCH_VAULT_QUESTIONS, WORD_CLASS_WARS_QUESTIONS, WORD_MEANING_WOODS_QUESTIONS,
} from '../src/systems/content/english/satsSpec';
import { READING_PAPER_PASSAGES, READING_PAPER_QUESTIONS } from '../src/systems/content/english/readingPaper';
import { buildExpandedNounPhrase } from '../src/systems/content/english/nounPhrase';

const seenIds = new Set<string>();
function uniqueId(id: string) {
  assert.ok(id && !seenIds.has(id), `Duplicate or missing question ID: ${id}`);
  seenIds.add(id);
}
function oneAnswer(id: string, options: readonly string[], answerIndex: number) {
  uniqueId(id);
  assert.equal(options.length, 4, `${id}: expected four options`);
  assert.ok(Number.isInteger(answerIndex) && answerIndex >= 0 && answerIndex < options.length, `${id}: invalid answer index`);
  assert.equal(new Set(options.map(option => option.trim().toLowerCase())).size, 4, `${id}: duplicate choices`);
  assert.ok(options.every(option => option.trim()), `${id}: empty choice`);
}

for (const bank of [INFERENCE_ISLAND_QUESTIONS, WORD_MEANING_WOODS_QUESTIONS, SUMMIT_SUMMARISER_QUESTIONS,
  AUTHOR_INTENT_QUESTIONS, TENSE_TRIALS_QUESTIONS, SENTENCE_SURGERY_QUESTIONS,
  CLAUSE_CRUSHER_QUESTIONS, WORD_CLASS_WARS_QUESTIONS, SPELLBOUND_FORGE_QUESTIONS]) {
  assert.ok(bank.length >= 2);
  for (const question of bank) oneAnswer(question.id, question.choices, question.answerIndex);
}
for (const bank of [COMPARE_CONTRAST_CANYON_QUESTIONS, VOICE_SWITCH_VAULT_QUESTIONS, COHESION_CONNECTOR_QUESTIONS]) {
  assert.ok(bank.length >= 2);
  for (const question of bank) oneAnswer(question.id, question.options, question.correctAnswerIndex);
}
for (const bank of [GRAMMAR_GAUNTLET_QUESTIONS, FORMAL_FIXER_QUESTIONS]) {
  for (const question of bank) {
    oneAnswer(question.id, question.replacements, 'correctReplacementIndex' in question ? question.correctReplacementIndex : question.correctAnswerIndex);
    const wrongWord = 'wrongWord' in question ? question.wrongWord : question.informalPhrase;
    assert.ok(question.sentence.includes(wrongWord), `${question.id}: replacement target missing from sentence`);
  }
}
for (const bank of [PUNCTUATION_PANIC_QUESTIONS, PUNCTUATION_MASTERY_QUESTIONS]) {
  for (const question of bank) {
    uniqueId(question.id);
    const slots = question.parts.filter(part => typeof part !== 'string');
    assert.ok(slots.length >= 1, `${question.id}: no punctuation slots`);
    for (const slot of slots) assert.equal(slot.options.filter(option => option === slot.correct).length, 1, `${question.id}: slot ${slot.id} needs one correct option`);
  }
}
for (const question of EVIDENCE_HUNTER_QUESTIONS) {
  uniqueId(question.id);
  assert.ok(question.answerIndices.length > 0);
  assert.equal(new Set(question.answerIndices).size, question.answerIndices.length);
  assert.ok(question.answerIndices.every(index => index >= 0 && index < question.sentences.length));
}
for (const question of STORY_SEQUENCER_QUESTIONS) {
  uniqueId(question.id);
  assert.ok(question.passageText.trim());
  assert.equal(new Set(question.correctOrder).size, 4);
}
for (const question of FACT_OR_FICTION_FORGE_QUESTIONS) {
  uniqueId(question.id);
  assert.ok(question.answerIndex === 0 || question.answerIndex === 1);
  if (question.mode === 'true_false') assert.ok(question.context?.trim(), `${question.id}: true/false needs readable evidence`);
}
for (const question of NOUN_PHRASE_BUILDER_QUESTIONS) {
  uniqueId(question.id);
  assert.deepEqual([...question.modifiers].sort(), [...question.correctSequence].sort());
  assert.ok(!buildExpandedNounPhrase(question.base, question.correctSequence).includes('___'));
}
assert.equal(buildExpandedNounPhrase('The ___ dog', ['small', 'brown', 'with muddy paws']), 'The small brown dog with muddy paws');
assert.ok(TEXT_DETECTIVE_LEVELS.length >= 3);
for (const level of TEXT_DETECTIVE_LEVELS) {
  assert.ok(level.passageText.trim() && level.questions.length >= 1);
  for (const question of level.questions) oneAnswer(question.id, question.options, question.correctAnswerIndex);
}
assert.equal(READING_PAPER_PASSAGES.length, 3);
assert.ok(READING_PAPER_QUESTIONS.length >= 15 && READING_PAPER_QUESTIONS.length <= 20);
for (const question of READING_PAPER_QUESTIONS) {
  uniqueId(question.id);
  assert.ok(READING_PAPER_PASSAGES[question.passageIndex]?.text);
  if (question.type === 'mcq') {
    assert.equal(question.choices.length, 4);
    assert.ok(question.answerIndex >= 0 && question.answerIndex < 4);
  } else if (question.type === 'evidence') {
    assert.ok(question.answerIndices.length > 0 && question.answerIndices.every(index => index >= 0 && index < question.sentences.length));
  } else assert.ok(question.answers.length > 0);
}
console.log(`PASS ${seenIds.size} English questions, three reading passages and valid answer data`);
