<template>
  <div class="cart-form__address">
    <span class="cart-form__label">{{ address.name || "Новый адрес:" }}</span>
    <div class="cart-form__input">
      <Input
        ref="street"
        v-model="address.street"
        name="street"
        label="Улица*"
        :disabled="disabled"
      />
    </div>
    <div class="cart-form__input cart-form__input--small">
      <Input
        ref="building"
        v-model="address.building"
        name="building"
        label="Дом*"
        :disabled="disabled"
      />
    </div>
    <div class="cart-form__input cart-form__input--small">
      <Input
        ref="flat"
        v-model="address.flat"
        name="flat"
        label="Квартира"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CartDeliveryAddress",
  computed: {
    ...mapState(["Cart"]),
    disabled() {
      return !!this.Cart.address.id;
    },
    address() {
      return this.Cart.address;
    },
  },
};
</script>
