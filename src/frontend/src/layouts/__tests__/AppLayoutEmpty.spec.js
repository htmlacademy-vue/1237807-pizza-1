import { shallowMount } from '@vue/test-utils';
import AppLayoutEmpty from '@/layouts/AppLayoutEmpty';

const stubs = {
  Error: { template: '<div>Error</div>' }
};
const slots = {
  default: 'test'
};


describe('AppLayoutEmpty', () => {
  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppLayoutEmpty, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('is rendered', () => {
    createComponent({ stubs, slots });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('AppLayoutEmpty renders out the slot content', () => {
    createComponent({ stubs, slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
