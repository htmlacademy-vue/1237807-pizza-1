import { shallowMount } from "@vue/test-utils";
import Input from "@/common/components/Input";

describe("Input", () => {
  const errorClass = "error__input";
  const propsData = {
    value: "testValue",
    name: "testName",
    label: "testLabel",
    type: "text",
    placeholder: "Test",
    errorText: "Error",
    required: true,
    hideLabel: true,
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(Input, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets the initial model value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("It emits an input event when typing", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    await input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("emits the current input value when typing", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    input.element.value = "test";
    await input.trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual("test");
  });

  it("input name is prop name", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("name")).toBe(propsData.name);
  });

  it("input type is prop type", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("type")).toBe(propsData.type);
  });

  it("input placeholder is prop placeholder", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("placeholder")).toBe(propsData.placeholder);
  });

  it("input is required", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("required")).toEqual("required");
  });

  it("has error class", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("class")).toContain(errorClass);
  });

  it("has error message", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain(propsData.errorText);
  });

  it("does not have error message", () => {
    propsData.errorText = "";
    createComponent({ propsData });
    expect(wrapper.html()).not.toContain("Error");
  });

  it("label is prop label", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain(propsData.label);
  });

  it("label is hidden", () => {
    createComponent({ propsData });
    expect(wrapper.find("span.visually-hidden").exists()).toBe(true);
  });

  it("label is not hidden", () => {
    propsData.hideLabel = false;
    createComponent({ propsData });
    expect(wrapper.find("span.visually-hidden").exists()).toBe(false);
  });
});
