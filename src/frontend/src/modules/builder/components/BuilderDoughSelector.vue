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
          @updateData="updatePizza({ item: 'dough', payload: $event })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { UPDATE_CURRENT_PIZZA } from "@/store/mutations-types";
import SelectorItem from "@/common/components/SelectorItem";

export default {
  name: "BuilderDoughSelector",
  components: { SelectorItem },
  computed: {
    ...mapGetters(["getPizzaDataItem"]),
    ...mapGetters("Builder", ["getPizzaItem"]),
    dough() {
      return this.getPizzaDataItem("dough");
    },
    checked() {
      return this.getPizzaItem("dough");
    },
  },
  methods: {
    ...mapMutations("Builder", {
      updatePizza: UPDATE_CURRENT_PIZZA,
    }),
  },
};
</script>
