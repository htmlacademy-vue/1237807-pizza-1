import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import CartDeliveryForm from "@/modules/cart/components/CartDeliveryForm";
import Input from "@/common/components/Input";
import { authenticateUser } from "@/common/helpers";

const localVue = createLocalVue();
localVue.component("Input", Input);
localVue.use(Vuex);

const addresses = [
  {
    id: 0,
    name: "Тестовый адрес",
    street: "улица Тестовая",
    building: "11",
    flat: "1",
    comment: "",
    userId: "uuid",
  },
  {
    id: 1,
    name: "Второй адрес",
    street: "улица Ещёодна",
    building: "24",
    flat: "9",
    comment: "Коммент",
    userId: "uuid",
  },
];

const createAddresses = (store) => {
  store.commit(SET_ENTITY, {
    module: "Addresses",
    entity: "addresses",
    value: addresses,
  });
};

describe("CartDeliveryForm", () => {
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(CartDeliveryForm, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        setAddressValue: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders default delivery options if user not authorized", () => {
    createAddresses(store);
    createComponent({ localVue, store });
    const options = wrapper.findAll('[data-test="delivery-option"]');
    expect(Array.from(options).length).toEqual(2);
  });

  it("renders user addresses in options if user authorized", () => {
    createAddresses(store);
    authenticateUser(store);
    createComponent({ localVue, store });
    const options = wrapper.findAll('[data-test="delivery-option"]');
    expect(Array.from(options).length).toEqual(4);
  });

  it("default delivery method is pickup", () => {
    createComponent({ localVue, store });
    const select = wrapper.find('[data-test="delivery-select"]');
    expect(select.element.value).toBe("pickup");
  });

  it("calls the vuex mutation on change delivery method", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updateDeliveryMethod");
    const select = wrapper.find('[data-test="delivery-select"]');
    select.element.value = "new";
    await select.trigger("change");
    expect(spyOnMutation).toHaveBeenCalledWith("new");
  });

  it("set address on change delivery method", async () => {
    createAddresses(store);
    authenticateUser(store);
    createComponent({ localVue, store });
    const select = wrapper.find('[data-test="delivery-select"]');
    select.element.value = "Тестовый адрес";
    await select.trigger("change");
    expect(actions.Cart.setAddressValue).toHaveBeenCalled();
  });

  it("calls the vuex mutation on change phone input", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updatePhoneNumber");
    const phoneInput = wrapper.find('[data-test="phone-input"]').find("input");
    phoneInput.element.value = "test";
    await phoneInput.trigger("input");
    expect(spyOnMutation).toHaveBeenCalledWith("test");
  });

  it("doesn't render address form if delivery method is pickup", async () => {
    createComponent({ localVue, store });
    const addressFormHtml = wrapper.find('[data-test="address-form"]');
    expect(addressFormHtml.exists()).toBeFalsy();
  });

  it("renders address form if delivery method is new", async () => {
    createComponent({ localVue, store });
    const select = wrapper.find('[data-test="delivery-select"]');
    select.element.value = "new";
    await select.trigger("change");
    const addressFormHtml = wrapper.find('[data-test="address-form"]');
    expect(addressFormHtml.exists()).toBeTruthy();
  });

  it("renders address form if user's address is selected", async () => {
    createAddresses(store);
    authenticateUser(store);
    createComponent({ localVue, store });
    const select = wrapper.find('[data-test="delivery-select"]');
    select.element.value = "Тестовый адрес";
    await select.trigger("change");
    const addressFormHtml = wrapper.find('[data-test="address-form"]');
    expect(addressFormHtml.exists()).toBeTruthy();
  });
});
