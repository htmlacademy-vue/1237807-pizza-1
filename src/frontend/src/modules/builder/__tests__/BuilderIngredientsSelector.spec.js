import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { UPDATE_CURRENT_PIZZA } from "@/store/mutations-types";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

const addIngredientsCount = (store, payload) => {
  store.commit(`Builder/${UPDATE_CURRENT_PIZZA}`, {
    item: "ingredients",
    payload,
    isAddition: true
  });
};

describe("BuilderIngredientsSelector", () => {
  let store;
  let wrapper;

  const createComponent = options => {
    wrapper = mount(BuilderIngredientsSelector, options);
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

  it("renders sauces selectors", async () => {
    createComponent({ localVue, store });
    const selectorsHtml = wrapper.findAll('[data-test="sauce-selector"]');
    expect(Array.from(selectorsHtml).length).toEqual(
      store.state.pizzaData.sauces.length
    );
  });

  it('sauce checked prop is "tomato" by default', () => {
    createComponent({ localVue, store });
    const selector = wrapper.find('[data-test="sauce-selector"]');
    expect(selector.vm.$props.checked).toContain("tomato");
  });

  it("calls the vuex mutation on sauce selector change", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updatePizza");
    const selector = wrapper.find('[data-test="sauce-selector"]');
    selector.vm.$emit("updateData", "test");
    expect(spyOnMutation).toHaveBeenCalledWith({
      item: "sauce",
      payload: "test"
    });
  });

  it("renders ingredients items", async () => {
    createComponent({ localVue, store });
    const itemsHtml = wrapper.findAll('[data-test="ingredients-item"]');
    expect(Array.from(itemsHtml).length).toEqual(
      store.state.pizzaData.ingredients.length
    );
  });

  it("shows ingredient class", () => {
    createComponent({ localVue, store });
    const ingredient = wrapper.find('[data-test="ingredient"]');
    expect(ingredient.exists()).toBeTruthy();
    expect(ingredient.attributes("class")).toContain("filling--mushrooms");
  });

  it("ingredient is draggable if count less than max ingredients count", () => {
    addIngredientsCount(store, "ananas");
    createComponent({ localVue, store });
    const ingredient = wrapper.find(".filling--ananas");
    expect(ingredient.element.draggable).toBeTruthy();
  });

  it("ingredient is not draggable if count equals max ingredients count", () => {
    addIngredientsCount(store, "ananas");
    addIngredientsCount(store, "ananas");
    createComponent({ localVue, store });
    const ingredient = wrapper.find(".filling--ananas");
    expect(ingredient.element.draggable).toBeFalsy();
  });

  it("shows correct ingredient count", () => {
    addIngredientsCount(store, "mushrooms");
    createComponent({ localVue, store });
    const counter = wrapper.find('[data-test="ingredients-counter"]');
    expect(counter.exists()).toBeTruthy();
    expect(counter.vm.$props.value).toEqual(1);
  });

  it("calls the vuex mutation on ingredients counter minus", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updatePizza");
    const counter = wrapper.find('[data-test="ingredients-counter"]');
    counter.vm.$emit("removeItem");
    expect(spyOnMutation).toHaveBeenCalledWith({
      item: "ingredients",
      payload: "mushrooms"
    });
  });

  it("calls the vuex mutation on ingredients counter plus", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updatePizza");
    const counter = wrapper.find('[data-test="ingredients-counter"]');
    counter.vm.$emit("addItem");
    expect(spyOnMutation).toHaveBeenCalledWith({
      item: "ingredients",
      payload: "mushrooms",
      isAddition: true
    });
  });
});
