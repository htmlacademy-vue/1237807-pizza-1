<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <SelectorItem
          v-for="doughType in dough"
          :key="doughType.id"
          :class="`dough__input dough__input--${doughType.value}`"
          :selector="doughType"
          :checked="checked"
          @updatePizzaOrder="$emit('updatePizzaDough', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem";

export default {
  name: "BuilderDoughSelector",
  components: { SelectorItem },
  props: {
    dough: {
      type: Array,
      required: true,
    },
    checked: {
      type: String,
    },
  },
};
</script>
