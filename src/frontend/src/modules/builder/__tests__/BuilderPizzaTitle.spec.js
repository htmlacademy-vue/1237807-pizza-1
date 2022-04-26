import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { UPDATE_CURRENT_PIZZA } from "@/store/mutations-types";
import BuilderPizzaTitle from "@/modules/builder/components/BuilderPizzaTitle";

const localVue = createLocalVue();
localVue.use(Vuex);

const addPizzaTitle = (store, payload) => {
  store.commit(`Builder/${UPDATE_CURRENT_PIZZA}`, {
    item: "title",
    payload,
  });
};

describe("BuilderPizzaTitle", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaTitle, options);
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

  it("renders title", () => {
    addPizzaTitle(store, "test pizza");
    createComponent({ localVue, store });
    let input = wrapper.find("input");
    expect(input.element.value).toBe("test pizza");
  });

  it("calls the vuex mutation on change title input", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updatePizza");
    let input = wrapper.find("input");
    input.element.value = "test";
    await input.trigger("change");
    expect(spyOnMutation).toHaveBeenCalledWith({
      item: "title",
      payload: "test",
    });
  });
});
