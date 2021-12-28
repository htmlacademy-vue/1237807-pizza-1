<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ total }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link class="header__login" to="/login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppLayoutHeader",
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
};
</script>
