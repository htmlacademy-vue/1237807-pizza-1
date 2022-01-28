import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";
import { dataTypes } from "@/common/constants";

class BaseApiService {
  constructor() {}
}

export class AuthApiService extends BaseApiService {
  constructor() {
    super();
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
  constructor(resource) {
    super(resource);
    this.#resource = resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource) {
    super(resource);
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
  constructor(resource) {
    super(resource);
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
