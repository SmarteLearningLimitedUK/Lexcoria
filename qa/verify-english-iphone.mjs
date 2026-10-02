import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const origin = process.env.ENGLISH_QA_URL || 'http://127.0.0.1:3000';
const routes = [
  ...Array.from({ length: 4 }, (_, index) => `/game/1/${index + 1}`),
  ...Array.from({ length: 9 }, (_, index) => `/game/2/${index + 1}`),
  ...Array.from({ length: 8 }, (_, index) => `/game/3/${index + 1}`),
  ...Array.from({ length: 2 }, (_, index) => `/game/4/${index + 1}`),
];

const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
    { width: 844, height: 390 },
  ]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of routes) {
      await page.goto(`${origin}${route}`);
      await page.locator('.game-screen-layout').waitFor();
      const layout = await page.evaluate(() => {
        const shell = document.querySelector('.game-screen-layout')?.getBoundingClientRect();
        const main = document.querySelector('.game-screen-main')?.getBoundingClientRect();
        const question = document.querySelector('.game-question-card')?.getBoundingClientRect();
        const answers = [...document.querySelectorAll('.sats-answer-btn')].map(button => ({
          rect: button.getBoundingClientRect().toJSON(),
          clipped: button.scrollHeight > button.clientHeight + 6 || button.scrollWidth > button.clientWidth + 6,
          text: button.textContent,
          scrollHeight: button.scrollHeight,
          clientHeight: button.clientHeight,
        }));
        const actions = [...document.querySelectorAll('.game-screen-bottom button')].map(button => button.getBoundingClientRect().toJSON());
        return { shell: shell?.toJSON(), main: main?.toJSON(), question: question?.toJSON(), answers, actions,
          pageWidth: document.documentElement.scrollWidth, pageHeight: document.documentElement.scrollHeight };
      });
      assert.ok(layout.main && layout.question && layout.actions.length, `${route}: missing playfield, question or actions`);
      assert.ok(layout.pageWidth <= viewport.width + 1 && layout.pageHeight <= viewport.height + 1, `${route}: page scrolls`);
      assert.ok(layout.question.top >= layout.shell.top - 1 && layout.question.bottom <= layout.main.bottom + 1, `${route}: question outside game shell`);
      assert.ok(layout.question.bottom <= layout.main.top + 1 || layout.question.top >= layout.main.top - 1, `${route}: question overlaps shell regions`);
      for (const { rect, clipped, text, scrollHeight, clientHeight } of layout.answers) {
        assert.ok(rect.x >= -1 && rect.right <= viewport.width + 1 && rect.y >= layout.main.top - 1 && rect.bottom <= layout.main.bottom + 1, `${route}: answer outside playfield (${text}, ${JSON.stringify(rect)}, main ${JSON.stringify(layout.main)})`);
        assert.ok(!clipped, `${route}: answer text clipped (${text}, ${scrollHeight}/${clientHeight})`);
      }
      for (const rect of layout.actions) {
        assert.ok(rect.x >= -1 && rect.right <= viewport.width + 1 && rect.y >= layout.main.bottom - 2 && rect.bottom <= viewport.height + 1, `${route}: action overlaps playfield or screen edge`);
        assert.ok(rect.height >= 44, `${route}: action below touch target height`);
      }
    }
    assert.deepEqual(errors, [], `Browser errors at ${viewport.width}px`);
    console.log(`PASS ${viewport.width}×${viewport.height}: ${routes.length} English games fit the iPhone viewport`);
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${origin}/game/2/6`);
  await page.getByRole('button', { name: 'Open passage' }).click();
  const passageLine = page.locator('.english-passage-line').first();
  const unmarkedColor = await passageLine.evaluate(element => getComputedStyle(element).backgroundColor);
  await passageLine.click();
  assert.equal(await passageLine.getAttribute('aria-pressed'), 'true');
  assert.notEqual(await passageLine.evaluate(element => getComputedStyle(element).backgroundColor), unmarkedColor);
  await page.getByRole('button', { name: 'Close passage' }).click();
  await page.getByRole('button', { name: 'Open passage' }).click();
  assert.equal(await page.locator('.reading-scroll-panel').count(), 1);
  assert.equal(await page.locator('.english-passage-line').first().getAttribute('aria-pressed'), 'true');
  await page.getByRole('button', { name: 'Close passage' }).click();
  await page.locator('.sats-answer-btn').first().click();
  assert.ok((await page.locator('.sats-answer-btn').first().getAttribute('class'))?.includes('sats-answer-btn--selected'));
  await page.getByRole('button', { name: 'Open passage' }).click();
  assert.equal(await page.getByRole('button', { name: 'Submit' }).isDisabled(), true);
  await page.getByRole('button', { name: 'Close passage' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  assert.equal(await page.locator('.sats-answer-btn--correct').count(), 1);
  assert.ok(await page.locator('.sats-answer-btn--incorrect').count() <= 1);
  await page.goto(`${origin}/game/4/1`);
  await page.locator('.game-screen-layout').waitFor();
  assert.match(await page.locator('body').innerText(), /Question 1\/20/);
  await page.goto(`${origin}/game/4/2`);
  await page.locator('.game-screen-layout').waitFor();
  assert.match(await page.locator('body').innerText(), /Question 1\/25/);
  console.log('PASS reading book reopen, answer feedback and both practice-paper lengths');
  await page.close();

  const punctuationAnswers = {
    'pp-001': ['What', '?'],
    'pp-002': ['I', 'London', '.'],
    'pp-003': ["It's", '.'],
    'pp-004': ["dogs'", '.'],
    'pp-005': ['“', ',', '”', '.'],
    'pp-006': [',', '.'],
  };
  const encounterPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await encounterPage.goto(`${origin}/game/1/3`);
  await encounterPage.locator('.english-phantom-encounter').waitFor();
  const questionId = await encounterPage.locator('.english-punctuation-playfield').getAttribute('data-question-id');
  const correctSlots = punctuationAnswers[questionId];
  assert.ok(correctSlots, `Unknown punctuation question ${questionId}`);
  const slots = encounterPage.locator('.english-punctuation-line .sats-answer-btn');
  assert.equal(await slots.count(), correctSlots.length);
  for (let index = 0; index < correctSlots.length; index += 1) {
    const slot = slots.nth(index);
    for (let attempt = 0; attempt < 5 && (await slot.innerText()) !== correctSlots[index]; attempt += 1) {
      await slot.click();
    }
    assert.equal(await slot.innerText(), correctSlots[index]);
  }
  const health = encounterPage.getByRole('progressbar', { name: 'Punctuation Phantom health' });
  const healthBefore = Number(await health.getAttribute('aria-valuenow'));
  await encounterPage.getByRole('button', { name: 'Submit' }).click();
  assert.ok(Number(await health.getAttribute('aria-valuenow')) < healthBefore, 'Correct answer must damage the Phantom');
  await encounterPage.locator('[aria-label="1 correct answers in a row"]').waitFor();
  const correctFeedbackFits = await encounterPage.evaluate(() => {
    const main = document.querySelector('.game-screen-main')?.getBoundingClientRect();
    const sentence = document.querySelector('.english-punctuation-sentence')?.getBoundingClientRect();
    const feedback = document.querySelector('.english-punctuation-playfield .mission-panel-shell')?.getBoundingClientRect();
    return Boolean(main && sentence && feedback && sentence.bottom <= feedback.top + 1 && feedback.bottom <= main.bottom + 1);
  });
  assert.ok(correctFeedbackFits, 'Correct feedback overlaps the playfield');
  await encounterPage.goto(`${origin}/game/1/3`);
  await encounterPage.locator('.english-phantom-encounter').waitFor();
  const wrongId = await encounterPage.locator('.english-punctuation-playfield').getAttribute('data-question-id');
  const firstCorrect = punctuationAnswers[wrongId]?.[0];
  assert.ok(firstCorrect, `Unknown punctuation question ${wrongId}`);
  const firstSlot = encounterPage.locator('.english-punctuation-line .sats-answer-btn').first();
  if ((await firstSlot.innerText()) === firstCorrect) await firstSlot.click();
  await encounterPage.getByRole('button', { name: 'Submit' }).click();
  assert.match(await encounterPage.locator('.mission-panel-shell').last().innerText(), /Correct sentence:/);
  assert.ok(await encounterPage.locator('.english-punctuation-line .sats-answer-btn--incorrect').count() >= 1);
  const incorrectFeedbackFits = await encounterPage.evaluate(() => {
    const main = document.querySelector('.game-screen-main')?.getBoundingClientRect();
    const sentence = document.querySelector('.english-punctuation-sentence')?.getBoundingClientRect();
    const feedback = document.querySelector('.english-punctuation-playfield .mission-panel-shell')?.getBoundingClientRect();
    return Boolean(main && sentence && feedback && sentence.bottom <= feedback.top + 1 && feedback.bottom <= main.bottom + 1);
  });
  assert.ok(incorrectFeedbackFits, 'Correction feedback overlaps the playfield');
  console.log('PASS Punctuation Phantom damage, focus streak and correct-sentence reveal');
  await encounterPage.close();
} finally {
  await browser.close();
}
