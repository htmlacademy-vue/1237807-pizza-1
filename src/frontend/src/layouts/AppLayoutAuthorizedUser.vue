<template>
  <div>
    <AppLayoutHeader />
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
};
</script>
