import type { Locator } from '@playwright/test';
import { expect, test } from '@nuxt/test-utils/playwright';

test.describe('Calendar range and timezone changes', () => {
  test.use({
    timezoneId: 'America/New_York',
  });

  test('can change the range and timezone, then hover for each tooltip', async ({
    page,
    goto,
  }) => {
    const breedBiomes: Record<string, string[]> = {
      'Seasonal (Autumn)': ['Forest'],
      'Seasonal (Winter)': ['Alpine'],
      'Gemshard (Jade)': ['Jungle'],
      'Gemshard (Ruby)': ['Jungle'],
      'Gemshard (Sapphire)': ['Jungle'],
      'Gemshard (Amethyst)': ['Jungle'],
      'Gemshard (Aqua)': ['Jungle'],
      'Gemshard (Citrine)': ['Jungle'],
      'Sonata (Gold)': ['All'],
      'Sonata (Blue)': ['All'],
      'Sonata (Silver)': ['All'],
      'Lunar Herald (Gold)': ['Alpine', 'Desert', 'Volcano'],
      'Lunar Herald (Silver)': ['Alpine', 'Desert', 'Volcano'],
      'Lunar Herald (Bronze)': ['Alpine', 'Desert', 'Volcano'],
      'Lunar Herald (Indigo)': ['Alpine', 'Desert', 'Volcano'],
      'Previous Holidays': ['Holiday'],
      '2026 Holiday': ['All'],
      'Moonblight Transformation': ['Curse BSA'],
    };

    const row = (forecast: Locator, date: string) =>
      forecast.locator('.row').filter({ hasText: date });

    const breedNames = (forecast: Locator, date: string) =>
      row(forecast, date)
        .locator('.breed img')
        .evaluateAll((images) =>
          images.map((image) => image.getAttribute('alt')),
        );

    async function expectTransition(
      forecast: Locator,
      date: string,
      direction: 'incoming' | 'outgoing',
      name: string,
      time: string,
    ) {
      const transition = row(forecast, date).locator(`.${direction}`);

      await expect(transition.locator('img')).toHaveAttribute('alt', name);
      await expect(transition).toContainText(time);
    }

    await page.addInitScript(() => {
      window.localStorage.setItem('localTimezone', 'Europe/London');
    });

    await goto('/dc/calendar/', { waitUntil: 'hydration' });

    const timezone = page.locator('#timezone');
    const from = page.locator('#from');
    const to = page.locator('#to');
    const forecast = page.locator('#forecast');

    const localPeriod = forecast.locator('p').first();
    const dcPeriod = forecast.locator('p.italic');

    await expect(forecast).toBeVisible();
    await expect(timezone).toHaveValue('Europe/London');

    // Set a fixed range so the timezone conversion assertions are repeatable.
    await to.fill('2026-11-22');
    await from.fill('2026-11-15');
    await expect(from).toHaveValue('2026-11-15');
    await expect(to).toHaveValue('2026-11-22');

    // The local period is shown in Europe/London, while the DC period is
    // unchanged.
    await expect(localPeriod).toContainText(
      'Between Nov 15, 2026, 5:00:00 AM and Nov 22, 2026, 5:00:00 AM',
    );
    await expect(dcPeriod).toContainText(
      'Nov 15, 2026, 12:00:00 AM to Nov 22, 2026, 12:00:00 AM on Dragon Cave',
    );

    const dcPeriodText = await dcPeriod.innerText();

    // Each breed shows its name and biomes in a tooltip when hovered.
    const breedImages = forecast.locator('.breed img');

    await expect(breedImages.first()).toBeVisible();

    for (const image of await breedImages.all()) {
      const name = await image.getAttribute('alt');

      if (!name) {
        throw new Error('Breed image is missing its alt text');
      }

      const biomes = breedBiomes[name];

      if (!biomes) {
        throw new Error(`No biome expectations for ${name}`);
      }

      await image.hover();

      const tooltip = page.locator('.v-popper__popper--shown .v-popper__inner');

      await expect(tooltip).toBeVisible();
      await expect(tooltip.locator('.name')).toHaveText(name);
      await expect(tooltip.locator('.biome')).toHaveText(biomes);

      // Move away so the next breed can be hovered independently.
      await page.mouse.move(0, 0);
      await expect(page.locator('.v-popper__popper--shown')).toHaveCount(0);
    }

    // Changing the timezone updates local times but not the Dragon Cave times.
    await timezone.selectOption('Asia/Tokyo');

    await expect(localPeriod).toContainText(
      'Between Nov 15, 2026, 2:00:00 PM and Nov 22, 2026, 2:00:00 PM',
    );
    await expect(dcPeriod).toHaveText(dcPeriodText);

    // Change the period to 15/12/2026 to 31/12/2026 while still in Asia/Tokyo.
    await from.fill('2026-12-15');
    await to.fill('2026-12-31');

    await expect(localPeriod).toContainText(
      'Between Dec 15, 2026, 2:00:00 PM and Dec 31, 2026, 2:00:00 PM',
    );
    await expect(dcPeriod).toContainText(
      'Dec 15, 2026, 12:00:00 AM to Dec 31, 2026, 12:00:00 AM on Dragon Cave',
    );
    await expect(forecast.locator('.month-header')).toHaveText('December 2026');

    await expect
      .poll(() => breedNames(forecast, '15 Tue'), { timeout: 10_000 })
      .toEqual([
        'Seasonal (Autumn)',
        'Gemshard (Ruby)',
        'Sonata (Gold)',
        'Sonata (Blue)',
        'Lunar Herald (Silver)',
      ]);

    await expect
      .poll(() => breedNames(forecast, '25 Fri'), { timeout: 10_000 })
      .toEqual([
        'Seasonal (Winter)',
        'Previous Holidays',
        'Gemshard (Aqua)',
        'Sonata (Blue)',
        'Lunar Herald (Indigo)',
        'Moonblight Transformation',
      ]);

    // Breeds entering and leaving the forecast show their transition times.
    await expectTransition(
      forecast,
      '19 Sat',
      'incoming',
      'Previous Holidays',
      '14:00:00',
    );
    await expectTransition(
      forecast,
      '21 Mon',
      'incoming',
      'Seasonal (Winter)',
      '05:51:22',
    );
    await expectTransition(
      forecast,
      '22 Tue',
      'outgoing',
      'Seasonal (Autumn)',
      '05:51:22',
    );
    await expectTransition(
      forecast,
      '25 Fri',
      'incoming',
      '2026 Holiday',
      '14:00:00',
    );
    await expectTransition(
      forecast,
      '26 Sat',
      'outgoing',
      'Previous Holidays',
      '13:59:59',
    );
    await expectTransition(
      forecast,
      '28 Mon',
      'outgoing',
      '2026 Holiday',
      '13:59:59',
    );
  });
});
