import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ActiveBadgeVue from '../ActiveBadge.vue';

describe('ActiveBadge', () => {
  it('renders active when condition is true', async () => {
    const wrapper = mount(ActiveBadgeVue, {
      props: { condition: true },
    });

    expect(wrapper.text()).to.eql('active');
  });

  it('renders empty when condition is false', async () => {
    const wrapper = mount(ActiveBadgeVue, {
      props: { condition: false },
    });

    expect(wrapper.text()).to.eql('');
  });
});
