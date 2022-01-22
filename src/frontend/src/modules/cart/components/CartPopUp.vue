<template>
  <div class="popup">
    <a href="#" class="close" @click.prevent="closePopUp">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="#" class="button" @click.prevent="closePopUp">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import {
  SET_POP_UP,
  RESET_CART,
  RESET_CURRENT_PIZZA,
} from "@/store/mutations-types";

export default {
  name: "CartPopUp",
  methods: {
    ...mapMutations("Cart", {
      setPopUp: SET_POP_UP,
    }),
    ...mapMutations("Cart", {
      resetCart: RESET_CART,
    }),
    ...mapMutations("Builder", {
      resetBuilder: RESET_CURRENT_PIZZA,
    }),
    closePopUp() {
      this.setPopUp(false);
      this.resetCart();
      this.resetBuilder();
      this.$router.push("/");
    },
  },
};
</script>
