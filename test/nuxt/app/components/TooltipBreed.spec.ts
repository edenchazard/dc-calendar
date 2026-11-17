import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import FloatingVue from 'floating-vue';
import { DateTime } from 'luxon';
import TooltipBreed from '~/components/TooltipBreed.vue';

const breed = {
  name: 'Seasonal (Winter)',
  canonical: 'seasonal-winter',
  biome: ['Alpine'],
  image: '/sprites/seasonal_winter.webp',
  availability: true,
  begin: DateTime.fromISO('2024-01-01T00:00:00Z'),
  end: DateTime.fromISO('2024-03-01T00:00:00Z'),
  probability: null,
};

const mountTooltip = () =>
  mount(TooltipBreed, {
    attachTo: document.body,
    props: { breed },
    slots: {
      default: `<img alt="${breed.name}" src="${breed.image}" />`,
    },
    global: { plugins: [FloatingVue] },
  });

enableAutoUnmount(afterEach);

describe('TooltipBreed', () => {
  beforeAll(() => {
    FloatingVue.options.themes.breed = { $extend: 'dropdown' };
  });

  it('shows the breed tooltip when hovering over a dragon', async () => {
    const wrapper = mountTooltip();

    expect(document.body.textContent).not.toContain(breed.name);

    await wrapper.find('img').trigger('mouseenter');

    await vi.waitFor(() => {
      expect(document.body.textContent).toContain(breed.name);
      expect(document.body.textContent).toContain('Alpine');
    });
  });
});
