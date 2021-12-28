<template>
  <div>
    <AppLayoutHeader :total="total" />
    <main class="layout">
      <AppLayoutSideBar />
      <slot />
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppLayoutSideBar from "@/layouts/AppLayoutSideBar";

export default {
  name: "AppLayoutAuthorizedUser",
  components: {
    AppLayoutHeader,
    AppLayoutSideBar,
  },
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
};
</script>
