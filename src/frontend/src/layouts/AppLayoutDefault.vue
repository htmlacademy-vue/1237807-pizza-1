<template>
  <div
    class="app-layout-default"
    :class="{ 'app-layout-default--hidden': backIsHidden }"
  >
    <AppLayoutHeader :total="total" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
export default {
  name: "AppLayoutDefault",
  components: {
    AppLayoutHeader,
  },
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
  computed: {
    backIsHidden() {
      return this.$route.name === "Login";
    },
  },
};
</script>

<style lang="scss">
.app-layout-default {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &--hidden {
    position: relative;

    &::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 3;
    }
  }
}
</style>
