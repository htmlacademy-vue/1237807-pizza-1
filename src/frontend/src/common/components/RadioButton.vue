<template>
  <input
    type="radio"
    :name="name"
    :value="value"
    class="visually-hidden"
    :checked="isChecked"
    @change="$emit('updateData', $event.target.value)"
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
