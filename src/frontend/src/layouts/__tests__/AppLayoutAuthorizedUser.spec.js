import { shallowMount } from "@vue/test-utils";
import AppLayoutAuthorizedUser from "@/layouts/AppLayoutAuthorizedUser";

const slots = {
  default: "test"
};

describe("AppLayoutAuthorizedUser", () => {
  let wrapper;

  const createComponent = options => {
    wrapper = shallowMount(AppLayoutAuthorizedUser, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ slots });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("AppLayoutAuthorizedUser renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
