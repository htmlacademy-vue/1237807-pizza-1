<template>
  <div
    v-if="error"
    class="popup"
  >
    <div class="popup__title">
      <h2 class="title">
        Ошибка
      </h2>
    </div>
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "AppError",

  props: {
    error: {
      type: String,
      default: ""
    }
  }
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
