import { shallowMount } from "@vue/test-utils";
import AppLayoutSideBar from "@/layouts/AppLayoutSideBar";

describe("AppLayoutSideBar", () => {
  const stubs = ["router-link"];
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutSideBar, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders orders button", () => {
    createComponent({ stubs });
    const loginBtn = wrapper.find('[data-test="orders-btn"]');
    expect(loginBtn.exists()).toBeTruthy();
  });

  it("renders profile button", () => {
    createComponent({ stubs });
    const loginBtn = wrapper.find('[data-test="profile-btn"]');
    expect(loginBtn.exists()).toBeTruthy();
  });
});
