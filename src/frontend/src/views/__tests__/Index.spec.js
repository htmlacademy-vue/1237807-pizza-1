import { shallowMount } from "@vue/test-utils";
import Index from "@/views/index/Index.vue";

describe("Index", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(Index, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", async () => {
    createComponent();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders dough selector", async () => {
    createComponent();
    const doughSelectorHtml = wrapper.findAll('[data-test="dough-selector"]');
    expect(doughSelectorHtml.exists()).toBeTruthy();
  });

  it("renders size selector", async () => {
    createComponent();
    const sizeSelectorHtml = wrapper.findAll('[data-test="size-selector"]');
    expect(sizeSelectorHtml.exists()).toBeTruthy();
  });

  it("renders ingredients selector", async () => {
    createComponent();
    const ingredientsSelectorHtml = wrapper.findAll(
      '[data-test="ingredients-selector"]'
    );
    expect(ingredientsSelectorHtml.exists()).toBeTruthy();
  });

  it("renders pizza title", async () => {
    createComponent();
    const pizzaTitleHtml = wrapper.findAll('[data-test="pizza-title"]');
    expect(pizzaTitleHtml.exists()).toBeTruthy();
  });

  it("renders pizza view", async () => {
    createComponent();
    const pizzaViewHtml = wrapper.findAll('[data-test="pizza-view"]');
    expect(pizzaViewHtml.exists()).toBeTruthy();
  });

  it("renders price counter", async () => {
    createComponent();
    const priceCounterHtml = wrapper.findAll('[data-test="price-counter"]');
    expect(priceCounterHtml.exists()).toBeTruthy();
  });
});
