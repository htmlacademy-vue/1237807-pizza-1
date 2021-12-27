<template>
  <div class="layout__sidebar sidebar">
    <router-link to="/" class="logo layout__logo">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>
    <router-link
      to="/orders"
      class="layout__link"
      :class="{ 'layout__link--active': isActive('Orders') }"
    >
      История заказов
    </router-link>
    <router-link
      to="/profile"
      class="layout__link"
      :class="{ 'layout__link--active': isActive('Profile') }"
    >
      Мои данные
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppLayoutSidebar",
  methods: {
    isActive(name) {
      return this.$route.name === name;
    },
  },
};
</script>
