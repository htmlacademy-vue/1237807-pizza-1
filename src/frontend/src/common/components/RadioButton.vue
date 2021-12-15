<template>
  <input
    type="radio"
    :name="name"
    :value="value"
    class="visually-hidden"
    :checked="isChecked"
    v-on="$listeners"
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

<style lang="scss" scoped></style>
