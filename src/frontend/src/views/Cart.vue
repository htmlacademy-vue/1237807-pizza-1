<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <CartPizzasView data-test="pizza-view" />
        <CartMiscSelector data-test="misc-selector" />
        <CartDeliveryForm data-test="delivery-form" />
      </div>
    </main>
    <CartFooter data-test="cart-footer" />
    <transition
      name="popup"
      appear
      enter-active-class="animate__animated animate__bounceInDown"
      leave-active-class="animate__animated animate__bounceOutDown"
    >
      <CartPopUp v-if="isPopUp" data-test="pop-up" />
    </transition>
  </form>
</template>

<script>
import { mapState } from "vuex";
import CartPizzasView from "@/modules/cart/components/CartPizzasView";
import CartMiscSelector from "@/modules/cart/components/CartMiscSelector";
import CartDeliveryForm from "@/modules/cart/components/CartDeliveryForm";
import CartFooter from "@/modules/cart/components/CartFooter";
import CartPopUp from "@/modules/cart/components/CartPopUp";

export default {
  name: "Cart",
  components: {
    CartPizzasView,
    CartMiscSelector,
    CartDeliveryForm,
    CartFooter,
    CartPopUp,
  },
  computed: {
    ...mapState("Cart", ["isPopUp"]),
  },
};
</script>
