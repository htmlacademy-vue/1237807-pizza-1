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
import { mapMutations, mapState } from "vuex";
import { SET_POP_UP } from "@/store/mutations-types";

export default {
  name: "CartPopUp",
  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
  },
  methods: {
    ...mapMutations("Cart", {
      setPopUp: SET_POP_UP,
    }),

    closePopUp() {
      this.setPopUp(false);

      if (this.isAuthenticated) {
        this.$router.push("/orders");
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>
