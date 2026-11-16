import { defineConfig, devices } from '@playwright/test';
import type { ConfigOptions } from '@nuxt/test-utils/playwright';

export default defineConfig<ConfigOptions>({
  testDir: './test/e2e',
  webServer: {
    command:
      'npx nuxt build --target=node-server && node .output/server/index.mjs',
    url: 'http://127.0.0.1/dc/calendar/',
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
    env: {
      HOST: '127.0.0.1',
      PORT: '80',
    },
  },
  use: {
    locale: 'en-US',
    nuxt: {
      host: 'http://127.0.0.1/',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
