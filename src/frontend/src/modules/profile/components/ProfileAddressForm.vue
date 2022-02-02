<template>
  <form
    class="address-form address-form--opened sheet"
    @submit.prevent="submit"
  >
    <div class="address-form__header">
      <b>{{ address.name ? address.name : "Новый адрес" }}</b>
    </div>
    <div class="address-form__wrapper">
      <div class="address-form__input">
        <Input
          ref="name"
          v-model="address.name"
          name="name"
          label="Название адреса*"
          placeholder="Введите название адреса"
          :required="true"
          :error-text="validations.name.error"
        />
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <Input
          ref="street"
          v-model="address.street"
          name="street"
          label="Улица*"
          placeholder="Введите название улицы"
          :required="true"
          :error-text="validations.street.error"
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <Input
          ref="building"
          v-model="address.building"
          name="building"
          label="Дом*"
          placeholder="Введите номер дома"
          :required="true"
          :error-text="validations.building.error"
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <Input
          ref="flat"
          v-model="address.flat"
          name="flat"
          label="Квартира"
          placeholder="Введите № квартиры"
        />
      </div>
      <div class="address-form__input">
        <Input
          ref="comment"
          v-model="address.comment"
          name="comment"
          label="Комментарий"
          placeholder="Введите комментарий"
        />
      </div>
    </div>
    <div class="address-form__buttons">
      <Button class="button--transparent" @click="closeForm"> Отмена </Button>
      <Button
        v-if="addressToEdit"
        class="button--transparent"
        @click="removeAddress"
      >
        Удалить
      </Button>
      <Button type="submit" :disabled="!isFormValid">Сохранить</Button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { validator } from "@/common/mixins";
import { cloneDeep } from "lodash";

const createNewAddress = () => ({
  name: "",
  userId: "string",
  street: "",
  building: "",
  flat: "",
  comment: "",
});

export default {
  name: "ProfileAddressForm",
  mixins: [validator],
  props: {
    addressToEdit: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      address: createNewAddress(),
      validations: {
        name: {
          error: "",
          rules: ["required"],
        },
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
  watch: {
    address: {
      deep: true,
      handler() {
        this.isFormValid = true;
      },
    },
  },
  created() {
    if (this.addressToEdit) {
      this.address = cloneDeep(this.addressToEdit);
    }
  },
  methods: {
    ...mapActions("Addresses", {
      addressPost: "post",
      addressPut: "put",
      addressDelete: "delete",
    }),
    async submit() {
      if (!this.$validateFields(this.address, this.validations)) {
        this.isFormValid = false;
        return;
      }
      if (this.addressToEdit) {
        await this.addressPut(this.address);
      } else {
        await this.addressPost(this.address);
      }
      this.closeForm();
    },
    async removeAddress() {
      await this.addressDelete(this.address.id);
      this.closeForm();
    },
    closeForm() {
      this.$emit("close");
    },
  },
};
</script>
