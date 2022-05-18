import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import ProfileAddressView from "@/modules/profile/components/ProfileAddressView";

const localVue = createLocalVue();
localVue.use(Vuex);

const propsData = {
  address: {
    id: 1,
    name: "Тестовый адрес",
    street: "улица Тестовая",
    building: "11",
    flat: "1",
    comment: "Привет",
    userId: "string",
  },
};

describe("ProfileAddressView", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(ProfileAddressView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders address name", async () => {
    createComponent({ localVue, store, propsData });
    const addressName = wrapper.find("b");
    expect(addressName.text()).toBe(propsData.address.name);
  });

  it("renders full address", async () => {
    createComponent({ localVue, store, propsData });
    const fullAddress = wrapper.find("p");
    expect(fullAddress.text()).toBe(
      `${propsData.address.street}, д. ${propsData.address.building}, кв. ${propsData.address.flat}`
    );
  });

  it("renders address comment", async () => {
    createComponent({ localVue, store, propsData });
    const addressComment = wrapper.find("small");
    expect(addressComment.text()).toBe(propsData.address.comment);
  });

  it("doesn't render address form when is not edited", async () => {
    createComponent({ localVue, store, propsData });
    const addressText = wrapper.find('[data-test="address-text"]');
    const addressForm = wrapper.find('[data-test="address-form"]');
    expect(addressText.exists()).toBeTruthy();
    expect(addressForm.exists()).toBeFalsy();
  });

  it("open address form on click open button", async () => {
    createComponent({ localVue, store, propsData });
    const openButton = wrapper.find('[data-test="open-btn"]');
    await openButton.trigger("click");
    const addressText = wrapper.find('[data-test="address-text"]');
    const addressForm = wrapper.find('[data-test="address-form"]');
    expect(addressText.exists()).toBeFalsy();
    expect(addressForm.exists()).toBeTruthy();
  });

  it("closes address form on close emit", async () => {
    createComponent({ localVue, store, propsData });
    await wrapper.setData({ isEdited: true });
    const addressForm = wrapper.find('[data-test="address-form"]');
    expect(addressForm.exists()).toBeTruthy();
    addressForm.vm.$emit("close");
    expect(wrapper.vm.isEdited).toBeFalsy();
  });
});
