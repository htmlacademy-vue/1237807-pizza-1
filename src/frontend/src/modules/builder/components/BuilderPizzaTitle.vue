<template>
  <label class="input">
    <span class="visually-hidden"> Название пиццы </span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      required
      :value="title"
      @change="updatePizza({ item: 'title', payload: $event.target.value })"
    />
  </label>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { UPDATE_CURRENT_PIZZA } from "@/store/mutations-types";

export default {
  name: "BuilderPizzaTitle",

  computed: {
    ...mapGetters("Builder", ["getPizzaItem"]),

    title() {
      return this.getPizzaItem("title");
    }
  },

  methods: {
    ...mapMutations("Builder", {
      updatePizza: UPDATE_CURRENT_PIZZA
    })
  }
};
</script>
