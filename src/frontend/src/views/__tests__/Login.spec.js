import { mount, createLocalVue } from "@vue/test-utils";
import $validator from "@/common/mixins/validator";
import Login from "@/views/Login";
import Button from "@/common/components/Button";
import Input from "@/common/components/Input";

const localVue = createLocalVue();

localVue.component("Button", Button);
localVue.component("Input", Input);

describe("Login", () => {
  let routerPush;
  let dispatch;
  let login;

  const methods = {
    login,
  };

  const mocks = {
    $router: {
      push: routerPush,
    },
    $store: {
      dispatch,
    },
    $validator,
  };

  const stubs = ["router-link"];

  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    routerPush = jest.fn();
    dispatch = jest.fn();
    login = jest.fn();
    methods.login = login;
    mocks.$router.push = routerPush;
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("validation mixin has been called on form submit", async () => {
    createComponent({ localVue, mocks, stubs });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    await wrapper.find("form").trigger("submit");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("calls login and redirects to index if credentials are valid", async () => {
    createComponent({ localVue, mocks, stubs });
    const emailInput = wrapper.find('[data-test="email-input"]').find("input");
    const passInput = wrapper
      .find('[data-test="password-input"]')
      .find("input");

    emailInput.element.value = "user@example.com";
    await emailInput.trigger("input");
    passInput.element.value = "user@example.com";
    await passInput.trigger("input");

    await wrapper.find("form").trigger("submit");
    expect(dispatch).toHaveBeenCalled();
    expect(routerPush).toHaveBeenCalledWith("/");
  });
});
