<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      required
      :value="title"
      @change="$emit('updateData', $event.target.value)"
    />
  </label>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuilderPizzaTitle",
  computed: {
    ...mapGetters("Builder", ["getPizzaItem"]),
    title() {
      return this.getPizzaItem("title");
    },
  },
};
</script>
