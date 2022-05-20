import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { UPDATE_MISC_ORDER } from "@/store/mutations-types";
import CartMiscSelector from "@/modules/cart/components/CartMiscSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

const addMiscItemCount = (store, payload) => {
  store.commit(`Cart/${UPDATE_MISC_ORDER}`, {
    item: payload,
    isAddition: true,
  });
};

describe("CartMiscSelector", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(CartMiscSelector, options);
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

  it("renders misc items", async () => {
    createComponent({ localVue, store });
    const itemsHtml = wrapper.findAll('[data-test="misc-item"]');
    expect(Array.from(itemsHtml).length).toEqual(store.state.miscData.length);
  });

  it("shows correct misc items count", () => {
    addMiscItemCount(store, "cola");
    createComponent({ localVue, store });
    const counter = wrapper.find('[data-test="misc-counter"]');
    expect(counter.exists()).toBeTruthy();
    expect(counter.vm.$props.value).toEqual(1);
  });

  it("calls the vuex mutation on misc counter minus", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updateMiscOrder");
    const counter = wrapper.find('[data-test="misc-counter"]');
    counter.vm.$emit("removeItem");
    expect(spyOnMutation).toHaveBeenCalledWith({
      item: "cola",
    });
  });

  it("calls the vuex mutation on misc counter plus", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updateMiscOrder");
    const counter = wrapper.find('[data-test="misc-counter"]');
    counter.vm.$emit("addItem");
    expect(spyOnMutation).toHaveBeenCalledWith({
      item: "cola",
      isAddition: true,
    });
  });
});
