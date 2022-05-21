import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import CartDeliveryAddress from "@/modules/cart/components/CartDeliveryAddress";
import AppInput from "@/common/components/AppInput";

const localVue = createLocalVue();

localVue.component("AppInput", AppInput);

localVue.use(Vuex);

const mockAddress = {
  name: "Тестовый адрес",
  street: "улица Тестовая",
  building: "11",
  flat: "1",
  comment: "",
  userId: "uuid"
};

const addAddress = (store, payload) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "address",
    value: payload
  });
};

describe("CartDeliveryAddress", () => {
  let store;
  let wrapper;

  const createComponent = options => {
    wrapper = mount(CartDeliveryAddress, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders default text in address name if no address", () => {
    createComponent({ localVue, store });
    const label = wrapper.find('[data-test="address-name"]');
    expect(label.text()).toBe("Новый адрес:");
  });

  it("renders address name", () => {
    addAddress(store, mockAddress);
    createComponent({ localVue, store });
    const label = wrapper.find('[data-test="address-name"]');
    expect(label.text()).toBe(mockAddress.name);
  });

  it("sets the initial model values", () => {
    addAddress(store, mockAddress);
    createComponent({ localVue, store });
    const streetInput = wrapper.find('[data-test="street-input"]');
    const buildingInput = wrapper.find('[data-test="building-input"]');
    const flatInput = wrapper.find('[data-test="flat-input"]');
    expect(streetInput.vm.$props.value).toBe(mockAddress.street);
    expect(buildingInput.vm.$props.value).toBe(mockAddress.building);
    expect(flatInput.vm.$props.value).toBe(mockAddress.flat);
  });

  it("inputs are not disabled if address is new", () => {
    addAddress(store, mockAddress);
    createComponent({ localVue, store });
    const streetInput = wrapper.find('[data-test="street-input"]');
    const buildingInput = wrapper.find('[data-test="building-input"]');
    const flatInput = wrapper.find('[data-test="flat-input"]');
    expect(streetInput.vm.$props.disabled).toBeFalsy();
    expect(buildingInput.vm.$props.disabled).toBeFalsy();
    expect(flatInput.vm.$props.disabled).toBeFalsy();
  });

  it("inputs are disabled if an existing address is selected", () => {
    addAddress(store, { ...mockAddress, id: 1 });
    createComponent({ localVue, store });
    const streetInput = wrapper.find('[data-test="street-input"]');
    const buildingInput = wrapper.find('[data-test="building-input"]');
    const flatInput = wrapper.find('[data-test="flat-input"]');
    expect(streetInput.vm.$props.disabled).toBeTruthy();
    expect(buildingInput.vm.$props.disabled).toBeTruthy();
    expect(flatInput.vm.$props.disabled).toBeTruthy();
  });

  it("street input has error message when street is empty", () => {
    addAddress(store, {
      ...mockAddress,
      street: "",
      validations: { street: { error: "Поле обязательно для заполнения" } }
    });
    createComponent({ localVue, store });
    const streetInput = wrapper.find('[data-test="street-input"]');
    expect(streetInput.vm.$props.errorText).toBe(
      "Поле обязательно для заполнения"
    );
  });

  it("building input has error message when building is empty", () => {
    addAddress(store, {
      ...mockAddress,
      building: "",
      validations: { building: { error: "Поле обязательно для заполнения" } }
    });
    createComponent({ localVue, store });
    const buildingInput = wrapper.find('[data-test="building-input"]');
    expect(buildingInput.vm.$props.errorText).toBe(
      "Поле обязательно для заполнения"
    );
  });

  it("calls the vuex mutation on change street input", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updateAddress");
    const streetInput = wrapper
      .find('[data-test="street-input"]')
      .find("input");
    streetInput.element.value = "test";
    await streetInput.trigger("input");
    expect(spyOnMutation).toHaveBeenCalledWith({
      key: "street",
      value: "test"
    });
  });

  it("calls the vuex mutation on change building input", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updateAddress");
    const buildingInput = wrapper
      .find('[data-test="building-input"]')
      .find("input");
    buildingInput.element.value = "test";
    await buildingInput.trigger("input");
    expect(spyOnMutation).toHaveBeenCalledWith({
      key: "building",
      value: "test"
    });
  });

  it("calls the vuex mutation on change flat input", async () => {
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "updateAddress");
    const flatInput = wrapper.find('[data-test="flat-input"]').find("input");
    flatInput.element.value = "test";
    await flatInput.trigger("input");
    expect(spyOnMutation).toHaveBeenCalledWith({
      key: "flat",
      value: "test"
    });
  });
});
