<template>
  <div class="app-layout-default">
    <AppLayoutHeader />
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
};
</script>

<style lang="scss">
.app-layout-default {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
