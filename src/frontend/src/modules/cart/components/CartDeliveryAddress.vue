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
        :error-text="validations.street ? validations.street.error : ''"
      />
    </div>
    <div class="cart-form__input cart-form__input--small">
      <Input
        ref="building"
        v-model="address.building"
        name="building"
        label="Дом*"
        :disabled="disabled"
        :error-text="validations.building ? validations.building.error : ''"
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
import validator from "@/common/mixins/validator";

export default {
  name: "CartDeliveryAddress",
  mixins: [validator],
  computed: {
    ...mapState(["Cart"]),
    validations() {
      return this.Cart.address.validations || {};
    },
    disabled() {
      return !!this.address.id;
    },
    address() {
      return this.Cart.address;
    },
    street() {
      return this.address.street;
    },
    building() {
      return this.address.building;
    },
  },
  watch: {
    street() {
      if (!this.disabled) {
        this.$clearValidationErrors();
      }
    },
    building() {
      if (!this.disabled) {
        this.$clearValidationErrors();
      }
    },
  },
};
</script>
