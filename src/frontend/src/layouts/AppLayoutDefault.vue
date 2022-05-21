<template>
  <div class="app-layout-default">
    <AppError :error="error" />
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutDefault",

  components: {
    AppLayoutHeader
  },

  computed: {
    ...mapState(["error"])
  }
};
</script>

<style lang="scss" scoped>
.app-layout-default {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
