import { shallowMount } from "@vue/test-utils";
import AppError from "@/common/components/AppError";

describe("AppError", () => {
  const propsData = {
    error: ""
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppError, options);
  };

  afterEach(() => {
    wrapper.destroy();
    propsData.error = "";
  });

  it("doesn't render out when no error", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toBeFalsy();
  });

  it("renders out when we have error", () => {
    propsData.error = "It's error!";
    createComponent({ propsData });
    expect(wrapper.html()).toBeTruthy();
  });

  it("renders out error", () => {
    propsData.error = "It's error!";
    createComponent({ propsData });
    expect(wrapper.html()).toContain("It's error!");
  });
});
