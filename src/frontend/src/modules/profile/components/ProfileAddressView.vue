<template>
  <div class="layout__address">
    <div v-if="!isEdited" class="sheet address-form" data-test="address-text">
      <div class="address-form__header">
        <b>{{ address.name }}</b>
        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            data-test="open-btn"
            @click="openForm"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ fullAddress }}</p>
      <small>{{ address.comment }}</small>
    </div>
    <ProfileAddressForm
      v-else
      :addressToEdit="address"
      data-test="address-form"
      @close="closeForm"
    />
  </div>
</template>

<script>
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm";

export default {
  name: "ProfileAddressView",
  components: { ProfileAddressForm },
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdited: false,
    };
  },
  computed: {
    fullAddress() {
      return `${this.address.street}, д. ${this.address.building}, кв. ${this.address.flat}`;
    },
  },
  methods: {
    openForm() {
      this.isEdited = true;
    },
    closeForm() {
      this.isEdited = false;
    },
  },
};
</script>
