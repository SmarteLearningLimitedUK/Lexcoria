# Lexcoria integration notes

Lexcoria has four selectable island groups, 21 English mini-games and two practice-paper levels. Its shared iPhone game shell keeps answer controls in the playfield, while reading passages open in a reusable scrollable book panel. The reading paper has three passages and 20 mixed questions (45 available marks); the GPS paper selects 25 questions (about 50 available marks) across grammar, punctuation and spelling topics. The structured bank currently contains 127 English questions. This is a playable revision bank, not a claim that every possible KS2 test item or statutory spelling is covered; an educator should review and extend it before a paid launch.

The public site can build Lexcoria into `/english/play/` using `npm run build:with-english` in the sibling SATsLegends repository. Production access requires the same-origin Supabase parent session, an active English or combined entitlement and a selected child profile. Progress is stored under the English product, separately from Matharia. When the backend is absent, the public build fails closed; local development remains playable for QA. Release activation and pricing are documented in the website's `docs/LEXCORIA_INTEGRATION.md`.

## Assumptions

- `D:\BrainZilla\GitHub\SATsLegends` is the sibling Matharia/website repository explicitly supplied by the owner.
- Both games use one parent account and child profile but separate product entitlements and progress rows.
- English and combined plans are not sold until the owner completes provider, legal and release checks.
- Only the current Lexcoria repository, the explicitly supplied sibling repository and the owner's permitted SATs Legends chat informed this work; no external legacy project assumptions were used.

## Changed files in this repository

- `package.json`, `package-lock.json`, `vite.config.ts`: Supabase dependency and nested production build support.
- `src/main.tsx`, `src/App.tsx`, `src/app/usePlayerProgression.ts`, `src/app/testingFlags.ts`, `src/app/EnglishAccessGate.tsx`, `src/app/EnglishSaveContext.ts`: same-origin subscription gate, separate child saves and progression safety.
- `src/constants.ts`, `src/screens/WorldMap.tsx`: island level mapping and image-aligned hotspots/labels.
- `src/index.css`, `src/english-theme.css`, `src/components/game-ui/ReadingBookOverlay.tsx`: shared iPhone shell, palette, answer feedback and passage panel layout.
- `src/systems/content/english/satsSpec.ts`, `src/systems/content/english/readingPaper.ts`, `src/systems/content/english/nounPhrase.ts`: structured question content and phrase composition.
- `src/games/english/CohesionConnectorGame.tsx`, `src/games/english/CompareContrastCanyonGame.tsx`, `src/games/english/ConjunctionCrossingGame.tsx`, `src/games/english/EnglishGameShell.tsx`, `src/games/english/EnglishReadingShell.tsx`, `src/games/english/EnglishSelectTwoShell.tsx`, `src/games/english/EvidenceChainGame.tsx`, `src/games/english/EvidenceHighlightGame.tsx`, `src/games/english/FactOrFictionForgeGame.tsx`, `src/games/english/FormalFixerGame.tsx`, `src/games/english/GrammarGauntletGame.tsx`, `src/games/english/NounPhraseBuilderGame.tsx`, `src/games/english/PunctuationMasteryGame.tsx`, `src/games/english/PunctuationPatrolGame.tsx`, `src/games/english/ReadingRescueGame.tsx`, `src/games/english/StorySequencerGame.tsx`, `src/games/english/TextDetectiveGame.tsx`, `src/games/english/VoiceSwitchVaultGame.tsx`, `src/games/english/WordsmithTrialsGame.tsx`: reusable mechanics, game feedback and touch layout.
- `src/components/ViewportBossEnemy.tsx`: removed an unused component that referenced a missing module.
- `qa/verify-english-content.ts`, `qa/verify-english-iphone.mjs`: question integrity and 23-route iPhone checks.
- `docs/ENGLISH_RELEASE_NOTES.md`: this scope, inventory and release note.

## Validation

`npm run lint`, `npm run build`, `npx tsx qa/verify-english-content.ts` and the Playwright iPhone QA at 390×844 and 320×700 pass locally. The same-origin combined static build resolves both the website root and `/english/play/`; no live provider or payment flow was exercised.
