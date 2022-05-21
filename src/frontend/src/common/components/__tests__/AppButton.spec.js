import { shallowMount } from "@vue/test-utils";
import AppButton from "@/common/components/AppButton";

describe("AppButton", () => {
  const slots = { default: "content" };
  const defaultBtnType = "button";
  const propsData = { type: "submit" };
  const listeners = { click: null };

  let wrapper;

  const createComponent = options => {
    wrapper = shallowMount(AppButton, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("raises the click event on click", async () => {
    createComponent({ listeners });
    await wrapper.find("button").trigger("click");
    expect(listeners.click).toHaveBeenCalled();
  });

  it("button default type is button", () => {
    createComponent();
    expect(wrapper.attributes("type")).toBe(defaultBtnType);
  });

  it("button type is prop type", () => {
    createComponent({ propsData });
    expect(wrapper.attributes("type")).toBe(propsData.type);
  });

  it("button is not disabled by default", () => {
    createComponent();
    expect(wrapper.attributes("disabled")).toBeUndefined();
  });

  it("button is disabled by prop", () => {
    propsData.disabled = true;
    createComponent({ propsData });
    expect(wrapper.attributes("disabled")).toEqual("disabled");
  });
});
