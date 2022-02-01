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
      <router-link to="/cart">{{ orderTotalCost }} ₽</router-link>
    </div>
    <div v-if="showUser" class="header__user">
      <router-link to="/profile">
        <img :src="user.avatar" alt="user.name" width="32" height="32" />
        <span>{{ user.name }}</span>
      </router-link>
      <a class="header__logout" @click="$logout"><span>Выйти</span></a>
    </div>

    <div v-if="showLogin" class="header__user">
      <router-link class="header__login" to="/login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { logout } from "@/common/mixins";

export default {
  name: "AppLayoutHeader",
  mixins: [logout],
  props: {
    showUser: {
      type: Boolean,
      default: true,
    },
    showLogin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(["Auth"]),
    ...mapGetters("Cart", ["orderTotalCost"]),
    user() {
      return this.Auth.user || {};
    },
  },
};
</script>
