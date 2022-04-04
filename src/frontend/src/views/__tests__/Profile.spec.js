import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import Profile from "@/views/Profile.vue";
import { authenticateUser } from '@/common/helpers';

const localVue = createLocalVue();

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

describe("Profile", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Profile, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    authenticateUser(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders addresses", async () => {
    createAddresses(store);
    createComponent({ localVue, store });
    const addressesHtml = wrapper.findAll('[data-test="addresses"]');
    expect(Array.from(addressesHtml).length).toEqual(addresses.length);
  });

  it("doesn't render addresses", async () => {
    createComponent({ localVue, store });
    const addressesHtml = wrapper.findAll('[data-test="addresses"]');
    expect(addressesHtml.exists()).toBeFalsy();
  });

  it("renders no-addresses text", async () => {
    createComponent({ localVue, store });
    const text = wrapper.findAll('[data-test="no-addresses-text"]');
    expect(text.exists()).toBeTruthy();
  });

  it("doesn't render no-addresses text", async () => {
    createAddresses(store);
    createComponent({ localVue, store });
    const text = wrapper.findAll('[data-test="no-addresses-text"]');
    expect(text.exists()).toBeFalsy();
  });

  it ('renders address form on add button click', async () => {
    createComponent({ localVue, store });
    const btn = wrapper.find('[data-test="add-address-btn"]');
    await btn.trigger('click');
    const addressForm = wrapper.find('[data-test="address-form"]');
    expect(addressForm.exists()).toBeTruthy();
  });

  it ('doesn\'t renders address form', async () => {
    createComponent({ localVue, store });
    const addressForm = wrapper.find('[data-test="address-form"]');
    expect(addressForm.exists()).toBeFalsy();
  });
});
