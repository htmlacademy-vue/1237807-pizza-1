import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import { authenticateUser } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppLayoutHeader", () => {
  const mocks = {
    $router: {
      push: jest.fn()
    }
  };

  const stubs = ["router-link"];

  let actions;
  let store;
  let wrapper;

  const createComponent = options => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn()
      }
    };
    mocks.$router.push = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders header user", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const headerUser = wrapper.find('[data-test="header-user"]');
    expect(headerUser.exists()).toBeTruthy();
  });

  it("doesn't render header user", () => {
    createComponent({ localVue, store, mocks, stubs });
    const headerMenu = wrapper.find('[data-test="header-user"]');
    expect(headerMenu.exists()).toBeFalsy();
  });

  it("renders link to profile", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.html()).toContain('to="/profile"');
  });

  it("doesn't render link to profile", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.html()).not.toContain('to="/profile"');
  });

  it("calls logout on logout button click", async () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store, stubs });
    const logoutBtn = wrapper.find('[data-test="logout-btn"]');
    await logoutBtn.trigger("click");
    expect(actions.Auth.logout).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/login");
  });

  it("renders login button", () => {
    createComponent({ localVue, store, mocks, stubs });
    const loginBtn = wrapper.find('[data-test="login-btn"]');
    expect(loginBtn.exists()).toBeTruthy();
  });

  it("doesn't render login button", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const loginBtn = wrapper.find('[data-test="login-btn"]');
    expect(loginBtn.exists()).toBeFalsy();
  });
});
