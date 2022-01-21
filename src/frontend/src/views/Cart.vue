<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <CartPizzasView />
        <CartMiscSelector />
        <CartDeliveryForm />
      </div>
    </main>
    <CartFooter />
  </form>
</template>

<script>
import CartPizzasView from "@/modules/cart/components/CartPizzasView";
import CartMiscSelector from "@/modules/cart/components/CartMiscSelector";
import CartDeliveryForm from "@/modules/cart/components/CartDeliveryForm";
import CartFooter from "@/modules/cart/components/CartFooter";

export default {
  name: "Cart",
  components: {
    CartPizzasView,
    CartMiscSelector,
    CartDeliveryForm,
    CartFooter,
  },
};
</script>
