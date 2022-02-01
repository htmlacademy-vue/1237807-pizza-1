<template>
  <button class="button" :type="type" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>
