import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const origin = process.env.ENGLISH_QA_URL || 'http://127.0.0.1:3000';
const viewport = { width: 667, height: 375 };
const routes = ['/game/4/1', '/game/4/2'];
const seedsPerRoute = 120;

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport });
  await page.addInitScript(() => {
    let seed = Number(new URLSearchParams(location.search).get('qaSeed')) || 1;
    Math.random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 0x100000000;
    };
  });

  for (const route of routes) {
    const questions = new Set();
    const failures = [];
    for (let seed = 1; seed <= seedsPerRoute; seed += 1) {
      await page.goto(`${origin}${route}?qaSeed=${seed}`);
      await page.locator('.game-screen-layout').waitFor();
      const layout = await page.evaluate(() => {
        const main = document.querySelector('.game-screen-main');
        const question = document.querySelector('.game-question-card');
        const sentence = document.querySelector('.english-gps-paper-sentence');
        const answers = [...document.querySelectorAll('.game-screen-main .sats-answer-btn')];
        const mainRect = main?.getBoundingClientRect();
        const answerRects = answers.map(button => button.getBoundingClientRect());
        return {
          questionText: question?.querySelector('.game-question-card-copy')?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
          questionClipped: Boolean(question && question.scrollHeight > question.clientHeight + 2),
          mainClipped: Boolean(main && main.scrollHeight > main.clientHeight + 2),
          sentenceClipped: Boolean(sentence && sentence.scrollHeight > sentence.clientHeight + 2),
          answerClips: answers.filter(button => button.scrollHeight > button.clientHeight + 2 || button.scrollWidth > button.clientWidth + 2)
            .map(button => ({ text: button.textContent?.replace(/\s+/g, ' ').trim(), scroll: button.scrollHeight, client: button.clientHeight })),
          answerLayoutIssues: answerRects.flatMap((rect, index) => {
            const outside = !mainRect || rect.left < mainRect.left - 1 || rect.right > mainRect.right + 1
              || rect.top < mainRect.top - 1 || rect.bottom > mainRect.bottom + 1 || rect.height < 44;
            const overlap = answerRects.some((other, otherIndex) => otherIndex < index
              && Math.min(rect.right, other.right) - Math.max(rect.left, other.left) > 2
              && Math.min(rect.bottom, other.bottom) - Math.max(rect.top, other.top) > 2);
            return outside || overlap ? [{ index, outside, overlap, rect: rect.toJSON() }] : [];
          }),
        };
      });
      questions.add(layout.questionText);
      if (layout.questionClipped || layout.mainClipped || layout.sentenceClipped || layout.answerClips.length || layout.answerLayoutIssues.length) {
        failures.push({ seed, ...layout });
      }
    }
    assert.ok(questions.size > 10, `${route}: seeded rounds did not cover enough question variants`);
    assert.ok(failures.length === 0, `${route}: short-landscape clipping in ${failures.length}/${seedsPerRoute} seeded rounds: ${JSON.stringify(failures.slice(0, 6))}`);
    console.log(`PASS ${route}: ${seedsPerRoute} seeded 667×375 rounds, ${questions.size} question variants`);
  }
  await page.close();
} finally {
  await browser.close();
}
