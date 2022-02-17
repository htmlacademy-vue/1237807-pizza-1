import { shallowMount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter", () => {
  const propsData = {
    value: 1,
    maxCount: 3,
    buttonClass: "counter__button--orange",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets the prop value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(
      propsData.value.toString()
    );
  });

  it("Buttons have prop class", () => {
    createComponent({ propsData });
    let minusButton = wrapper.find("button.counter__button--minus");
    let plusButton = wrapper.find("button.counter__button--plus");
    expect(minusButton.attributes("class")).toContain(propsData.buttonClass);
    expect(plusButton.attributes("class")).toContain(propsData.buttonClass);
  });

  it("It emits an removeItem event when click on minus button", async () => {
    createComponent({ propsData });
    let minusButton = wrapper.find("button.counter__button--minus");
    await minusButton.trigger("click");
    expect(wrapper.emitted().removeItem).toBeTruthy();
  });

  it("It emits an addItem event when click on plus button", async () => {
    createComponent({ propsData });
    let plusButton = wrapper.find("button.counter__button--plus");
    await plusButton.trigger("click");
    expect(wrapper.emitted().addItem).toBeTruthy();
  });

  it("Minus button disabled when value equals 0", async () => {
    propsData.value = 0;
    createComponent({ propsData });
    let minusButton = wrapper.find("button.counter__button--minus");
    expect(minusButton.attributes("disabled")).toEqual("disabled");
  });

  it("Plus button disabled when value equals maxCount", async () => {
    propsData.value = propsData.maxCount;
    createComponent({ propsData });
    let plusButton = wrapper.find("button.counter__button--plus");
    expect(plusButton.attributes("disabled")).toEqual("disabled");
  });
});
