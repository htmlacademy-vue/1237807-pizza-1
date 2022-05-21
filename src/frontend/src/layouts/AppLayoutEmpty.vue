<template>
  <div class="app-layout-empty">
    <AppError :error="error" />
    <slot />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppLayoutEmpty",

  computed: {
    ...mapState(["error"])
  }
};
</script>
