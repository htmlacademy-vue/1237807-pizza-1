<template>
  <input
    type="radio"
    :name="name"
    :value="value"
    class="visually-hidden"
    :checked="isChecked"
    @change="
      $emit('updatePizzaOrder', { payload: $event.target.value, action: name })
    "
  />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
    },
  },
};
</script>
