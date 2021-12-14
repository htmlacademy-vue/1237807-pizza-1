<template>
  <label>
    <input
      type="radio"
      :name="name"
      :value="radioData.value"
      class="visually-hidden"
      :checked="radioData.checked"
      v-on="$listeners"
    />
    <b v-if="radioData.description">{{ radioData.name }}</b>
    <span v-if="radioData.description">{{ radioData.description }}</span>
    <span v-else>{{ radioData.name }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    radioData: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
