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
  base: string; // e.g. "The ___ dog"
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
    statement: 'Zara arrives at the library on Monday morning.',
    mode: 'true_false',
    answerIndex: 0,
    difficulty: 1,
  },
  {
    id: 'fof-004',
    prompt: 'True or false',
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
];

export const FORMAL_FIXER_QUESTIONS: FormalFixerQuestion[] = [
  {
    id: 'ff-001',
    prompt: 'Formal language',
    sentence: "I'm gonna go to the shop.",
    informalPhrase: "gonna",
    replacements: ['going to', 'wanna', 'gotta', 'kinda'],
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
];
