import { shallowMount } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout";
import AppError from "@/common/components/AppError";

const mocks = {
  $store: {
    state: {
      error: ""
    }
  },
  $route: {
    meta: {
      layout: ""
    }
  }
};

const stubs = {
  AppError
};

describe("AppLayout", () => {
  let wrapper;

  const createComponent = options => {
    wrapper = shallowMount(AppLayout, options);
  };

  it("is rendered", () => {
    createComponent({ stubs, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });
});
