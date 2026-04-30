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
    question: 'What can you infer about the setting?',
    choices: ['It is noisy', 'It is peaceful', 'It is dangerous', 'It is empty'],
    answerIndex: 2,
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
    question: 'Why does she look over her shoulder?',
    choices: ['She heard something suspicious', 'She dropped something', 'She is stretching', 'She is bored'],
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
];

export const SUMMIT_SUMMARISER_PASSAGE: ReadingPassage = {
  title: 'Two Short Paragraphs',
  text: [
    'Paragraph 1:',
    'A boy gets lost and finds help.',
    '',
    'Paragraph 2:',
    'A journey through a forest.',
  ].join('\n'),
  sentences: [],
};

export const SUMMIT_SUMMARISER_QUESTIONS: McqQuestion[] = [
  {
    id: 'sum-001',
    prompt: 'Summary',
    question: 'Choose the best summary.',
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
    question: 'Choose the best summary.',
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
    question: 'What word class is “Run”?',
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
    question: 'What word class is “Dog”?',
    choices: ['Noun', 'Verb', 'Adverb', 'Adjective'],
    answerIndex: 0,
    difficulty: 1,
  },
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
];

