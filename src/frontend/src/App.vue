<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };
    this.unwatch = this.$store.watch(
      (state) => state.Auth.isAuthenticated,
      (newValue) => {
        if (newValue === true) {
          this.$store.dispatch("Addresses/query");
        }
      }
    );

    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("init");
  },
  beforeDestroy() {
    this.unwatch();
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
