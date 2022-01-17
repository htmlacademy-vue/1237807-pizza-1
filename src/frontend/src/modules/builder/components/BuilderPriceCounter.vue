<template>
  <div class="content__result">
    <p>Итого: {{ orderSum }} ₽</p>
    <button type="button" class="button" :disabled="disabled">Готовьте!</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  props: {
    disabled: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters("Builder", ["orderSum"]),
  },
};
</script>
