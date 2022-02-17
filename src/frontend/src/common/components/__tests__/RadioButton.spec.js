import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/common/components/RadioButton";

describe("RadioButton", () => {
  const propsData = {
    value: "testValue",
    name: "testName",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets the props value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("input name is prop name", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("name")).toBe(propsData.name);
  });

  it("It emits updateData event when change", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    await input.trigger("change");
    expect(wrapper.emitted().updateData).toBeTruthy();
  });

  it("input is checked by prop", () => {
    propsData.isChecked = true;
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.element.checked).toBeTruthy();
  });
});
