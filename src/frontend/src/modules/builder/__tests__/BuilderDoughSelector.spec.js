import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
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

  it("renders dough selectors", async () => {
    createComponent({ localVue, store });
    const selectorsHtml = wrapper.findAll('[data-test="dough-selector"]');
    expect(Array.from(selectorsHtml).length).toEqual(
      store.state.pizzaData.dough.length
    );
  });

  it("shows dough type class", () => {
    createComponent({ localVue, store });
    const selector = wrapper.find('[data-test="dough-selector"]');
    expect(selector.exists()).toBeTruthy();
    expect(selector.attributes("class")).toContain("dough__input--light");
  });

  it('dough checked prop is "light" by default', () => {
    createComponent({ localVue, store });
    const selector = wrapper.find('[data-test="dough-selector"]');
    expect(selector.vm.$props.checked).toContain("light");
  });

  it("calls the vuex mutation on selector change", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updatePizza");
    const selector = wrapper.find('[data-test="dough-selector"]');
    selector.vm.$emit("updateData", "test");
    expect(spyOnMutation).toHaveBeenCalledWith({
      item: "dough",
      payload: "test",
    });
  });
});
