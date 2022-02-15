<template>
  <div v-if="error" class="popup">
    <div class="popup__title">
      <h2 class="title">Ошибка</h2>
    </div>
    <p>{{ error }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Error",
  computed: {
    ...mapState(["error"]),
  },
};
</script>

<style lang="scss" scoped>
.popup {
  background-color: $red-800;
  color: $white;
  z-index: 100;
}
.title {
  color: $white;
}
</style>
