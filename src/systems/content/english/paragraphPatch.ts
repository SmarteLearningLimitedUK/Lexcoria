import { MiniGameType } from '../../../types';

export type ParagraphPatchQuestion = {
  id: string;
  gameType: Extract<MiniGameType, 'PARAGRAPH_PATCH'>;
  prompt: string;
  stem: string;
  choices: string[];
  answerIndex: number;
};

export const PARAGRAPH_PATCH_QUESTIONS: ParagraphPatchQuestion[] = [
  {
    id: 'pph-001',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best sentence to start a new paragraph.',
    stem: 'You are writing about a journey. You have finished describing the walk through the woods. What sentence starts a new paragraph about arriving at the harbour?',
    choices: [
      'We could hear the waves before we could see the boats.',
      'The trees were tall and the path was muddy.',
      'I packed my bag carefully before we left.',
      'We walked quietly so we would not be heard.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-002',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best sentence to end the paragraph.',
    stem: 'A paragraph explains how the heroes prepared. Which sentence best ends it?',
    choices: [
      'At last, everything was ready, and we stepped into the darkness.',
      'The dragon roared loudly in the distance.',
      'The harbour was bright and busy.',
      'We found a map under the stone.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-003',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best sentence to link two ideas.',
    stem: 'We wanted to leave early. The weather looked dangerous. Which sentence links these ideas best?',
    choices: [
      'However, the weather looked dangerous, so we hurried.',
      'The weather looked dangerous, and the dragon slept.',
      'The weather looked dangerous, because the gate opened.',
      'The weather looked dangerous; the treasure was hidden.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-004',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best topic sentence for the paragraph.',
    stem: 'The paragraph describes a storm and how it affected the journey. Which topic sentence fits best?',
    choices: [
      'The storm changed our plans in an instant.',
      'The wizard opened a book.',
      'The harbour was peaceful.',
      'The villagers sang songs.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-005',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best sentence to start a new paragraph.',
    stem: 'You have finished describing the battle. What sentence starts a new paragraph about the celebration?',
    choices: [
      'After the battle, the village filled with music and cheers.',
      'The dragon roared and smoke rose into the sky.',
      'The knight lifted his shield and charged.',
      'The arrows flew across the field.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-006',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best sentence to link two ideas.',
    stem: 'The map was torn. We could still follow it. Which sentence links these ideas best?',
    choices: [
      'Although the map was torn, we could still follow it.',
      'Because the map was torn, we could still follow it.',
      'The map was torn; however, we could not follow it.',
      'The map was torn, and the lantern was heavy.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-007',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best sentence to end the paragraph.',
    stem: 'A paragraph describes searching the cave and finding clues. Which sentence ends it best?',
    choices: [
      'With the clue in hand, we finally knew where to go next.',
      'The cave was dark and the air was cold.',
      'We carried a lantern and a rope.',
      'The harbour was bright and busy.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-008',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best topic sentence for the paragraph.',
    stem: 'The paragraph explains how Mina solved the riddle. Which topic sentence fits best?',
    choices: [
      'Mina solved the riddle by thinking carefully and using clues.',
      'The dragon slept on the mountain.',
      'The harbour was full of boats.',
      'The storm arrived at midnight.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-009',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best sentence to start a new paragraph.',
    stem: 'You have described entering the castle. What sentence starts a new paragraph about exploring inside?',
    choices: [
      'Inside, the corridors twisted like a maze.',
      'The castle gates were tall and heavy.',
      'We knocked on the door and waited.',
      'The guards stood outside the entrance.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-010',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best sentence to link two ideas.',
    stem: 'We were tired. We kept walking. Which sentence links these ideas best?',
    choices: [
      'Even though we were tired, we kept walking.',
      'Because we were tired, we kept walking.',
      'We were tired; therefore, we kept walking.',
      'We were tired, and the dragon roared.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-011',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best sentence to end the paragraph.',
    stem: 'A paragraph describes how the heroes prepared supplies. Which sentence ends it best?',
    choices: [
      'Finally, we checked everything once more and set off.',
      'The dragon roared loudly in the distance.',
      'The harbour was bright and busy.',
      'The villagers cheered at the gate.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-012',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best topic sentence for the paragraph.',
    stem: 'The paragraph describes the harbour at sunrise. Which topic sentence fits best?',
    choices: [
      'At sunrise, the harbour sparkled with light and movement.',
      'The dragon hid its treasure in the cave.',
      'Mina solved the riddle quickly.',
      'The storm broke the old bridge.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-013',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best sentence to start a new paragraph.',
    stem: 'You have finished describing the planning. What sentence starts a new paragraph about the journey beginning?',
    choices: [
      'At dawn, we stepped onto the path and began our journey.',
      'We drew a map and talked quietly.',
      'We checked our supplies and packed our bags.',
      'We listened to the wizard’s advice.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-014',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best sentence to link two ideas.',
    stem: 'The bridge was broken. We found another way. Which sentence links these ideas best?',
    choices: [
      'Because the bridge was broken, we found another way.',
      'The bridge was broken, but we did not move.',
      'The bridge was broken; however, we stopped forever.',
      'The bridge was broken, and the dragon slept.',
    ],
    answerIndex: 0,
  },
  {
    id: 'pph-015',
    gameType: 'PARAGRAPH_PATCH',
    prompt: 'Choose the best sentence to end the paragraph.',
    stem: 'A paragraph explains why the heroes needed a key. Which sentence ends it best?',
    choices: [
      'Without a key, the gate would remain closed, so we searched for clues.',
      'The gate was tall and heavy.',
      'We carried a lantern and a rope.',
      'The harbour was bright and busy.',
    ],
    answerIndex: 0,
  },
];

const rotate = <T,>(items: T[], offset: number): T[] => {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
};

export const getParagraphPatchRunQuestions = (levelId: number, count = 10): ParagraphPatchQuestion[] => {
  const base = rotate(PARAGRAPH_PATCH_QUESTIONS, Math.max(0, levelId - 1));
  return base.slice(0, Math.max(1, Math.min(count, base.length)));
};

