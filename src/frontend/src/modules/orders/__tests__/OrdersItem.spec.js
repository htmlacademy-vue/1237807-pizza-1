import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import OrdersItem from "@/modules/orders/components/OrdersItem";

const localVue = createLocalVue();
localVue.use(Vuex);

const propsData = {
  order: {
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
    phone: "1234567",
  },
};

describe("OrdersItem", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(OrdersItem, options);
  };

  beforeEach(() => {
    mocks.$router.push = jest.fn();
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, propsData, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders order number", () => {
    createComponent({ localVue, store, propsData, mocks });
    const orderNumber = wrapper.find('[data-test="order-number"]').find("b");
    expect(orderNumber.text()).toBe(`Заказ #${propsData.order.id}`);
  });

  it("renders order sum", () => {
    createComponent({ localVue, store, propsData, mocks });
    const orderCost = store.getters.getOrderCost(propsData.order);
    const orderSum = wrapper.find('[data-test="order-sum"]').find("span");
    expect(orderSum.text()).toBe(`Сумма заказа: ${orderCost} ₽`);
  });

  it("calls delete action on click on delete button", async () => {
    createComponent({ localVue, store, propsData, mocks });
    const spyOnDeleteOrder = jest.spyOn(wrapper.vm, "delete");
    const deleteButton = wrapper.find('[data-test="delete-button"]');
    await deleteButton.trigger("click");
    expect(spyOnDeleteOrder).toHaveBeenCalledWith(propsData.order.id);
  });

  it("calls the vuex mutation and redirect to cart on click on repeat button", async () => {
    createComponent({ localVue, store, propsData, mocks });
    const spyOnMutation = jest.spyOn(wrapper.vm, "setCart");
    const repeatButton = wrapper.find('[data-test="repeat-button"]');
    await repeatButton.trigger("click");
    expect(spyOnMutation).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/cart");
  });

  it("renders pizza order items", async () => {
    createComponent({ localVue, store, propsData, mocks });
    const pizzaItemsHtml = wrapper.findAll('[data-test="pizza-item"]');
    expect(Array.from(pizzaItemsHtml).length).toEqual(
      propsData.order.pizzasOrder.length
    );
  });

  it("renders misc order items", async () => {
    createComponent({ localVue, store, propsData, mocks });
    const miscItemsHtml = wrapper.findAll('[data-test="misc-item"]');
    expect(Array.from(miscItemsHtml).length).toEqual(
      Object.keys(propsData.order.miscOrder).length
    );
  });

  it("renders order address", async () => {
    createComponent({ localVue, store, propsData, mocks });
    const orderAddress = wrapper.find('[data-test="address"]');
    expect(orderAddress.text()).toBe(
      `Адрес доставки: ${propsData.order.address.name}`
    );
  });

  it("renders address as 'Самовывоз' when no address in order", async () => {
    const newProps = { order: { ...propsData.order, address: {} } };
    createComponent({ localVue, store, propsData: newProps, mocks });
    const orderAddress = wrapper.find('[data-test="address"]');
    expect(orderAddress.text()).toBe("Адрес доставки: Самовывоз");
  });
});
