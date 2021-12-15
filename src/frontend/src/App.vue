<template>
  <div id="app">
    <AppLayoutHeader total="5" />
    <Index />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import Index from "@/views/Index";

export default {
  name: "App",
  components: {
    AppLayoutHeader,
    Index,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
