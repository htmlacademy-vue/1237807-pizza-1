import { shallowMount } from "@vue/test-utils";
import Error from "@/common/components/Error";

describe("Error", () => {
  const mocks = {
    $store: {
      state: {
        error: "",
      },
    },
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(Error, options);
  };

  afterEach(() => {
    wrapper.destroy();
    mocks.$store.state.error = "";
  });

  it("doesn't render out when no error", () => {
    createComponent({ mocks });
    expect(wrapper.html()).toBeFalsy();
  });

  it("renders out when we have error", () => {
    mocks.$store.state.error = "It's error!";
    createComponent({ mocks });
    expect(wrapper.html()).toBeTruthy();
  });

  it("renders out error", () => {
    mocks.$store.state.error = "It's error!";
    createComponent({ mocks });
    expect(wrapper.html()).toContain("It's error!");
  });
});
