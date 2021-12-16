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
          :class="`pizza__filling pizza__filling--${ingredient} ${
            ingredientsIndex[ingredientsCount[ingredient]]
              ? `pizza__filling--${
                  ingredientsIndex[ingredientsCount[ingredient]]
                }`
              : ''
          }`"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import doughLayer from "@/common/enums/doughLayer";
import ingredientsIndex from "@/common/enums/ingredientsIndex";
import { countItemsInArray } from "@/common/helpers";
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

export default {
  name: "BuilderPizzaView",
  props: {
    dough: {
      type: String,
      required: true,
    },
    sauce: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      doughLayer,
      ingredientsIndex,
    };
  },
  computed: {
    ingredientsCount() {
      return countItemsInArray(this.ingredients);
    },
  },
  methods: {
    onDrop({ dataTransfer }) {
      if (!dataTransfer) {
        return;
      }
      const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
      if (payload) {
        const transferData = JSON.parse(
          dataTransfer.getData(DATA_TRANSFER_PAYLOAD)
        );

        this.$emit(
          "updateIngredient",
          transferData.value,
          transferData.type,
          true
        );
      }
    },
  },
};
</script>
