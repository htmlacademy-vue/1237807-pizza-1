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
      <Button type="submit" :disabled="disabled" @click.prevent="submit">
        Оформить заказ
      </Button>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import {
  SET_POP_UP,
  RESET_CART,
  RESET_CURRENT_PIZZA,
} from "@/store/mutations-types";
import validator from "@/common/mixins/validator";

export default {
  name: "CartFooter",
  mixins: [validator],
  computed: {
    ...mapGetters(["getOrderCost"]),
    ...mapState("Auth", ["user", "isAuthenticated"]),
    ...mapState("Cart", ["pizzasOrder", "miscOrder", "address", "phone"]),
    orderTotalCost() {
      return this.getOrderCost({
        miscOrder: this.miscOrder,
        pizzasOrder: this.pizzasOrder,
      });
    },
    isFormInvalid() {
      return (
        this.address.validations?.street.error.length > 0 ||
        this.address.validations?.building.error.length > 0
      );
    },
    disabled() {
      return this.orderTotalCost === 0 || this.isFormInvalid;
    },
    finalOrder() {
      return {
        userId: (this.isAuthenticated && this.user?.id) || null,
        phone: this.phone,
        address: (Object.keys(this.address).length && this.address) || null,
        pizzasOrder: this.pizzasOrder,
        miscOrder: this.miscOrder,
      };
    },
  },
  methods: {
    ...mapMutations("Cart", {
      setPopUp: SET_POP_UP,
      resetCart: RESET_CART,
    }),
    ...mapMutations("Builder", {
      resetBuilder: RESET_CURRENT_PIZZA,
    }),
    ...mapActions("Orders", {
      orderPost: "post",
    }),
    openPopUp() {
      return this.setPopUp(true);
    },
    async submit() {
      if (
        this.address.validations &&
        !this.$validateFields(
          { street: this.address.street, building: this.address.building },
          this.address.validations
        )
      ) {
        return;
      }

      if (this.finalOrder.userId) {
        await this.orderPost(this.finalOrder);
      }

      this.resetCart();
      this.resetBuilder();
      this.openPopUp();
    },
  },
};
</script>
