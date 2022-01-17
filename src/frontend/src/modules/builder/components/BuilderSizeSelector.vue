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
  name: "BuilderSizeSelector",
  components: { SelectorItem },
  computed: {
    ...mapGetters("Builder", ["getBuilderItem"]),
    ...mapGetters("Builder", ["getPizzaItem"]),
    sizes() {
      return this.getBuilderItem("sizes");
    },
    checked() {
      return this.getPizzaItem("diameter");
    },
  },
};
</script>
