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
import { mapState, mapGetters } from "vuex";
import SelectorItem from "@/common/components/SelectorItem";

export default {
  name: "BuilderDoughSelector",
  components: { SelectorItem },
  computed: {
    ...mapState("Builder", ["dough"]),
    ...mapGetters("Builder", ["getOrderItem"]),
    checked() {
      return this.getOrderItem("dough");
    },
  },
};
</script>
