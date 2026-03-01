import { describe, expect, test } from 'vitest';
import { createPage, setup } from '@nuxt/test-utils/e2e';

describe('Homepage', async () => {
  await setup({
    build: true,
  });

  test('user sees intro and sign in button', async () => {
    const page = await createPage('/dc/calendar/');

    console.log(await page.content());
    const timezone = page.locator('#timezone').first();

    console.log(await timezone.textContent());
  });
});
