import { test, expect } from '@playwright/test';

// Route × theme sweep: capture a full-page screenshot and assert no horizontal
// overflow (the #1 responsive bug) on every implemented view, in both themes.
const ROUTES = [
  '/',
  '/about',
  '/events',
  '/events/intro-to-meshtastic',
  '/projects',
  '/blog',
  '/blog/flashing-your-first-meshtastic-node',
  '/contact',
  '/topics',
  '/brand',
];
const THEMES = ['light', 'dark'] as const;

for (const route of ROUTES) {
  for (const theme of THEMES) {
    test(`${route} [${theme}]`, async ({ page }, testInfo) => {
      await page.goto(route, { waitUntil: 'load' });
      if (theme === 'dark') {
        await page.evaluate(() => document.documentElement.classList.add('dark'));
      }
      // No horizontal overflow (allow 1px rounding slack).
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, `horizontal overflow on ${route} [${theme}]`).toBeLessThanOrEqual(1);

      const safe = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
      await page.screenshot({
        path: `test-results/shots/${testInfo.project.name}__${safe}__${theme}.png`,
        fullPage: true,
      });
    });
  }
}
