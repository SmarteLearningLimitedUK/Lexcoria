import { MiniGameType } from '../../../types';
import {
  AUTHOR_INTENT_QUESTIONS,
  EVIDENCE_HUNTER_PASSAGE,
  EVIDENCE_HUNTER_QUESTIONS,
  INFERENCE_ISLAND_PASSAGE,
  INFERENCE_ISLAND_QUESTIONS,
  SUMMIT_SUMMARISER_PASSAGE,
  SUMMIT_SUMMARISER_QUESTIONS,
} from './satsSpec';

export type ComprehensionPassageId =
  | 'moonwell'
  | 'harbour_letter'
  | 'tom_gate'
  | 'storm_house'
  | 'intent_arena'
  | 'summary_snippets';

export type ComprehensionPassage = {
  id: ComprehensionPassageId;
  title: string;
  pages: string[];
  chunks: string[];
};

export type ReadingQuestion = {
  id: string;
  prompt: string;
  question: string;
  choices: string[];
  answerIndex: number;
};

export type EvidenceHighlightQuestion = {
  id: string;
  prompt: string;
  question: string;
  sentences: string[];
  answerIndices: number[];
};

export type EvidenceChainQuestion = {
  id: string;
  prompt: string;
  question: string;
  answerChoices: string[];
  answerIndex: number;
  evidenceChoices: string[];
  evidenceIndex: number;
  reasonChoices: string[];
  reasonIndex: number;
};

const PASSAGES: Record<ComprehensionPassageId, ComprehensionPassage> = {
  moonwell: {
    id: 'moonwell',
    title: 'The Moonwell',
    pages: [
      [
        'At dawn, Lina reached the Moonwell. The air smelled of wet stone, and the water shimmered like silver.',
        'She had been told the well could reveal a true path, but only to travellers who arrived with honest intentions.',
        'Lina knelt and whispered her question. The surface rippled, then calmed, showing a narrow trail through the forest.',
        'Before she left, she noticed fresh footprints circling the well—someone else had been there, and not long ago.',
      ].join('\n'),
    ],
    chunks: [
      'At dawn, Lina reached the Moonwell. The air smelled of wet stone, and the water shimmered like silver.',
      'She had been told the well could reveal a true path, but only to travellers who arrived with honest intentions.',
      'Lina knelt and whispered her question. The surface rippled, then calmed, showing a narrow trail through the forest.',
      'Before she left, she noticed fresh footprints circling the well—someone else had been there, and not long ago.',
    ],
  },
  harbour_letter: {
    id: 'harbour_letter',
    title: 'A Letter at the Harbour',
    pages: [
      [
        'When the tide pulled back, a sealed bottle rocked against the harbour steps.',
        'Milo fished it out and found a letter inside, written in careful, looping handwriting.',
        '"If you are reading this," it began, "then the storm has already taken my ship beyond the cliffs."',
        'The writer asked the finder to deliver a small map to the lighthouse keeper and warned them not to share it with strangers.',
      ].join('\n'),
    ],
    chunks: [
      'When the tide pulled back, a sealed bottle rocked against the harbour steps.',
      'Milo fished it out and found a letter inside, written in careful, looping handwriting.',
      '"If you are reading this," it began, "then the storm has already taken my ship beyond the cliffs."',
      'The writer asked the finder to deliver a small map to the lighthouse keeper and warned them not to share it with strangers.',
    ],
  },
  tom_gate: {
    id: 'tom_gate',
    title: INFERENCE_ISLAND_PASSAGE.title,
    pages: [INFERENCE_ISLAND_PASSAGE.text],
    chunks: INFERENCE_ISLAND_PASSAGE.sentences,
  },
  storm_house: {
    id: 'storm_house',
    title: EVIDENCE_HUNTER_PASSAGE.title,
    pages: [EVIDENCE_HUNTER_PASSAGE.text],
    chunks: EVIDENCE_HUNTER_PASSAGE.sentences,
  },
  intent_arena: {
    id: 'intent_arena',
    title: 'Language Choices',
    pages: [
      [
        'The tree branch crashed to the ground.',
        'Outside, the sky looked angry, as if it wanted to shout.',
      ].join('\n'),
    ],
    chunks: [
      'The tree branch crashed to the ground.',
      'Outside, the sky looked angry, as if it wanted to shout.',
    ],
  },
  summary_snippets: {
    id: 'summary_snippets',
    title: SUMMIT_SUMMARISER_PASSAGE.title,
    pages: [SUMMIT_SUMMARISER_PASSAGE.text],
    chunks: [],
  },
};

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

const pickPassage = (levelId: number): ComprehensionPassage => {
  const ids: ComprehensionPassageId[] = ['moonwell', 'harbour_letter'];
  return PASSAGES[ids[Math.abs(levelId) % ids.length]];
};

export const getRetrievalRapidsRun = (levelId: number): { passage: ComprehensionPassage; questions: ReadingQuestion[] } => {
  const passage = pickPassage(levelId);
  const base: ReadingQuestion[] = passage.id === 'moonwell'
    ? [
      {
        id: 'rr-mw-1',
        prompt: 'Retrieval',
        question: 'What time of day does Lina reach the Moonwell?',
        choices: ['At dawn', 'At midnight', 'At lunchtime', 'At dusk'],
        answerIndex: 0,
      },
      {
        id: 'rr-mw-2',
        prompt: 'Retrieval',
        question: 'What does Lina notice before she leaves?',
        choices: ['Fresh footprints', 'A broken sword', 'A singing bird', 'A locked chest'],
        answerIndex: 0,
      },
      {
        id: 'rr-mw-3',
        prompt: 'Retrieval',
        question: 'What does the well show on its surface?',
        choices: ['A narrow trail through the forest', 'A storm over the sea', 'A hidden cave', 'A wide road to the city'],
        answerIndex: 0,
      },
      {
        id: 'rr-mw-4',
        prompt: 'Retrieval',
        question: 'What must travellers have for the well to reveal a true path?',
        choices: ['Honest intentions', 'A golden key', 'A loud voice', 'A magic coin'],
        answerIndex: 0,
      },
    ]
    : [
      {
        id: 'rr-hl-1',
        prompt: 'Retrieval',
        question: 'Where is the bottle found?',
        choices: ['Against the harbour steps', 'Under a tree', 'Inside a cave', 'On a mountain path'],
        answerIndex: 0,
      },
      {
        id: 'rr-hl-2',
        prompt: 'Retrieval',
        question: 'What is inside the bottle?',
        choices: ['A letter', 'A ring', 'A compass', 'A key'],
        answerIndex: 0,
      },
      {
        id: 'rr-hl-3',
        prompt: 'Retrieval',
        question: 'Who should receive the small map?',
        choices: ['The lighthouse keeper', 'The mayor', 'A stranger', 'The ship captain'],
        answerIndex: 0,
      },
      {
        id: 'rr-hl-4',
        prompt: 'Retrieval',
        question: 'What warning does the writer give?',
        choices: ['Do not share it with strangers', 'Do not open the bottle', 'Do not go to the harbour', 'Do not read the letter twice'],
        answerIndex: 0,
      },
    ];

  return { passage, questions: rotate(base, Math.max(0, levelId - 1)).slice(0, 4) };
};

export const getInferenceIsleRun = (levelId: number): { passage: ComprehensionPassage; questions: ReadingQuestion[] } => {
  const passage = PASSAGES.tom_gate;
  const base: ReadingQuestion[] = INFERENCE_ISLAND_QUESTIONS.map((question) => ({
    id: question.id,
    prompt: question.prompt,
    question: question.question,
    choices: question.choices,
    answerIndex: question.answerIndex,
  }));

  return { passage, questions: rotate(base, Math.max(0, levelId - 1)).slice(0, 4) };
};

export const getEvidenceExplorerRun = (levelId: number): { passage: ComprehensionPassage; questions: ReadingQuestion[] } => {
  const passage = pickPassage(levelId);
  const base: ReadingQuestion[] = passage.id === 'moonwell'
    ? [
      {
        id: 'ev-mw-1',
        prompt: 'Evidence',
        question: 'Which line best shows the well can reveal a path?',
        choices: [
          passage.chunks[2],
          passage.chunks[0],
          passage.chunks[3],
          passage.chunks[1],
        ],
        answerIndex: 0,
      },
      {
        id: 'ev-mw-2',
        prompt: 'Evidence',
        question: 'Which line best shows someone else was there recently?',
        choices: [
          passage.chunks[3],
          passage.chunks[1],
          passage.chunks[0],
          passage.chunks[2],
        ],
        answerIndex: 0,
      },
    ]
    : [
      {
        id: 'ev-hl-1',
        prompt: 'Evidence',
        question: 'Which line best shows the letter warns about strangers?',
        choices: [
          passage.chunks[3],
          passage.chunks[0],
          passage.chunks[1],
          passage.chunks[2],
        ],
        answerIndex: 0,
      },
      {
        id: 'ev-hl-2',
        prompt: 'Evidence',
        question: 'Which line best shows the ship has been taken beyond the cliffs?',
        choices: [
          passage.chunks[2],
          passage.chunks[0],
          passage.chunks[1],
          passage.chunks[3],
        ],
        answerIndex: 0,
      },
    ];

  return { passage, questions: base };
};

export const getSequenceStreamRun = (levelId: number): { passage: ComprehensionPassage; questions: ReadingQuestion[] } => {
  const passage = pickPassage(levelId);
  const base: ReadingQuestion[] = passage.id === 'moonwell'
    ? [
      {
        id: 'seq-mw-1',
        prompt: 'Sequence',
        question: 'Which order matches the passage?',
        choices: [
          'Lina arrives → she whispers her question → the well shows a trail → she notices footprints',
          'Lina notices footprints → the well shows a trail → she arrives → she whispers her question',
          'The well shows a trail → Lina arrives → she notices footprints → she whispers her question',
          'Lina whispers her question → she arrives → she notices footprints → the well shows a trail',
        ],
        answerIndex: 0,
      },
    ]
    : [
      {
        id: 'seq-hl-1',
        prompt: 'Sequence',
        question: 'Which order matches the passage?',
        choices: [
          'The tide pulls back → Milo finds the bottle → he reads the letter → the writer asks for the map to be delivered',
          'Milo reads the letter → the tide pulls back → the writer asks for the map → Milo finds the bottle',
          'The writer asks for the map → Milo finds the bottle → the tide pulls back → he reads the letter',
          'Milo finds the bottle → the writer asks for the map → the tide pulls back → he reads the letter',
        ],
        answerIndex: 0,
      },
    ];

  return { passage, questions: base };
};

export const getAuthorIntentRun = (levelId: number): { passage: ComprehensionPassage; questions: ReadingQuestion[] } => {
  const passage = PASSAGES.intent_arena;
  const base: ReadingQuestion[] = AUTHOR_INTENT_QUESTIONS.map((question) => ({
    id: question.id,
    prompt: question.prompt,
    question: question.question,
    choices: question.choices,
    answerIndex: question.answerIndex,
  }));

  return { passage, questions: rotate(base, Math.max(0, levelId - 1)).slice(0, 2) };
};

export const getSummarySelectRun = (levelId: number): { passage: ComprehensionPassage; questions: ReadingQuestion[] } => {
  const passage = PASSAGES.summary_snippets;
  const base: ReadingQuestion[] = SUMMIT_SUMMARISER_QUESTIONS.map((question) => ({
    id: question.id,
    prompt: question.prompt,
    question: question.question,
    choices: question.choices,
    answerIndex: question.answerIndex,
  }));

  return { passage, questions: rotate(base, Math.max(0, levelId - 1)).slice(0, 2) };
};

export const getPassageQuestRun = (levelId: number): { passage: ComprehensionPassage; questions: ReadingQuestion[] } => {
  const passage = pickPassage(levelId);
  const base: ReadingQuestion[] = passage.id === 'moonwell'
    ? [
      {
        id: 'pq-mw-1',
        prompt: 'Passage quest',
        question: 'Where does Lina go?',
        choices: ['The Moonwell', 'The harbour', 'The castle', 'The mountain'],
        answerIndex: 0,
      },
      {
        id: 'pq-mw-2',
        prompt: 'Passage quest',
        question: 'What condition is mentioned for revealing a true path?',
        choices: ['Honest intentions', 'A silver coin', 'A loud voice', 'A secret password'],
        answerIndex: 0,
      },
      {
        id: 'pq-mw-3',
        prompt: 'Passage quest',
        question: 'What does Lina see on the surface of the well?',
        choices: ['A narrow trail', 'A storm', 'A cave', 'A ship'],
        answerIndex: 0,
      },
      {
        id: 'pq-mw-4',
        prompt: 'Passage quest',
        question: 'What detail hints at a mystery?',
        choices: ['Fresh footprints circling the well', 'The smell of wet stone', 'The colour silver', 'The time dawn'],
        answerIndex: 0,
      },
      {
        id: 'pq-mw-5',
        prompt: 'Passage quest',
        question: 'Why might Lina be careful after seeing the footprints?',
        choices: ['Someone else may be nearby', 'The well is broken', 'The forest is empty', 'The path is blocked forever'],
        answerIndex: 0,
      },
    ]
    : [
      {
        id: 'pq-hl-1',
        prompt: 'Passage quest',
        question: 'What does Milo find in the bottle?',
        choices: ['A letter', 'A key', 'A gem', 'A coin'],
        answerIndex: 0,
      },
      {
        id: 'pq-hl-2',
        prompt: 'Passage quest',
        question: 'What has happened to the ship?',
        choices: ['A storm has taken it beyond the cliffs', 'It is repaired', 'It is anchored safely', 'It is hidden in a cave'],
        answerIndex: 0,
      },
      {
        id: 'pq-hl-3',
        prompt: 'Passage quest',
        question: 'Who should Milo deliver the map to?',
        choices: ['The lighthouse keeper', 'The mayor', 'A stranger', 'The market seller'],
        answerIndex: 0,
      },
      {
        id: 'pq-hl-4',
        prompt: 'Passage quest',
        question: 'Why is Milo told not to share the map?',
        choices: ['It may be secret or important', 'Maps are illegal', 'The harbour is closed', 'The letter is a joke'],
        answerIndex: 0,
      },
      {
        id: 'pq-hl-5',
        prompt: 'Passage quest',
        question: 'Which detail suggests the writer was careful?',
        choices: ['The letter is written in careful, looping handwriting', 'The bottle is glass', 'The tide pulls back', 'The steps are stone'],
        answerIndex: 0,
      },
    ];

  return { passage, questions: base.slice(0, 5) };
};

export const getEvidenceHighlightRun = (levelId: number): { passage: ComprehensionPassage; questions: EvidenceHighlightQuestion[] } => {
  const passage = PASSAGES.storm_house;
  const base: EvidenceHighlightQuestion[] = EVIDENCE_HUNTER_QUESTIONS.map((question) => ({
    id: question.id,
    prompt: question.prompt,
    question: question.question,
    sentences: question.sentences,
    answerIndices: question.answerIndices,
  }));

  return { passage, questions: rotate(base, Math.max(0, levelId - 1)).slice(0, 3) };
};

export const getEvidenceChainRun = (levelId: number): { passage: ComprehensionPassage; questions: EvidenceChainQuestion[] } => {
  const passage = pickPassage(levelId);
  const base: EvidenceChainQuestion[] = passage.id === 'moonwell'
    ? [
      {
        id: 'ec-mw-1',
        prompt: 'Evidence chain',
        question: 'Why might Lina be careful when she leaves?',
        answerChoices: [
          'Someone else may be nearby',
          'The well is empty forever',
          'The forest is gone',
          'The water is poisonous',
        ],
        answerIndex: 0,
        evidenceChoices: passage.chunks,
        evidenceIndex: 3,
        reasonChoices: [
          'Fresh footprints suggest someone visited recently.',
          'The water is silver, so it is dangerous.',
          'Dawn means everyone is asleep.',
          'Wet stone makes people run.',
        ],
        reasonIndex: 0,
      },
    ]
    : [
      {
        id: 'ec-hl-1',
        prompt: 'Evidence chain',
        question: 'Why does the writer warn about strangers?',
        answerChoices: [
          'The map may be secret or important',
          'The harbour is closed',
          'The bottle is fake',
          'The lighthouse keeper is angry',
        ],
        answerIndex: 0,
        evidenceChoices: passage.chunks,
        evidenceIndex: 3,
        reasonChoices: [
          'The letter says not to share it with strangers.',
          'The tide pulls back, so strangers appear.',
          'Looping handwriting is a secret code.',
          'A bottle always means danger.',
        ],
        reasonIndex: 0,
      },
    ];

  return { passage, questions: base };
};

export const isComprehensionGameType = (gameType: MiniGameType): boolean => (
  gameType === 'RETRIEVAL_RAPIDS'
  || gameType === 'INFERENCE_ISLE'
  || gameType === 'EVIDENCE_EXPLORER'
  || gameType === 'SEQUENCE_STREAM'
  || gameType === 'AUTHOR_INTENT'
  || gameType === 'SUMMARY_SELECT'
  || gameType === 'PASSAGE_QUEST'
  || gameType === 'EVIDENCE_HIGHLIGHT'
  || gameType === 'EVIDENCE_CHAIN'
);
