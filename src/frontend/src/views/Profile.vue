<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
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
          :alt="user.name"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон:
        <span>{{ user.phone }}</span>
      </p>
    </div>
    <div v-if="!addresses.length" class="layout__address">
      <p>У вас пока нет добавленных адресов</p>
    </div>
    <ProfileAddressView
      v-else
      v-for="address in addresses"
      :key="address.id"
      :address="address"
    />
    <div class="layout__address">
      <ProfileAddressForm v-if="isForm" @close="closeForm" />
    </div>
    <div class="layout__button">
      <Button class="button--border" :disabled="isForm" @click="openForm">
        Добавить новый адрес
      </Button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm";
import ProfileAddressView from "@/modules/profile/components/ProfileAddressView";

export default {
  name: "Profile",
  components: { ProfileAddressView, ProfileAddressForm },
  data() {
    return {
      isForm: false,
    };
  },
  computed: {
    ...mapState(["Addresses"]),
    ...mapState(["Auth"]),
    ...mapGetters("Auth", ["getUserAvatar"]),
    addresses() {
      return this.Addresses.addresses || [];
    },
    user() {
      return this.Auth.user || {};
    },
    userAvatar() {
      return this.getUserAvatar;
    },
  },
  methods: {
    openForm() {
      this.isForm = true;
    },
    closeForm() {
      this.isForm = false;
    },
  },
};
</script>
