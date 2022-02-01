<template>
  <div class="app-layout-default">
    <Error />
    <AppLayoutHeader
      :show-user="isAuthenticated"
      :show-login="!isAuthenticated && $route.name !== 'Login'"
    />
    <slot />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutDefault",
  components: {
    AppLayoutHeader,
  },
  computed: {
    ...mapState(["Auth"]),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
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
