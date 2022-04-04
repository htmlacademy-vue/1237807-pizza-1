import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_POP_UP } from '@/store/mutations-types';
import Cart from "@/views/Cart.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

const setPopUp = store => {
  store.commit(`Cart/${SET_POP_UP}`, true);
};

describe("Cart", () => {
  const stubs = ['router-link'];

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('renders pizza view', async () => {
    createComponent({ localVue, store, stubs });
    const pizzaViewHtml = wrapper.findAll('[data-test="pizza-view"]');
    expect(pizzaViewHtml.exists()).toBeTruthy();
  });

  it ('renders misc selector', async () => {
    createComponent({ localVue, store, stubs });
    const miscSelectorHtml = wrapper.findAll('[data-test="misc-selector"]');
    expect(miscSelectorHtml.exists()).toBeTruthy();
  });

  it ('renders delivery form', async () => {
    createComponent({ localVue, store, stubs });
    const deliveryFormHtml = wrapper.findAll('[data-test="delivery-form"]');
    expect(deliveryFormHtml.exists()).toBeTruthy();
  });

  it ('renders cart footer', async () => {
    createComponent({ localVue, store, stubs });
    const cartFooterHtml = wrapper.findAll('[data-test="cart-footer"]');
    expect(cartFooterHtml.exists()).toBeTruthy();
  });

  it ('doesn\'t display pop up', () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find('[data-test="pop-up"]').exists()).toBeFalsy();
  });

  it ('displays pop up', () => {
    setPopUp(store);
    createComponent({ localVue, store, stubs });
    expect(wrapper.find('[data-test="pop-up"]').exists()).toBeTruthy();
  });
});
