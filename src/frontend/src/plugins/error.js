export default class Error {
  #store;
  constructor(store) {
    this.#store = store;
  }

  create(text) {
    this.#store.dispatch("createError", text);
  }
}
