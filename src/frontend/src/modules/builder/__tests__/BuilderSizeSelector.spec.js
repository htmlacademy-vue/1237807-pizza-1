import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
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

  it("renders size selectors", async () => {
    createComponent({ localVue, store });
    const selectorsHtml = wrapper.findAll('[data-test="size-selector"]');
    expect(Array.from(selectorsHtml).length).toEqual(
      store.state.pizzaData.sizes.length
    );
  });

  it("shows size type class", () => {
    createComponent({ localVue, store });
    const selector = wrapper.find('[data-test="size-selector"]');
    expect(selector.exists()).toBeTruthy();
    expect(selector.attributes("class")).toContain("diameter__input--small");
  });

  it('size checked prop is "normal" by default', () => {
    createComponent({ localVue, store });
    const selector = wrapper.find('[data-test="size-selector"]');
    expect(selector.vm.$props.checked).toContain("normal");
  });

  it("calls the vuex mutation on selector change", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updatePizza");
    const selector = wrapper.find('[data-test="size-selector"]');
    selector.vm.$emit("updateData", "test");
    expect(spyOnMutation).toHaveBeenCalledWith({
      item: "diameter",
      payload: "test",
    });
  });
});
