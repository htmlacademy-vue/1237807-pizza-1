import { shallowMount } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout";
import Error from "@/common/components/Error";

const mocks = {
  $store: {
    state: {
      error: "",
    },
  },
  $route: {
    meta: {
      layout: "",
    },
  },
};
const stubs = {
  Error,
};

describe("AppLayout", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  it("is rendered", () => {
    createComponent({ stubs, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });
});
