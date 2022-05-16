<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>
        <select
          name="test"
          class="select"
          v-model="deliveryMethod"
          data-test="delivery-select"
          @change="setAddressValue"
        >
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            data-test="delivery-option"
          >
            {{ option.label }}
          </option>
        </select>
      </label>
      <Input
        class="input--big-label"
        ref="phone"
        v-model="phoneNumber"
        name="phone"
        label="Контактный телефон:"
        placeholder="+7 999-999-99-99"
        data-test="phone-input"
      />
      <CartDeliveryAddress v-if="isAddressForm" data-test="address-form" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import CartDeliveryAddress from "@/modules/cart/components/CartDeliveryAddress";
import { UPDATE_DELIVERY_OPTION, UPDATE_PHONE } from "@/store/mutations-types";

export default {
  name: "CartDeliveryForm",
  components: { CartDeliveryAddress },
  methods: {
    ...mapActions("Cart", ["setAddressValue"]),
    ...mapMutations("Cart", {
      updateDeliveryMethod: UPDATE_DELIVERY_OPTION,
      updatePhoneNumber: UPDATE_PHONE,
    }),
  },
  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
    ...mapState("Addresses", ["addresses"]),
    ...mapState("Cart", ["deliveryOption", "phone"]),
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
      return this.deliveryOption !== "pickup";
    },
    deliveryMethod: {
      get() {
        return this.deliveryOption;
      },
      set(value) {
        this.updateDeliveryMethod(value);
      },
    },
    phoneNumber: {
      get() {
        return this.phone;
      },
      set(value) {
        this.updatePhoneNumber(value);
      },
    },
  },
};
</script>
