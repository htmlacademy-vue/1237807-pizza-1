<template>
  <div class="app-layout-default">
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
};
</script>

<style lang="scss">
.app-layout-default {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
