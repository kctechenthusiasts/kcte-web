import { defineConfig, devices } from '@playwright/test';

// Cross-engine / viewport sweep for the design-handoff verification gate.
// Run: task verify:browsers  (or: pnpm exec playwright test)
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:4321' },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 14'] } },
    { name: 'tablet', use: { ...devices['iPad (gen 7) landscape'] } },
  ],
});
