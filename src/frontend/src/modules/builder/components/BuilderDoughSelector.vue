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
          @updateData="$emit('updateData', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SelectorItem from "@/common/components/SelectorItem";

export default {
  name: "BuilderDoughSelector",
  components: { SelectorItem },
  computed: {
    ...mapGetters("Builder", ["getBuilderItem"]),
    ...mapGetters("Builder", ["getPizzaItem"]),
    dough() {
      return this.getBuilderItem("dough");
    },
    checked() {
      return this.getPizzaItem("dough");
    },
  },
};
</script>
