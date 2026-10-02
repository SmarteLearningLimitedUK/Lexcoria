export type ReadingPaperPassage = { title: string; text: string };
export type ReadingPaperQuestion =
  | { type: 'mcq'; id: string; passageIndex: number; prompt: string; question: string; choices: [string, string, string, string]; answerIndex: 0 | 1 | 2 | 3; marks: 1 | 2 | 3; skillTag: 'retrieval' | 'sequence' | 'vocabulary-in-context' | 'evidence' | 'literal-comprehension' | 'inference' | 'summary' | 'author-choice' }
  | { type: 'evidence'; id: string; passageIndex: number; prompt: string; question: string; sentences: string[]; answerIndices: number[]; marks: 2 | 3 }
  | { type: 'short'; id: string; passageIndex: number; prompt: string; question: string; answers: string[]; marks: 2 | 3 };

export const READING_PAPER_PASSAGES: ReadingPaperPassage[] = [
  {
    title: 'The Beacon Room',
    text: [
      'Before dawn on Sunday, Ada followed Uncle Renn up the narrow lighthouse stairs. The lamp had stopped turning during the night, and three fishing boats were due to return at sunrise. From the top window, Ada could just make out their lights beyond the harbour wall.',
      'Uncle Renn found the heavy brass key on its hook, but the oil can was missing. Ada remembered seeing a blue tin in the storeroom. She hurried down the stairs, found it beside a coil of rope and carried it back with both hands. The tin was heavier than she had expected.',
      'The lamp’s wick was dry. Uncle Renn filled the reservoir while Ada held the tin steady. Then they turned the stiff handle together. At first the light flickered; a moment later, its bright beam swept across the water. One by one, the boats changed course towards the safe channel.',
      '“Just in time,” Uncle Renn said. Ada looked at her aching hands and grinned. She had never been so glad to see a light move.',
    ].join('\n\n'),
  },
  {
    title: 'Why Reedbeds Matter',
    text: [
      'A reedbed is a patch of tall grasses growing in shallow water. At the edge of an estuary, reeds do more than provide a home for wildlife. Their tangled roots hold the mud together, and their stems slow the movement of floodwater. As the water slows, some of the soil it carries settles among the reeds instead of reaching the sea.',
      'In spring, birds hide their nests between the stems. Insects gather there too, and young fish shelter in the calmer water. Because so many creatures use the reedbed, volunteers avoid cutting reeds during the nesting season. Instead, they cut small sections in late winter. Leaving other sections standing means animals still have somewhere to shelter.',
      'Visitors can watch from a raised boardwalk. The path keeps shoes out of the wet ground and helps protect the new shoots. A sign at the entrance asks visitors to stay on the boards and keep dogs close. Even a small step into the mud can damage a fresh shoot before it has a chance to grow.',
    ].join('\n\n'),
  },
  {
    title: 'A Letter from the Winter Fair',
    text: [
      'Dear Nan,',
      'Yesterday our class visited the winter fair in the old market square. We arrived just after two o’clock, while the stallholders were arranging their tables. Mr Ellis asked us to meet by the stone fountain at four, so we had nearly two hours to explore.',
      'First, Lila and I watched a woman shape glass over a small flame. She made a tiny blue bird, no bigger than my thumb. Next we tried the paper-folding stall. My first boat sank in the demonstration bowl, but the second one floated all the way across. Lila said the wider base made the difference.',
      'When a sudden shower began, everyone squeezed beneath the striped awning near the bakery. The baker handed us warm rolls while we waited. By the time the rain stopped, the square smelled of cinnamon. We reached the fountain with five minutes to spare.',
      'I bought you a blue glass bird. I hope it looks cheerful on your windowsill.',
      'Love, Sam',
    ].join('\n\n'),
  },
];

export const READING_PAPER_QUESTIONS: ReadingPaperQuestion[] = [
  { type: 'mcq', id: 'paper-r-01', passageIndex: 0, prompt: 'Retrieval', question: 'When did Ada climb the lighthouse stairs?', choices: ['Before dawn on Sunday', 'At noon on Saturday', 'After sunset on Sunday', 'At sunrise on Monday'], answerIndex: 0, marks: 1, skillTag: 'retrieval' },
  { type: 'mcq', id: 'paper-r-02', passageIndex: 0, prompt: 'Retrieval', question: 'What was missing from the beacon room?', choices: ['The oil can', 'The brass key', 'The lamp wick', 'The window'], answerIndex: 0, marks: 2, skillTag: 'retrieval' },
  { type: 'mcq', id: 'paper-r-03', passageIndex: 0, prompt: 'Sequence', question: 'What did Ada do immediately after remembering the blue tin?', choices: ['She hurried down the stairs', 'She turned the handle', 'She waved to the boats', 'She opened the top window'], answerIndex: 0, marks: 2, skillTag: 'sequence' },
  { type: 'mcq', id: 'paper-r-04', passageIndex: 0, prompt: 'Inference', question: 'Why did Ada and Uncle Renn need the lamp working quickly?', choices: ['The fishing boats needed the safe channel', 'The lighthouse was closing to visitors', 'They wanted to warm the room', 'The storeroom was about to flood'], answerIndex: 0, marks: 3, skillTag: 'inference' },
  { type: 'mcq', id: 'paper-r-05', passageIndex: 0, prompt: 'Vocabulary', question: 'What does “flickered” tell you about the light at first?', choices: ['It was unsteady', 'It was silent', 'It was blue', 'It was far away'], answerIndex: 0, marks: 2, skillTag: 'vocabulary-in-context' },
  { type: 'evidence', id: 'paper-r-06', passageIndex: 0, prompt: 'Find evidence', question: 'Select the two details showing Ada helped directly.', sentences: ['Ada held the tin steady.', 'They turned the stiff handle together.', 'Uncle Renn found the heavy brass key.', 'The boats changed course towards the safe channel.'], answerIndices: [0, 1], marks: 3 },
  { type: 'short', id: 'paper-r-07', passageIndex: 0, prompt: 'Short answer', question: 'Where did Ada find the blue tin?', answers: ['beside a coil of rope', 'in the storeroom beside a coil of rope', 'the storeroom'], marks: 2 },
  { type: 'mcq', id: 'paper-r-08', passageIndex: 1, prompt: 'Retrieval', question: 'Where do the reeds described in this text grow?', choices: ['In shallow water', 'On dry hills', 'On the boardwalk', 'In deep sea water'], answerIndex: 0, marks: 1, skillTag: 'retrieval' },
  { type: 'mcq', id: 'paper-r-09', passageIndex: 1, prompt: 'Explanation', question: 'How do reed stems help reduce flooding?', choices: ['They slow the movement of floodwater', 'They make the water hotter', 'They pull water into the sea', 'They block all rain from falling'], answerIndex: 0, marks: 2, skillTag: 'literal-comprehension' },
  { type: 'mcq', id: 'paper-r-10', passageIndex: 1, prompt: 'Retrieval', question: 'When do volunteers cut small sections of reeds?', choices: ['In late winter', 'During nesting season', 'In spring', 'When young fish arrive'], answerIndex: 0, marks: 2, skillTag: 'retrieval' },
  { type: 'mcq', id: 'paper-r-11', passageIndex: 1, prompt: 'Inference', question: 'Why do volunteers leave some reeds standing?', choices: ['Animals still need shelter', 'The boardwalk needs shade', 'The sea needs more soil', 'The mud must dry completely'], answerIndex: 0, marks: 3, skillTag: 'inference' },
  { type: 'mcq', id: 'paper-r-12', passageIndex: 1, prompt: 'Summary', question: 'Which best summarises the whole text?', choices: ['Reedbeds protect land and wildlife, so people care for them', 'Boardwalks are built entirely from reeds', 'Volunteers cut every reed in spring', 'Fish cannot live near an estuary'], answerIndex: 0, marks: 3, skillTag: 'summary' },
  { type: 'evidence', id: 'paper-r-13', passageIndex: 1, prompt: 'Find evidence', question: 'Select the two details showing visitors how to protect the reedbed.', sentences: ['The path keeps shoes out of the wet ground.', 'A sign asks visitors to stay on the boards and keep dogs close.', 'Insects gather there too.', 'Young fish shelter in the calmer water.'], answerIndices: [0, 1], marks: 3 },
  { type: 'short', id: 'paper-r-14', passageIndex: 1, prompt: 'Short answer', question: 'Name one creature that shelters among the reeds.', answers: ['birds', 'birds hide their nests', 'insects', 'young fish', 'fish'], marks: 2 },
  { type: 'mcq', id: 'paper-r-15', passageIndex: 2, prompt: 'Retrieval', question: 'Where did Sam’s class arrange to meet at four?', choices: ['By the stone fountain', 'Near the bakery', 'At the glass stall', 'Under the striped awning'], answerIndex: 0, marks: 2, skillTag: 'retrieval' },
  { type: 'mcq', id: 'paper-r-16', passageIndex: 2, prompt: 'Sequence', question: 'Which stall did Sam and Lila visit first?', choices: ['The glass stall', 'The paper-folding stall', 'The bakery', 'The striped awning'], answerIndex: 0, marks: 2, skillTag: 'sequence' },
  { type: 'mcq', id: 'paper-r-17', passageIndex: 2, prompt: 'Inference', question: 'Why did Sam’s second paper boat float farther?', choices: ['It had a wider base', 'It was made of glass', 'The bowl was empty', 'The rain had stopped'], answerIndex: 0, marks: 3, skillTag: 'inference' },
  { type: 'mcq', id: 'paper-r-18', passageIndex: 2, prompt: 'Vocabulary', question: 'What is an “awning” in this letter?', choices: ['A cover people can shelter beneath', 'A kind of paper boat', 'A glass bird', 'A stone fountain'], answerIndex: 0, marks: 2, skillTag: 'vocabulary-in-context' },
  { type: 'evidence', id: 'paper-r-19', passageIndex: 2, prompt: 'Find evidence', question: 'Select the two details showing the children waited out the rain.', sentences: ['Everyone squeezed beneath the striped awning.', 'The baker handed us warm rolls while we waited.', 'We arrived just after two o’clock.', 'I bought you a blue glass bird.'], answerIndices: [0, 1], marks: 3 },
  { type: 'short', id: 'paper-r-20', passageIndex: 2, prompt: 'Short answer', question: 'What did Sam buy for Nan?', answers: ['a blue glass bird', 'blue glass bird', 'a glass bird', 'glass bird'], marks: 2 },
];
