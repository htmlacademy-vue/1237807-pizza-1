<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <SelectorItem
          v-for="size in sizes"
          :key="size.id"
          :class="`diameter__input diameter__input--${size.value}`"
          :selector="size"
          :checked="checked"
          data-test="size-selector"
          @updateData="updatePizza({ item: 'diameter', payload: $event })"
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
  name: "BuilderSizeSelector",
  components: { SelectorItem },
  computed: {
    ...mapGetters(["getPizzaDataItem"]),
    ...mapGetters("Builder", ["getPizzaItem"]),
    sizes() {
      return this.getPizzaDataItem("sizes");
    },
    checked() {
      return this.getPizzaItem("diameter");
    },
  },
  methods: {
    ...mapMutations("Builder", {
      updatePizza: UPDATE_CURRENT_PIZZA,
    }),
  },
};
</script>
