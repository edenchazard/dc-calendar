import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import ActiveBadgeVue from '~/components/ActiveBadge.vue';

describe('ActiveBadge', () => {
  it('renders active when condition is true', async () => {
    const wrapper = await mountSuspended(ActiveBadgeVue, {
      props: { condition: true },
    });

    expect(wrapper.text()).to.eql('active');
  });

  it('renders empty when condition is false', async () => {
    const wrapper = await mountSuspended(ActiveBadgeVue, {
      props: { condition: false },
    });

    expect(wrapper.text()).to.eql('');
  });
});
