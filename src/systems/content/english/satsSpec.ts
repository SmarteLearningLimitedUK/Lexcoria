import { READING_PAPER_PASSAGES, READING_PAPER_QUESTIONS } from './readingPaper';
import type { ReadingPaperQuestion } from './readingPaper';

export type Difficulty = 1 | 2 | 3;

export type McqQuestion = {
  id: string;
  prompt: string;
  question: string;
  choices: string[];
  answerIndex: number;
  difficulty: Difficulty;
};

export type EvidenceMultiSelectQuestion = {
  id: string;
  prompt: string;
  question: string;
  sentences: string[];
  answerIndices: number[];
  difficulty: Difficulty;
};

export type ReplaceWordQuestion = {
  id: string;
  prompt: string;
  sentence: string;
  wrongWord: string;
  replacements: string[];
  correctReplacementIndex: number;
  difficulty: Difficulty;
};

export type PunctuationSlot = {
  id: string;
  options: string[];
  correct: string;
};

export type PunctuationBuildQuestion = {
  id: string;
  prompt: string;
  parts: Array<string | PunctuationSlot>;
  difficulty: Difficulty;
};

export type ReadingPassage = {
  title: string;
  text: string;
  sentences: string[];
};

export type TextDetectiveSkillTag =
  | 'retrieval'
  | 'sequence'
  | 'vocabulary-in-context'
  | 'evidence'
  | 'literal-comprehension';

export type TextDetectiveDifficulty = 'easy' | 'medium' | 'hard';

export type TextDetectiveQuestion = {
  id: string;
  questionText: string;
  options: [string, string, string, string];
  correctAnswerIndex: 0 | 1 | 2 | 3;
  skillTag: TextDetectiveSkillTag;
  difficulty: TextDetectiveDifficulty;
};

export type TextDetectiveLevel = {
  passageTitle: string;
  passageText: string;
  questions: TextDetectiveQuestion[];
};

export type StorySequencerQuestion = {
  id: string;
  passageTitle: string;
  passageText: string;
  prompt: string;
  questionText: string;
  events: [string, string, string, string];
  correctOrder: [0 | 1 | 2 | 3, 0 | 1 | 2 | 3, 0 | 1 | 2 | 3, 0 | 1 | 2 | 3];
  difficulty: Difficulty;
};

export type FactOrFictionMode = 'fact_opinion' | 'true_false';

export type FactOrFictionQuestion = {
  id: string;
  prompt: string;
  statement: string;
  context?: string;
  mode: FactOrFictionMode;
  answerIndex: 0 | 1;
  difficulty: Difficulty;
};

export type CompareContrastQuestion = {
  id: string;
  prompt: string;
  extractA: string;
  extractB: string;
  questionText: string;
  options: [string, string, string, string];
  correctAnswerIndex: 0 | 1 | 2 | 3;
  difficulty: Difficulty;
};

export type NounPhraseBuilderQuestion = {
  id: string;
  prompt: string;
  base: string;
  modifiers: [string, string, string];
  correctSequence: [string, string, string];
  difficulty: Difficulty;
};

export type VoiceSwitchQuestion = {
  id: string;
  prompt: string;
  sentence: string;
  options: [string, string, string, string];
  correctAnswerIndex: 0 | 1 | 2 | 3;
  difficulty: Difficulty;
};

export type FormalFixerQuestion = {
  id: string;
  prompt: string;
  sentence: string;
  informalPhrase: string;
  replacements: [string, string, string, string];
  correctAnswerIndex: 0 | 1 | 2 | 3;
  difficulty: Difficulty;
};

export type CohesionConnectorQuestion = {
  id: string;
  prompt: string;
  sentence: string;
  options: [string, string, string, string];
  correctAnswerIndex: 0 | 1 | 2 | 3;
  difficulty: Difficulty;
};

export const INFERENCE_ISLAND_PASSAGE: ReadingPassage = {
  title: 'Tom at the Gate',
  text: [
    'Tom stood at the gate and stared at the house beyond.',
    'He could hear voices inside, but they seemed far away.',
    'He took a deep breath and held his words in his throat.',
    'When he finally spoke, his shoulders dropped as if a heavy bag had slipped to the ground.',
  ].join('\n'),
  sentences: [
    'Tom stood at the gate and stared at the house beyond.',
    'He could hear voices inside, but they seemed far away.',
    'He took a deep breath and held his words in his throat.',
    'When he finally spoke, his shoulders dropped as if a heavy bag had slipped to the ground.',
  ],
};

export const INFERENCE_ISLAND_QUESTIONS: McqQuestion[] = [
  {
    id: 'inf-001',
    prompt: 'Inference',
    question: 'Why does Tom pause before speaking?',
    choices: ['He forgot his words', 'He is nervous', 'He is tired', 'He is bored'],
    answerIndex: 1,
    difficulty: 2,
  },
  {
    id: 'inf-002',
    prompt: 'Inference',
    question: 'What do the distant voices suggest about Tom?',
    choices: ['He is distracted by his thoughts', 'He has lost his hearing', 'He is standing in an empty street', 'He is listening to music'],
    answerIndex: 0,
    difficulty: 2,
  },
  {
    id: 'inf-003',
    prompt: 'Inference',
    question: 'How does the character feel at the end?',
    choices: ['Relieved', 'Angry', 'Excited', 'Confused'],
    answerIndex: 0,
    difficulty: 1,
  },
  {
    id: 'inf-004',
    prompt: 'Inference',
    question: 'Which detail best suggests Tom feels relieved after speaking?',
    choices: ['His shoulders dropped', 'He stood at the gate', 'He heard voices inside', 'He looked at the house'],
    answerIndex: 0,
    difficulty: 2,
  },
];

export const EVIDENCE_HUNTER_PASSAGE: ReadingPassage = {
  title: 'Storm at the House',
  text: [
    'The wind howled louder than before.',
    'Rain battered the windows.',
    'Not a sound could be heard beyond the roaring storm.',
    'His hands trembled.',
    'He stepped back slowly.',
  ].join('\n'),
  sentences: [
    'The wind howled louder than before',
    'Rain battered the windows',
    'Not a sound could be heard',
    'His hands trembled',
    'He stepped back slowly',
  ],
};

export const EVIDENCE_HUNTER_QUESTIONS: EvidenceMultiSelectQuestion[] = [
  {
    id: 'ev-001',
    prompt: 'Evidence',
    question: 'Find evidence that the weather is worsening.',
    sentences: EVIDENCE_HUNTER_PASSAGE.sentences,
    answerIndices: [0, 1],
    difficulty: 1,
  },
  {
    id: 'ev-002',
    prompt: 'Evidence',
    question: 'Find evidence the character is scared.',
    sentences: EVIDENCE_HUNTER_PASSAGE.sentences,
    answerIndices: [3, 4],
    difficulty: 2,
  },
  {
    id: 'ev-003',
    prompt: 'Evidence',
    question: 'Find evidence of silence.',
    sentences: EVIDENCE_HUNTER_PASSAGE.sentences,
    answerIndices: [2],
    difficulty: 1,
  },
];

export const WORD_MEANING_WOODS_QUESTIONS: McqQuestion[] = [
  {
    id: 'wm-001',
    prompt: 'Vocabulary',
    question: 'In the sentence “The path was narrow.” what does “narrow” mean?',
    choices: ['Wide', 'Thin', 'Bright', 'Long'],
    answerIndex: 1,
    difficulty: 1,
  },
  {
    id: 'wm-002',
    prompt: 'Vocabulary',
    question: 'In the sentence “She was exhausted.” what does “exhausted” mean?',
    choices: ['Happy', 'Tired', 'Angry', 'Fast'],
    answerIndex: 1,
    difficulty: 1,
  },
  {
    id: 'wm-003',
    prompt: 'Vocabulary',
    question: 'In the sentence “The room was gloomy.” what does “gloomy” mean?',
    choices: ['Bright', 'Dark and dull', 'Clean', 'Loud'],
    answerIndex: 1,
    difficulty: 2,
  },
  { id: 'wm-004', prompt: 'Vocabulary in context', question: 'The boat was “adrift” after the rope snapped. What does “adrift” mean?', choices: ['Moving without control', 'Tied to the quay', 'Full of people', 'Hidden under water'], answerIndex: 0, difficulty: 2 },
  { id: 'wm-005', prompt: 'Vocabulary in context', question: 'Mina “glanced” at the clock. What does “glanced” mean?', choices: ['Looked quickly', 'Stared for an hour', 'Wrote a number', 'Covered it up'], answerIndex: 0, difficulty: 1 },
];

export const SUMMIT_SUMMARISER_PASSAGE: ReadingPassage = {
  title: 'Two Woodland Journeys',
  text: [
    'Paragraph 1:',
    'Eli left the path to follow a flash of blue between the trees. Soon he could no longer see the trail. He called out, and a walker who knew the wood guided him back to the gate.',
    '',
    'Paragraph 2:',
    'The next morning, Eli returned with a map. He followed the marked route beneath tall pines, crossed a wooden bridge and reached the far edge of the forest before lunch.',
  ].join('\n'),
  sentences: [],
};

export const SUMMIT_SUMMARISER_QUESTIONS: McqQuestion[] = [
  {
    id: 'sum-001',
    prompt: 'Summary',
    question: 'Which best summarises paragraph 1?',
    choices: [
      'A boy gets lost and finds help',
      'A boy eats lunch',
      'A storm begins',
      'A dog runs away',
    ],
    answerIndex: 0,
    difficulty: 1,
  },
  {
    id: 'sum-002',
    prompt: 'Summary',
    question: 'Which best summarises paragraph 2?',
    choices: [
      'A journey through a forest',
      'A school day',
      'A birthday party',
      'A football match',
    ],
    answerIndex: 0,
    difficulty: 1,
  },
];

export const AUTHOR_INTENT_QUESTIONS: McqQuestion[] = [
  {
    id: 'ai-001',
    prompt: "Author's intent",
    question: 'Why use “crashed” instead of “fell”?',
    choices: ['To show speed and force', 'To show calmness', 'To confuse reader', 'No reason'],
    answerIndex: 0,
    difficulty: 2,
  },
  {
    id: 'ai-002',
    prompt: "Author's intent",
    question: 'Why describe the sky as “angry”?',
    choices: ['To show emotion in weather', 'To show colour', 'To show time', 'To show size'],
    answerIndex: 0,
    difficulty: 2,
  },
  { id: 'ai-003', prompt: "Author's intent", question: 'Why might an author repeat “still” in “The lake was still. The trees were still.”?', choices: ['To emphasise the quiet', 'To show that it is morning', 'To explain how lakes form', 'To make the trees seem taller'], answerIndex: 0, difficulty: 3 },
  { id: 'ai-004', prompt: "Author's intent", question: 'What is the effect of “the leaves whispered” in a description?', choices: ['It makes the leaves seem almost human', 'It proves the leaves can speak', 'It shows that no wind is blowing', 'It tells us the leaves are blue'], answerIndex: 0, difficulty: 2 },
];

export const GRAMMAR_GAUNTLET_QUESTIONS: ReplaceWordQuestion[] = [
  {
    id: 'gg-001',
    prompt: 'Grammar',
    sentence: 'She go to school yesterday.',
    wrongWord: 'go',
    replacements: ['went', 'gone', 'going', 'goes'],
    correctReplacementIndex: 0,
    difficulty: 1,
  },
  {
    id: 'gg-002',
    prompt: 'Grammar',
    sentence: 'They was playing.',
    wrongWord: 'was',
    replacements: ['were', 'are', 'is', 'been'],
    correctReplacementIndex: 0,
    difficulty: 1,
  },
  {
    id: 'gg-003',
    prompt: 'Grammar',
    sentence: "He don't like it.",
    wrongWord: "don't",
    replacements: ["doesn't", "didn't", "don't", "does"],
    correctReplacementIndex: 0,
    difficulty: 2,
  },
  { id: 'gg-004', prompt: 'Subject–verb agreement', sentence: 'The boxes is beside the door.', wrongWord: 'is', replacements: ['are', 'was', 'be', 'am'], correctReplacementIndex: 0, difficulty: 2 },
  { id: 'gg-005', prompt: 'Standard English', sentence: 'We done our homework before tea.', wrongWord: 'done', replacements: ['did', 'does', 'doing', 'do'], correctReplacementIndex: 0, difficulty: 2 },
  { id: 'gg-006', prompt: 'Modal verbs', sentence: 'You musted wait for the signal.', wrongWord: 'musted', replacements: ['must', 'musting', 'musts', 'must have'], correctReplacementIndex: 0, difficulty: 3 },
];

export const TENSE_TRIALS_QUESTIONS: McqQuestion[] = [
  {
    id: 'tt-001',
    prompt: 'Tense',
    question: 'She ___ to the shop yesterday.',
    choices: ['go', 'goes', 'went', 'going'],
    answerIndex: 2,
    difficulty: 1,
  },
  {
    id: 'tt-002',
    prompt: 'Tense',
    question: 'They ___ football now.',
    choices: ['play', 'plays', 'are playing', 'played'],
    answerIndex: 2,
    difficulty: 2,
  },
  { id: 'tt-003', prompt: 'Present perfect', question: 'Choose the present perfect form: “I ___ my keys.”', choices: ['have lost', 'lost', 'am losing', 'lose'], answerIndex: 0, difficulty: 2 },
  { id: 'tt-004', prompt: 'Past progressive', question: 'Yesterday at noon, the children ___ in the garden.', choices: ['were playing', 'are playing', 'will play', 'have played'], answerIndex: 0, difficulty: 2 },
  { id: 'tt-005', prompt: 'Verb forms', question: 'By the time we arrived, the train ___.', choices: ['had left', 'leave', 'is leaving', 'will leave'], answerIndex: 0, difficulty: 3 },
];

export const PUNCTUATION_PANIC_QUESTIONS: PunctuationBuildQuestion[] = [
  {
    id: 'pp-001',
    prompt: 'Punctuation',
    parts: [
      { id: 'w', options: ['what', 'What'], correct: 'What' },
      ' is your name',
      { id: 'end', options: ['.', '?', '!'], correct: '?' },
    ],
    difficulty: 1,
  },
  {
    id: 'pp-002',
    prompt: 'Punctuation',
    parts: [
      { id: 'i', options: ['i', 'I'], correct: 'I' },
      ' went to ',
      { id: 'london', options: ['london', 'London'], correct: 'London' },
      { id: 'end', options: ['.', '?'], correct: '.' },
    ],
    difficulty: 1,
  },
  {
    id: 'pp-003',
    prompt: 'Punctuation',
    parts: [
      { id: 'its', options: ['its', "it's", "It's"], correct: "It's" },
      ' raining',
      { id: 'end', options: ['.', '!'], correct: '.' },
    ],
    difficulty: 2,
  },
  { id: 'pp-004', prompt: 'Plural possession', parts: ['The ', { id: 'dogs', options: ["dogs'", "dog's", 'dogs'], correct: "dogs'" }, ' bowls were empty', { id: 'end', options: ['.', '?'], correct: '.' }], difficulty: 3 },
  { id: 'pp-005', prompt: 'Speech punctuation', parts: [{ id: 'open', options: ['“', '‘', ''], correct: '“' }, 'Come here', { id: 'comma', options: [',', '.', ''], correct: ',' }, { id: 'close', options: ['”', '’', ''], correct: '”' }, ' called Mum', { id: 'end', options: ['.', '!'], correct: '.' }], difficulty: 3 },
  { id: 'pp-006', prompt: 'Fronted adverbial', parts: ['After lunch', { id: 'comma', options: [',', '.', ''], correct: ',' }, ' we walked home', { id: 'end', options: ['.', '?'], correct: '.' }], difficulty: 2 },
];

export const SENTENCE_SURGERY_QUESTIONS: McqQuestion[] = [
  {
    id: 'ss-001',
    prompt: 'Sentence surgery',
    question: '“Because it was late” is a sentence fragment. What should you do?',
    choices: ['Add main clause', 'Remove word', 'Add comma', 'Leave it'],
    answerIndex: 0,
    difficulty: 1,
  },
  {
    id: 'ss-002',
    prompt: 'Sentence surgery',
    question: '“I went home I was tired” is missing punctuation. What should you do?',
    choices: ['Add conjunction/comma', 'Remove word', 'Change tense', 'Leave it'],
    answerIndex: 0,
    difficulty: 2,
  },
  { id: 'ss-003', prompt: 'Sentence structure', question: 'Which change correctly punctuates “After the storm the streets were quiet”?', choices: ['Add a comma after “storm”', 'Add a comma after “streets”', 'Remove “the”', 'Add a question mark'], answerIndex: 0, difficulty: 2 },
  { id: 'ss-004', prompt: 'Sentence structure', question: 'Which is a complete sentence?', choices: ['The child who found the key opened the gate.', 'Because the child found the key.', 'Although the gate was open.', 'When the child reached the gate.'], answerIndex: 0, difficulty: 2 },
];

export const CLAUSE_CRUSHER_QUESTIONS: McqQuestion[] = [
  {
    id: 'cc-001',
    prompt: 'Clauses',
    question: 'In “I ran because I was late.” which part is the subordinate clause?',
    choices: ['I ran', 'because I was late', 'I was', 'late'],
    answerIndex: 1,
    difficulty: 2,
  },
  {
    id: 'cc-002',
    prompt: 'Conjunctions',
    question: 'Choose the best conjunction: “I stayed inside ___ it was raining.”',
    choices: ['but', 'because', 'and', 'so'],
    answerIndex: 1,
    difficulty: 1,
  },
  { id: 'cc-003', prompt: 'Relative clauses', question: 'In “The girl, who carried the lantern, led the way,” which words form the relative clause?', choices: ['who carried the lantern', 'The girl', 'led the way', 'the lantern'], answerIndex: 0, difficulty: 3 },
  { id: 'cc-004', prompt: 'Subordinating conjunctions', question: 'Which word best completes “___ the rain stopped, we went outside”?', choices: ['When', 'And', 'But', 'Or'], answerIndex: 0, difficulty: 2 },
];

export const WORD_CLASS_WARS_QUESTIONS: McqQuestion[] = [
  {
    id: 'wc-001',
    prompt: 'Word class',
    question: 'What word class is “Quickly”?',
    choices: ['Noun', 'Verb', 'Adverb', 'Adjective'],
    answerIndex: 2,
    difficulty: 1,
  },
  {
    id: 'wc-002',
    prompt: 'Word class',
    question: 'In “They run each morning”, what word class is “run”?',
    choices: ['Noun', 'Verb', 'Adverb', 'Adjective'],
    answerIndex: 1,
    difficulty: 1,
  },
  {
    id: 'wc-003',
    prompt: 'Word class',
    question: 'What word class is “Happy”?',
    choices: ['Noun', 'Verb', 'Adverb', 'Adjective'],
    answerIndex: 3,
    difficulty: 1,
  },
  {
    id: 'wc-004',
    prompt: 'Word class',
    question: 'In “The dog barked”, what word class is “dog”?',
    choices: ['Noun', 'Verb', 'Adverb', 'Adjective'],
    answerIndex: 0,
    difficulty: 1,
  },
  { id: 'wc-005', prompt: 'Word class', question: 'In “the blue kite”, what word class is “the”?', choices: ['Determiner', 'Verb', 'Adverb', 'Preposition'], answerIndex: 0, difficulty: 2 },
  { id: 'wc-006', prompt: 'Word class', question: 'In “the ball rolled under the chair”, what word class is “under”?', choices: ['Preposition', 'Noun', 'Adjective', 'Pronoun'], answerIndex: 0, difficulty: 2 },
  { id: 'wc-007', prompt: 'Word class', question: 'In “Lena took her coat”, what word class is “her”?', choices: ['Possessive determiner', 'Verb', 'Conjunction', 'Adverb'], answerIndex: 0, difficulty: 3 },
  { id: 'wc-008', prompt: 'Word class', question: 'In “I stayed because it rained”, what word class is “because”?', choices: ['Conjunction', 'Noun', 'Adjective', 'Determiner'], answerIndex: 0, difficulty: 2 },
];

export const SPELLBOUND_FORGE_QUESTIONS: McqQuestion[] = [
  {
    id: 'sf-spec-001',
    prompt: 'Spelling',
    question: 'Choose the correct spelling.',
    choices: ['recieve', 'receive', 'receeve', 'receve'],
    answerIndex: 1,
    difficulty: 2,
  },
  {
    id: 'sf-spec-002',
    prompt: 'Spelling',
    question: 'Choose the correct spelling.',
    choices: ['definately', 'definitely', 'definetly', 'definetely'],
    answerIndex: 1,
    difficulty: 2,
  },
  {
    id: 'sf-spec-003',
    prompt: 'Spelling',
    question: 'Choose the correct spelling.',
    choices: ['seperate', 'separate', 'separite', 'seperrate'],
    answerIndex: 1,
    difficulty: 2,
  },
  {
    id: 'sf-spec-004',
    prompt: 'Spelling',
    question: 'Choose the correct spelling.',
    choices: ['accomodate', 'accommodate', 'acommodate', 'accommadate'],
    answerIndex: 1,
    difficulty: 3,
  },
  { id: 'sf-spec-005', prompt: 'Spelling', question: 'Choose the correct spelling.', choices: ['necessary', 'neccessary', 'necesary', 'nessesary'], answerIndex: 0, difficulty: 3 },
  { id: 'sf-spec-006', prompt: 'Spelling', question: 'Choose the correct spelling.', choices: ['environment', 'enviroment', 'envirenment', 'environmant'], answerIndex: 0, difficulty: 3 },
  { id: 'sf-spec-007', prompt: 'Spelling', question: 'Choose the correct spelling.', choices: ['rhythm', 'rythm', 'rhythym', 'rhythem'], answerIndex: 0, difficulty: 3 },
  { id: 'sf-spec-008', prompt: 'Spelling', question: 'Choose the correct spelling.', choices: ['physical', 'phisical', 'physicle', 'fysical'], answerIndex: 0, difficulty: 3 },
  { id: 'sf-spec-009', prompt: 'Homophones', question: 'Which word completes “Please put the pencils in their ___”?', choices: ['stationery', 'stationary', 'stationaries', 'station'], answerIndex: 0, difficulty: 3 },
  { id: 'sf-spec-010', prompt: 'Suffixes', question: 'Which is the correct spelling of happy with the suffix -ly?', choices: ['happily', 'happyly', 'hapily', 'happiley'], answerIndex: 0, difficulty: 2 },
];

export const TEXT_DETECTIVE_LEVELS: TextDetectiveLevel[] = [
  {
    passageTitle: 'A Note in the Library',
    passageText: [
      'On Monday morning, Zara arrived at the town library before it opened.',
      'She waited beside the heavy wooden door until Mr Patel turned the key.',
      'Inside, the air smelled of paper and polish.',
      'Zara came to return a book and to look for a map of the old canal.',
      'When she reached the history shelf, she noticed a folded note tucked behind a red atlas.',
      "The note read: 'Meet me by the canal bridge at three o'clock.'",
      'Zara slipped the note into her pocket and decided not to tell anyone yet.',
    ].join('\n'),
    questions: [
      {
        id: 'td-001',
        questionText: 'When does Zara arrive at the library?',
        options: ['On Monday morning', 'On Saturday night', 'On Tuesday afternoon', 'On Sunday morning'],
        correctAnswerIndex: 0,
        skillTag: 'retrieval',
        difficulty: 'easy',
      },
      {
        id: 'td-002',
        questionText: 'Who turns the key to open the library?',
        options: ['Mr Patel', 'Zara', 'The mayor', 'A stranger'],
        correctAnswerIndex: 0,
        skillTag: 'retrieval',
        difficulty: 'easy',
      },
      {
        id: 'td-003',
        questionText: 'What is Zara looking for in the library?',
        options: ['A map of the old canal', 'A new comic book', 'A jar of polish', 'A clock'],
        correctAnswerIndex: 0,
        skillTag: 'literal-comprehension',
        difficulty: 'medium',
      },
      {
        id: 'td-004',
        questionText: 'What does Zara notice behind the red atlas?',
        options: ['A folded note', 'A gold coin', 'A torn photograph', 'A pencil'],
        correctAnswerIndex: 0,
        skillTag: 'retrieval',
        difficulty: 'easy',
      },
      {
        id: 'td-005',
        questionText: 'What time does the note say to meet?',
        options: ["Three o'clock", "Two o'clock", "Half past four", 'Midday'],
        correctAnswerIndex: 0,
        skillTag: 'retrieval',
        difficulty: 'easy',
      },
      {
        id: 'td-006',
        questionText: 'What happens first?',
        options: ['Zara arrives at the library', 'Mr Patel turns the key', 'Zara finds the note', 'Zara slips the note into her pocket'],
        correctAnswerIndex: 0,
        skillTag: 'sequence',
        difficulty: 'medium',
      },
      {
        id: 'td-007',
        questionText: 'In the passage, what does “tucked” mean?',
        options: ['Hidden', 'Shouted', 'Opened', 'Spilled'],
        correctAnswerIndex: 0,
        skillTag: 'vocabulary-in-context',
        difficulty: 'hard',
      },
      {
        id: 'td-008',
        questionText: 'Which phrase shows Zara puts the note into her pocket?',
        options: ['Zara slipped the note into her pocket', 'She waited beside the door', 'Inside, the air smelled of paper', 'Mr Patel turned the key'],
        correctAnswerIndex: 0,
        skillTag: 'evidence',
        difficulty: 'medium',
      },
    ],
  },
  ...READING_PAPER_PASSAGES.map((passage, passageIndex): TextDetectiveLevel => ({
    passageTitle: passage.title,
    passageText: passage.text,
    questions: READING_PAPER_QUESTIONS.filter((question): question is Extract<ReadingPaperQuestion, { type: 'mcq' }> => question.type === 'mcq'
      && question.passageIndex === passageIndex
      && !['inference', 'summary', 'author-choice'].includes(question.skillTag))
      .map(question => ({
        id: `td-${question.id}`,
        questionText: question.question,
        options: question.choices,
        correctAnswerIndex: question.answerIndex,
        skillTag: question.skillTag as TextDetectiveSkillTag,
        difficulty: question.marks === 1 ? 'easy' : question.marks === 2 ? 'medium' : 'hard',
      })),
  })),
];

export const STORY_SEQUENCER_QUESTIONS: StorySequencerQuestion[] = [
  {
    id: 'seq-001',
    passageTitle: 'Tom in the Hallway',
    passageText: [
      'Tom paused at the bottom of the stairs.',
      'A strange noise came from upstairs, so he listened carefully.',
      'He picked up the key from the table and held it tightly.',
      'Then he walked upstairs and opened the door at the top.',
    ].join('\n'),
    prompt: 'Sequence',
    questionText: 'Put these events in the order they happened.',
    events: ['Tom opened the door', 'Tom heard a noise', 'Tom walked upstairs', 'Tom picked up the key'],
    correctOrder: [1, 3, 2, 0],
    difficulty: 2,
  },
  { id: 'seq-002', passageTitle: 'The Broken Bridge', passageText: 'Nia noticed a missing plank in the bridge. She warned her friends to stop. They found a longer path beside the river. At last, they reached the campsite safely.', prompt: 'Sequence', questionText: 'Put the four events in the order they happened.', events: ['The group reached the campsite', 'Nia warned her friends', 'Nia noticed the missing plank', 'They found another path'], correctOrder: [2, 1, 3, 0], difficulty: 2 },
];

export const FACT_OR_FICTION_FORGE_QUESTIONS: FactOrFictionQuestion[] = [
  {
    id: 'fof-001',
    prompt: 'Fact or opinion',
    statement: 'The castle is the best building in the town.',
    mode: 'fact_opinion',
    answerIndex: 1,
    difficulty: 1,
  },
  {
    id: 'fof-002',
    prompt: 'Fact or opinion',
    statement: 'The castle was built in 1850.',
    mode: 'fact_opinion',
    answerIndex: 0,
    difficulty: 1,
  },
  {
    id: 'fof-003',
    prompt: 'True or false',
    context: 'On Monday morning, Zara arrived at the town library before it opened.',
    statement: 'Zara arrives at the library on Monday morning.',
    mode: 'true_false',
    answerIndex: 0,
    difficulty: 1,
  },
  {
    id: 'fof-004',
    prompt: 'True or false',
    context: 'Tom heard a strange noise upstairs. Then he picked up the key, walked upstairs and opened the door.',
    statement: 'Tom opens the door before he hears a noise.',
    mode: 'true_false',
    answerIndex: 1,
    difficulty: 2,
  },
];

export const COMPARE_CONTRAST_CANYON_QUESTIONS: CompareContrastQuestion[] = [
  {
    id: 'ccn-001',
    prompt: 'Compare & contrast',
    extractA: 'Character A stepped forward without hesitation and smiled at the crowd.',
    extractB: 'Character B stayed behind the curtain, whispering that they were too scared to go on.',
    questionText: 'How is Character A different from Character B?',
    options: ['A is brave, B is fearful', 'Both are brave', 'Both are quiet', 'A is younger'],
    correctAnswerIndex: 0,
    difficulty: 2,
  },
  {
    id: 'ccn-002',
    prompt: 'Compare & contrast',
    extractA: 'The classroom was bright, with sunlight pouring through the windows.',
    extractB: 'The corridor was dim, and the lamps flickered above the lockers.',
    questionText: 'What is different about the two settings?',
    options: ['One is bright and one is dim', 'Both are outdoors', 'Both are noisy', 'Both are empty'],
    correctAnswerIndex: 0,
    difficulty: 1,
  },
  { id: 'ccn-003', prompt: 'Compare & contrast', extractA: 'Asha kept the old map because its markings showed a safe route.', extractB: 'Ben chose the new map because its paths were easier to read.', questionText: 'How are Asha and Ben similar?', options: ['Both use maps to plan routes', 'Both prefer the old map', 'Neither can read a map', 'Both have finished'], correctAnswerIndex: 0, difficulty: 2 },
];

export const NOUN_PHRASE_BUILDER_QUESTIONS: NounPhraseBuilderQuestion[] = [
  {
    id: 'np-001',
    prompt: 'Noun phrase',
    base: 'The ___ dog',
    modifiers: ['small', 'brown', 'with muddy paws'],
    correctSequence: ['small', 'brown', 'with muddy paws'],
    difficulty: 2,
  },
  {
    id: 'np-002',
    prompt: 'Noun phrase',
    base: 'A ___ castle',
    modifiers: ['ancient', 'stone', 'on the hill'],
    correctSequence: ['ancient', 'stone', 'on the hill'],
    difficulty: 2,
  },
  { id: 'np-003', prompt: 'Expanded noun phrase', base: 'The ___ lantern', modifiers: ['flickering', 'brass', 'on the table'], correctSequence: ['flickering', 'brass', 'on the table'], difficulty: 3 },
  { id: 'np-004', prompt: 'Expanded noun phrase', base: 'A ___ path', modifiers: ['narrow', 'winding', 'through the woods'], correctSequence: ['narrow', 'winding', 'through the woods'], difficulty: 2 },
];

export const VOICE_SWITCH_VAULT_QUESTIONS: VoiceSwitchQuestion[] = [
  {
    id: 'vs-001',
    prompt: 'Voice',
    sentence: 'The cake was eaten by Tom.',
    options: ['Active', 'Passive', 'Both', 'Neither'],
    correctAnswerIndex: 1,
    difficulty: 2,
  },
  {
    id: 'vs-002',
    prompt: 'Voice',
    sentence: 'Tom ate the cake.',
    options: ['Active', 'Passive', 'Both', 'Neither'],
    correctAnswerIndex: 0,
    difficulty: 1,
  },
  { id: 'vs-003', prompt: 'Voice', sentence: 'The prize was collected by Mina.', options: ['Active', 'Passive', 'Both', 'Neither'], correctAnswerIndex: 1, difficulty: 2 },
  { id: 'vs-004', prompt: 'Voice', sentence: 'The volunteers planted new trees.', options: ['Active', 'Passive', 'Both', 'Neither'], correctAnswerIndex: 0, difficulty: 2 },
];

export const FORMAL_FIXER_QUESTIONS: FormalFixerQuestion[] = [
  {
    id: 'ff-001',
    prompt: 'Formal language',
    sentence: "I'm gonna go to the shop.",
    informalPhrase: "I'm gonna",
    replacements: ['I am going to', 'I wanna', 'I going to', 'I am go'],
    correctAnswerIndex: 0,
    difficulty: 1,
  },
  {
    id: 'ff-002',
    prompt: 'Formal language',
    sentence: "Can you gimme a hand, please?",
    informalPhrase: "gimme",
    replacements: ['give me', 'got me', 'gives me', 'given me'],
    correctAnswerIndex: 0,
    difficulty: 2,
  },
  { id: 'ff-003', prompt: 'Formal language', sentence: 'The results were a big deal.', informalPhrase: 'a big deal', replacements: ['significant', 'super cool', 'a laugh', 'no biggie'], correctAnswerIndex: 0, difficulty: 2 },
];

export const COHESION_CONNECTOR_QUESTIONS: CohesionConnectorQuestion[] = [
  {
    id: 'coh-001',
    prompt: 'Cohesion',
    sentence: 'Sarah picked up the book. ___ was heavy.',
    options: ['He', 'It', 'They', 'Them'],
    correctAnswerIndex: 1,
    difficulty: 1,
  },
  {
    id: 'coh-002',
    prompt: 'Cohesion',
    sentence: 'The rain fell all afternoon. ___, the match was cancelled.',
    options: ['However', 'Therefore', 'Meanwhile', 'Suddenly'],
    correctAnswerIndex: 1,
    difficulty: 2,
  },
  { id: 'coh-003', prompt: 'Cohesion', sentence: 'Maya lent Sam her notebook. ___ returned it the next day.', options: ['Sam', 'She', 'Maya', 'They'], correctAnswerIndex: 0, difficulty: 3 },
  { id: 'coh-004', prompt: 'Linking ideas', sentence: 'The route was steep. ___, the walkers continued.', options: ['Nevertheless', 'Therefore', 'For example', 'Because'], correctAnswerIndex: 0, difficulty: 3 },
];

export const PUNCTUATION_MASTERY_QUESTIONS: PunctuationBuildQuestion[] = [
  {
    id: 'pm-001',
    prompt: 'Punctuation (colon)',
    parts: [
      'I have three hobbies',
      { id: 'colon', options: [':', ';', '-', ','], correct: ':' },
      ' reading',
      { id: 'comma', options: [',', ';'], correct: ',' },
      ' writing and swimming',
      { id: 'end', options: ['.', '!'], correct: '.' },
    ],
    difficulty: 2,
  },
  {
    id: 'pm-002',
    prompt: 'Punctuation (semicolon)',
    parts: [
      'The storm was loud',
      { id: 'semi', options: [';', ':', ','], correct: ';' },
      ' the windows shook',
      { id: 'end', options: ['.', '!'], correct: '.' },
    ],
    difficulty: 3,
  },
  { id: 'pm-003', prompt: 'Parenthesis (brackets)', parts: ['The oak tree ', { id: 'open', options: ['(', '[', ','], correct: '(' }, 'which was over a century old', { id: 'close', options: [')', ']', ','], correct: ')' }, ' stood by the gate', { id: 'end', options: ['.', '?'], correct: '.' }], difficulty: 3 },
  { id: 'pm-004', prompt: 'Hyphens', parts: ['The ', { id: 'compound', options: ['well-known', 'well known', 'well,known'], correct: 'well-known' }, ' author visited the school', { id: 'end', options: ['.', '!'], correct: '.' }], difficulty: 3 },
];
