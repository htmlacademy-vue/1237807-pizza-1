<template>
  <section class="footer">
    <div class="footer__more">
      <router-link class="button button--border button--arrow" to="/">
        Хочу еще одну
      </router-link>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ orderTotalCost }} ₽</b>
    </div>
    <div class="footer__submit">
      <button
        type="submit"
        class="button"
        :disabled="disabled"
        @click.prevent="openPopUp"
      >
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { SET_POP_UP } from "@/store/mutations-types";

export default {
  name: "CartFooter",
  computed: {
    ...mapGetters("Cart", ["orderTotalCost"]),
    disabled() {
      return this.orderTotalCost === 0;
    },
  },
  methods: {
    ...mapMutations("Cart", {
      setPopUp: SET_POP_UP,
    }),
    openPopUp() {
      return this.setPopUp(true);
    },
  },
};
</script>
