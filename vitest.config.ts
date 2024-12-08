import { defineVitestConfig } from '@nuxt/test-utils/config';
import { fileURLToPath } from 'node:url';
import { configDefaults } from 'vitest/config';

export default defineVitestConfig({
  test: {
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        'docs/*',
        'playwright.config.ts',
        'index.html',
        '.eslintrc.cjs',
        'env.d.ts',
        'src/main.ts',
      ],
    },
  },
});
