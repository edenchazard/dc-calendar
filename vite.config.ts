import { fileURLToPath, URL } from 'node:url';
import { defineConfig, configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: './pages',
    emptyOutDir: true,
  },
  base: '/dc-calendar/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
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
