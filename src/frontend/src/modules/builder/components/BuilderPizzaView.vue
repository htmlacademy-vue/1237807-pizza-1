<template>
  <div
    class="content__constructor"
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <div
      :class="`pizza pizza--foundation--${
        doughLayer[dough.toUpperCase()]
      }-${sauce}`"
    >
      <div class="pizza__wrapper">
        <div
          v-for="(ingredient, index) in ingredients"
          :key="index"
          :class="`pizza__filling pizza__filling--${ingredient} pizza__filling--${getIngredientCountClassName(
            ingredient
          )}`"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import doughLayer from "@/common/enums/doughLayer";
import ingredientsIndex from "@/common/enums/ingredientsIndex";
import { countItemsInArray } from "@/common/helpers";
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

export default {
  name: "BuilderPizzaView",
  data() {
    return {
      doughLayer,
      ingredientsIndex,
    };
  },
  computed: {
    ...mapGetters("Builder", ["getOrderItem"]),
    dough() {
      return this.getOrderItem("dough");
    },
    sauce() {
      return this.getOrderItem("sauce");
    },
    ingredients() {
      return this.getOrderItem("ingredients");
    },
    ingredientsCount() {
      return countItemsInArray(this.ingredients);
    },
  },
  methods: {
    getIngredientCountClassName(ingredient) {
      if (this.ingredientsIndex[this.ingredientsCount[ingredient]]) {
        return this.ingredientsIndex[this.ingredientsCount[ingredient]];
      } else {
        return "";
      }
    },
    onDrop({ dataTransfer }) {
      if (!dataTransfer) {
        return;
      }
      const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
      if (payload) {
        const transferData = JSON.parse(
          dataTransfer.getData(DATA_TRANSFER_PAYLOAD)
        );

        this.$emit("updateIngredients", {
          payload: transferData.value,
          isAddition: true,
        });
      }
    },
  },
};
</script>
