<template>
  <button
    class="button"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton",

  props: {
    type: {
      type: String,
      default: "button"
    },

    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
