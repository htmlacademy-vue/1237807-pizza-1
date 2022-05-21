import { shallowMount } from "@vue/test-utils";
import AppLayoutEmpty from "@/layouts/AppLayoutEmpty";
import AppError from "@/common/components/AppError";

const stubs = {
  AppError
};

const slots = {
  default: "test"
};

const mocks = {
  $store: {
    state: {
      error: ""
    }
  }
};

describe("AppLayoutEmpty", () => {
  let wrapper;

  const createComponent = options => {
    wrapper = shallowMount(AppLayoutEmpty, options);
  };

  afterEach(() => {
    wrapper.destroy();
    mocks.$store.state.error = "";
  });

  it("is rendered", () => {
    createComponent({ stubs, slots, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders out the slot content", () => {
    createComponent({ stubs, slots, mocks });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("renders out error", () => {
    mocks.$store.state.error = "Error!";
    createComponent({ stubs, slots, mocks });
    const error = wrapper.findComponent(AppError);
    expect(error.vm.$props.error).toContain("Error!");
  });
});
