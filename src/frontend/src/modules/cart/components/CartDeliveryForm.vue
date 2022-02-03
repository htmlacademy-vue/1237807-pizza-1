<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>
        <select
          name="test"
          class="select"
          v-model="selected"
          @change="setAddressValue($event.target.value)"
        >
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </label>
      <Input
        class="input--big-label"
        ref="phone"
        v-model="Cart.phone"
        name="phone"
        label="Контактный телефон:"
        placeholder="+7 999-999-99-99"
      />
      <CartDeliveryAddress v-if="isAddressForm" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CartDeliveryAddress from "@/modules/cart/components/CartDeliveryAddress";

export default {
  name: "CartDeliveryForm",
  components: { CartDeliveryAddress },
  data() {
    return {
      selected: "pickup",
      validations: {
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
      isFormValid: true,
    };
  },
  methods: {
    ...mapActions("Cart", ["setAddressValue"]),
  },
  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
    ...mapState("Addresses", ["addresses"]),
    ...mapState(["Cart"]),
    options() {
      let options = [
        {
          value: "pickup",
          label: "Заберу сам",
        },
        {
          value: "new",
          label: "Новый адрес",
        },
      ];

      if (this.isAuthenticated && this.addresses.length) {
        this.addresses.map((address) => {
          options.push({
            value: address.id,
            label: address.name,
          });
        });
      }

      return options;
    },
    isAddressForm() {
      return this.selected !== "pickup";
    },
  },
};
</script>
