<template>
  <component :is="layout" :total="total">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutDefault";
const emptyLayout = "AppLayoutEmpty";

export default {
  name: "AppLayout",
  props: {
    sum: {
      type: Number,
      required: true,
    },
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
    total() {
      if (this.$route.meta.layout === emptyLayout) {
        return;
      }
      return this.sum;
    },
  },
};
</script>
