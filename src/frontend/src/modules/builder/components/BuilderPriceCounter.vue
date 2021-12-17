<template>
  <div class="content__result">
    <p>Итого: {{ sum }} ₽</p>
    <button type="button" class="button" :disabled="disabled">Готовьте!</button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    sum: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
  },
};
</script>
