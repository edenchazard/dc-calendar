import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { enableAutoUnmount } from '@vue/test-utils';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { Settings } from 'luxon';
import IndexPage from '~/pages/index.vue';

enableAutoUnmount(afterEach);

describe('Index page', () => {
  beforeEach(() => {
    localStorage.clear();
    Settings.defaultZone = 'America/New_York';
    Settings.defaultLocale = 'en-US';
  });

  it('updates the times shown when the timezone changes', async () => {
    const wrapper = await mountSuspended(IndexPage);

    // Set the end first so the table never has to render the multi-year gap
    // between today and the new start date.
    await wrapper.find('#to').setValue('2024-02-16');
    await wrapper.find('#from').setValue('2024-02-07');
    await wrapper.find('#timezone').setValue('Europe/London');

    const forecast = wrapper.find('#forecast');

    expect(forecast.text()).toContain(
      'Between Feb 7, 2024, 5:00:00 AM and Feb 16, 2024, 5:00:00 AM',
    );
    expect(forecast.text()).toContain('Appearing 05:00:00');
    expect(forecast.text()).toContain('Leaving 04:59:59');

    await wrapper.find('#timezone').setValue('Asia/Tokyo');

    expect(forecast.text()).toContain(
      'Between Feb 7, 2024, 2:00:00 PM and Feb 16, 2024, 2:00:00 PM',
    );
    expect(forecast.text()).toContain('Appearing 14:00:00');
    expect(forecast.text()).toContain('Leaving 13:59:59');

    // The Dragon Cave time should not change when the local timezone does.
    expect(forecast.text()).toContain(
      'Feb 7, 2024, 12:00:00 AM to Feb 16, 2024, 12:00:00 AM on Dragon Cave',
    );
  });
});
