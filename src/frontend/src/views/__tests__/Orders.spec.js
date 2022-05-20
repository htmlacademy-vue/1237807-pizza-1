import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import Orders from "@/views/Orders.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const normalizedOrders = [
  {
    id: 1,
    pizzasOrder: [
      {
        id: 1,
        title: "Тестовая Пицца",
        sauce: "tomato",
        dough: "large",
        diameter: "small",
        count: 2,
        ingredients: ["bacon", "mushrooms", "cheddar"],
      },
      {
        id: 2,
        title: "Моковая Пицца",
        sauce: "creamy",
        dough: "light",
        diameter: "big",
        count: 1,
        ingredients: ["ham", "onion", "onion", "jalapeno"],
      },
    ],
    miscOrder: {
      cola: 1,
      sauce: 2,
      potato: 4,
    },
    address: {
      name: "Тестовый адрес",
    },
  },
  {
    id: 2,
    pizzasOrder: [
      {
        id: 3,
        title: "Вкусная Пицца",
        sauce: "tomato",
        dough: "light",
        diameter: "normal",
        count: 3,
        ingredients: ["olives", "salmon", "mozzarella"],
      },
    ],
    miscOrder: {
      cola: 3,
      sauce: 0,
      potato: 1,
    },
    address: {
      name: "Новый адрес",
    },
  },
];

const createOrders = (store) => {
  store.commit(SET_ENTITY, {
    module: "Orders",
    entity: "orders",
    value: normalizedOrders,
  });
};

describe("Orders", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Orders, options);
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

  it("renders orders", async () => {
    createOrders(store);
    createComponent({ localVue, store });
    const ordersHtml = wrapper.findAll('[data-test="orders"]');
    expect(Array.from(ordersHtml).length).toEqual(normalizedOrders.length);
  });

  it("doesn't render no-orders text", async () => {
    createOrders(store);
    createComponent({ localVue, store });
    const text = wrapper.findAll('[data-test="no-orders-text"]');
    expect(text.exists()).toBeFalsy();
  });

  it("doesn't render orders", async () => {
    createComponent({ localVue, store });
    const ordersHtml = wrapper.findAll('[data-test="orders"]');
    expect(ordersHtml.exists()).toBeFalsy();
  });

  it("renders no-orders text", async () => {
    createComponent({ localVue, store });
    const text = wrapper.find('[data-test="no-orders-text"]');
    expect(text.exists()).toBeTruthy();
  });
});
