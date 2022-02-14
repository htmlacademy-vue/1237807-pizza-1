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

    this.$store.dispatch("init").then(() => {
      if (this.$jwt.getToken()) {
        setAuth(this.$store);
        this.$store.dispatch("fetchAuthorizedOnlyData");
      }
    });
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
