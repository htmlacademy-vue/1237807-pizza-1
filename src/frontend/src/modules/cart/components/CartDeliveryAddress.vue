<template>
  <div class="cart-form__address">
    <span
      class="cart-form__label"
      data-test="address-name"
    >
      {{ address.name || "Новый адрес:" }}
    </span>
    <div class="cart-form__input">
      <AppInput
        ref="street"
        v-model="street"
        name="street"
        label="Улица*"
        data-test="street-input"
        :disabled="disabled"
        :error-text="validations.street ? validations.street.error : ''"
      />
    </div>
    <div class="cart-form__input cart-form__input--small">
      <AppInput
        ref="building"
        v-model="building"
        name="building"
        label="Дом*"
        data-test="building-input"
        :disabled="disabled"
        :error-text="validations.building ? validations.building.error : ''"
      />
    </div>
    <div class="cart-form__input cart-form__input--small">
      <AppInput
        ref="flat"
        v-model="flat"
        name="flat"
        label="Квартира"
        data-test="flat-input"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import validator from "@/common/mixins/validator";
import { UPDATE_ADDRESS } from "@/store/mutations-types";

export default {
  name: "CartDeliveryAddress",
  mixins: [validator],

  computed: {
    ...mapState("Cart", ["address"]),

    validations() {
      return this.address.validations || {};
    },

    disabled() {
      return !!this.address.id;
    },

    street: {
      get() {
        return this.address.street;
      },
      set(value) {
        this.updateAddress({ key: "street", value });
      }
    },

    building: {
      get() {
        return this.address.building;
      },
      set(value) {
        this.updateAddress({ key: "building", value });
      }
    },

    flat: {
      get() {
        return this.address.flat;
      },
      set(value) {
        this.updateAddress({ key: "flat", value });
      }
    }
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
    }
  },

  methods: {
    ...mapMutations("Cart", {
      updateAddress: UPDATE_ADDRESS
    })
  }
};
</script>
