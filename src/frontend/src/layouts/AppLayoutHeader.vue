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
        <picture>
          <source
            type="image/webp"
            :srcset="`${userAvatar}.webp 1x, ${userAvatar}@2x.webp 2x`"
          />
          <img
            :src="`${userAvatar}.jpg`"
            :srcset="`${userAvatar}@2x.jpg`"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <a class="header__logout" @click="$logout"><span>Выйти</span></a>
    </div>

    <div v-else class="header__user">
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
  computed: {
    ...mapState(["Auth"]),
    ...mapState("Cart", ["pizzasOrder", "miscOrder"]),
    ...mapGetters("Auth", ["getUserAvatar"]),
    ...mapGetters(["getOrderCost"]),
    orderTotalCost() {
      return this.getOrderCost({
        miscOrder: this.miscOrder,
        pizzasOrder: this.pizzasOrder,
      });
    },
    user() {
      return this.Auth.user;
    },
    userAvatar() {
      return this.getUserAvatar;
    },
    showUser() {
      return this.Auth.isAuthenticated;
    },
  },
};
</script>
