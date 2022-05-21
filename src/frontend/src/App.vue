<template>
  <div id="app">
    <AppLayout>
      <transition
        name="view"
        appear
        enter-active-class="animate__animated animate__slideInRight"
      >
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",

  components: {
    AppLayout
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
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
