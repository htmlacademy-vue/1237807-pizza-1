import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_CART } from "@/store/mutations-types";
import { authenticateUser } from "@/common/helpers";
import CartFooter from "@/modules/cart/components/CartFooter";
import AppButton from "@/common/components/AppButton";

const localVue = createLocalVue();

localVue.component("AppButton", AppButton);

localVue.use(Vuex);

const mockOrder = {
  pizzasOrder: [
    {
      id: 1,
      title: "Тестовая Пицца",
      sauce: "tomato",
      dough: "large",
      diameter: "small",
      count: 2,
      ingredients: ["bacon", "mushrooms", "cheddar"]
    },
    {
      id: 2,
      title: "Моковая Пицца",
      sauce: "creamy",
      dough: "light",
      diameter: "big",
      count: 1,
      ingredients: ["ham", "onion", "onion", "jalapeno"]
    }
  ],
  miscOrder: {
    cola: 1,
    sauce: 2,
    potato: 4
  },
  address: {
    name: "Тестовый адрес"
  },
  phone: "1234567"
};

const setCartOrder = (store, payload) => {
  store.commit(`Cart/${SET_CART}`, payload);
};

describe("CartFooter", () => {
  let store;
  let wrapper;

  const stubs = ["router-link"];

  const createComponent = options => {
    wrapper = mount(CartFooter, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders order cost", () => {
    setCartOrder(store, mockOrder);
    createComponent({ localVue, store, stubs });
    const orderCost = store.getters.getOrderCost(mockOrder);
    const costHtml = wrapper.find("b");
    expect(costHtml.text()).toBe(`Итого: ${orderCost} ₽`);
  });

  it("submit button disabled when order cost equals 0", () => {
    createComponent({ localVue, store, stubs });
    const submitButton = wrapper.find('[data-test="submit-button"]');
    expect(submitButton.attributes("disabled")).toBeTruthy();
  });

  it("submit button disabled when form invalid", async () => {
    setCartOrder(store, {
      ...mockOrder,
      address: {
        ...mockOrder.address,
        street: "",
        validations: { street: { error: "Поле обязательно для заполнения" } }
      }
    });
    createComponent({ localVue, store, stubs });
    const submitButton = wrapper.find('[data-test="submit-button"]');
    expect(submitButton.attributes("disabled")).toBeTruthy();
  });

  it("submit button is not disabled when order cost exists and form is valid", () => {
    setCartOrder(store, mockOrder);
    createComponent({ localVue, store, stubs });
    const submitButton = wrapper.find('[data-test="submit-button"]');
    expect(submitButton.attributes("disabled")).toBeFalsy();
  });

  it("calls order post action on submit if user authorized", async () => {
    setCartOrder(store, mockOrder);
    authenticateUser(store);
    createComponent({ localVue, store, stubs });
    const spyOnOrderPost = jest.spyOn(wrapper.vm, "orderPost");
    const submitButton = wrapper.find('[data-test="submit-button"]');
    await submitButton.trigger("click");
    expect(spyOnOrderPost).toHaveBeenCalledWith({
      ...mockOrder,
      userId: "uuid"
    });
  });

  it("doesn't call order post action on submit if user not authorized", async () => {
    setCartOrder(store, mockOrder);
    createComponent({ localVue, store, stubs });
    const spyOnOrderPost = jest.spyOn(wrapper.vm, "orderPost");
    const submitButton = wrapper.find('[data-test="submit-button"]');
    await submitButton.trigger("click");
    expect(spyOnOrderPost).not.toHaveBeenCalled();
  });

  it("calls the vuex mutations on submit", async () => {
    setCartOrder(store, mockOrder);
    createComponent({ localVue, store, stubs });
    const spyOnPopUpMutation = jest.spyOn(wrapper.vm, "setPopUp");
    const spyOnResetCartMutation = jest.spyOn(wrapper.vm, "resetCart");
    const spyOnResetBuilderMutation = jest.spyOn(wrapper.vm, "resetBuilder");
    const submitButton = wrapper.find('[data-test="submit-button"]');
    await submitButton.trigger("click");
    expect(spyOnPopUpMutation).toHaveBeenCalled();
    expect(spyOnResetCartMutation).toHaveBeenCalled();
    expect(spyOnResetBuilderMutation).toHaveBeenCalled();
  });
});
