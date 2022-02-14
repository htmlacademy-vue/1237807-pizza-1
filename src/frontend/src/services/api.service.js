import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";
import { dataTypes } from "@/common/constants";
import {
  getId,
  getValueById,
  countItemsInArray,
  getRequestDataFromObject,
  getIngredientsArray,
  getObjectFromResponseData,
} from "@/common/helpers";

class BaseApiService {
  constructor(error) {
    if (!axios.$error) {
      axios.$error = error;
    }
  }
}

export class AuthApiService extends BaseApiService {
  constructor(error) {
    super(error);
  }

  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource, error) {
    super(resource, error);
    this.#resource = resource;
  }

  async query() {
    const { data } = await axios.get(this.#resource);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, error) {
    super(resource, error);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class DataApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, error) {
    super(resource, error);
    this.#resource = resource;
  }

  _normalize(data, items) {
    const requiredItem = items.find((item) => item.name === data.name);

    return {
      ...data,
      type: requiredItem.type,
      value: requiredItem.value,
    };
  }

  async query() {
    const data = await super.query();
    return data.map((item) => this._normalize(item, dataTypes[this.#resource]));
  }
}

export class OrdersApiService extends CrudApiService {
  #resource;
  #store;
  constructor(resource, error, store) {
    super(resource, error);
    this.#resource = resource;
    this.#store = store;
  }

  _normalize(order) {
    const pizzasOrder = !order.orderPizzas
      ? []
      : order.orderPizzas.map((pizza) => {
          return {
            id: pizza.id,
            title: pizza.name,
            sauce: getValueById(
              this.#store.state.pizzaData.sauces,
              pizza.sauceId
            ),
            dough: getValueById(
              this.#store.state.pizzaData.dough,
              pizza.doughId
            ),
            diameter: getValueById(
              this.#store.state.pizzaData.sizes,
              pizza.sizeId
            ),
            count: pizza.quantity,
            ingredients: getIngredientsArray(
              pizza.ingredients,
              this.#store.state.pizzaData.ingredients
            ),
          };
        });

    const miscOrder = getObjectFromResponseData(
      order.orderMisc,
      this.#store.state.miscData
    );

    const address = order.orderAddress || null;
    /* eslint-disable-next-line */
    const { orderPizzas, orderMisc, orderAddress, addressId, ...response } =
      order;

    return { ...response, pizzasOrder, miscOrder, address };
  }

  _createRequest(order) {
    const pizzas = order.pizzasOrder.map((pizza) => {
      return {
        name: pizza.title,
        sauceId: getId(this.#store.state.pizzaData.sauces, pizza.sauce),
        doughId: getId(this.#store.state.pizzaData.dough, pizza.dough),
        sizeId: getId(this.#store.state.pizzaData.sizes, pizza.diameter),
        quantity: pizza.count,
        ingredients: getRequestDataFromObject(
          countItemsInArray(pizza.ingredients),
          this.#store.state.pizzaData.ingredients,
          "ingredientId"
        ),
      };
    });
    const misc = getRequestDataFromObject(
      order.miscOrder,
      this.#store.state.miscData,
      "miscId"
    );

    let address = order.address || null;

    if (order.address?.validations) {
      /* eslint-disable-next-line */
      const { validations, ...rest } = order.address;
      address = rest;
    }
    /* eslint-disable-next-line */
    const { pizzasOrder, miscOrder, ...request } = order;

    return { ...request, address, pizzas, misc };
  }

  async query() {
    const data = await super.query();
    return data.map((item) => this._normalize(item));
  }

  async post(order) {
    const newOrder = await super.post(this._createRequest(order));
    return newOrder;
  }
}
