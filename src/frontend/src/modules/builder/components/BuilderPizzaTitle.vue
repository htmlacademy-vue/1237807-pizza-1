<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      required
      :value="title"
      @change="$emit('updatePizzaTitle', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "BuilderPizzaTitle",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
