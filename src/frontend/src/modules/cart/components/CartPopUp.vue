<template>
  <div
    class="wrapper"
    @animationend="redirect"
  >
    <div class="popup">
      <a
        href="#"
        class="close"
        data-test="close-button"
        @click.prevent="closePopUp"
      >
        <span class="visually-hidden"> Закрыть попап </span>
      </a>
      <div class="popup__title">
        <h2 class="title">
          Спасибо за заказ
        </h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a
          href="#"
          class="button"
          data-test="confirm-button"
          @click.prevent="closePopUp"
        >
          Отлично, я жду!
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { SET_POP_UP } from "@/store/mutations-types";
import { FINAL_ANIMATION_NAME } from "@/common/constants";

export default {
  name: "CartPopUp",

  computed: {
    ...mapState("Auth", ["isAuthenticated"])
  },

  methods: {
    ...mapMutations("Cart", {
      setPopUp: SET_POP_UP
    }),

    redirect(e) {
      if (e.animationName === FINAL_ANIMATION_NAME) {
        if (this.isAuthenticated) {
          this.$router.push("/orders");
        } else {
          this.$router.push("/");
        }
      }
    },

    closePopUp() {
      this.setPopUp(false);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: auto;
}
.popup {
  position: fixed;
}
</style>
