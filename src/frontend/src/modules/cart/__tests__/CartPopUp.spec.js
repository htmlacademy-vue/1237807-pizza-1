import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import CartPopUp from "@/modules/cart/components/CartPopUp";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartPopUp", () => {
  let store;
  let wrapper;

  const createComponent = options => {
    wrapper = mount(CartPopUp, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("calls the vuex mutation on click close button", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "setPopUp");
    const closeButton = wrapper.find('[data-test="close-button"]');
    await closeButton.trigger("click");
    expect(spyOnMutation).toHaveBeenCalledWith(false);
  });

  it("calls the vuex mutation on click confirm button", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "setPopUp");
    const confirmButton = wrapper.find('[data-test="confirm-button"]');
    await confirmButton.trigger("click");
    expect(spyOnMutation).toHaveBeenCalledWith(false);
  });
});
