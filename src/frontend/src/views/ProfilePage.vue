<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">
        Мои данные
      </h1>
    </div>
    <div class="user">
      <picture>
        <source
          type="image/webp"
          :srcset="`${userAvatar}@2x.webp 1x, ${userAvatar}@4x.webp 2x`"
        />
        <img
          :src="`${userAvatar}@2x.jpg`"
          :srcset="`${userAvatar}@4x.jpg`"
          :alt="userName"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ userName }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон:
        <span>{{ userPhone }}</span>
      </p>
    </div>
    <div
      v-if="!addresses.length"
      class="layout__address"
      data-test="no-addresses-text"
    >
      <p>У вас пока нет добавленных адресов</p>
    </div>
    <ProfileAddressView
      v-for="address in addresses"
      v-else
      :key="address.id"
      :address="address"
      data-test="addresses"
    />
    <div class="layout__address">
      <ProfileAddressForm
        v-if="isForm"
        data-test="address-form"
        @close="closeForm"
      />
    </div>
    <div class="layout__button">
      <AppButton
        class="button--border"
        :disabled="isForm"
        data-test="add-address-btn"
        @click="openForm"
      >
        Добавить новый адрес
      </AppButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm";
import ProfileAddressView from "@/modules/profile/components/ProfileAddressView";
import { auth } from "@/middlewares";

export default {
  name: "ProfilePage",
  layout: "AppLayoutAuthorizedUser",
  middlewares: [auth],
  components: { ProfileAddressView, ProfileAddressForm },

  data() {
    return {
      isForm: false
    };
  },

  computed: {
    ...mapState("Addresses", ["addresses"]),
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["getUserAvatar"]),

    userAvatar() {
      return this.getUserAvatar;
    },

    userName() {
      return this.user.name;
    },

    userPhone() {
      return this.user.phone;
    }
  },

  methods: {
    openForm() {
      this.isForm = true;
    },

    closeForm() {
      this.isForm = false;
    }
  }
};
</script>
