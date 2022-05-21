<template>
  <div
    class="content__constructor"
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <div
      data-test="pizza-foundation"
      :class="`pizza pizza--foundation--${
        doughLayer[dough.toUpperCase()]
      }-${sauce}`"
    >
      <div class="pizza__wrapper">
        <transition-group name="ingredients">
          <div
            v-for="(ingredient, index) in ingredients"
            :key="ingredient + index"
            data-test="pizza-filling"
            class="pizza__filling"
            :class="`pizza__filling--${ingredient}${getIngredientCountClassName(
              ingredient,
              index
            )}`"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { UPDATE_CURRENT_PIZZA } from "@/store/mutations-types";
import doughLayer from "@/common/enums/doughLayer";
import ingredientsIndex from "@/common/enums/ingredientsIndex";
import { countItemsInArray } from "@/common/helpers";
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

export default {
  name: "BuilderPizzaView",

  data() {
    return {
      doughLayer,
      ingredientsIndex
    };
  },

  computed: {
    ...mapGetters("Builder", ["getPizzaItem"]),

    dough() {
      return this.getPizzaItem("dough");
    },

    sauce() {
      return this.getPizzaItem("sauce");
    },

    ingredients() {
      return this.getPizzaItem("ingredients");
    },

    ingredientsCount() {
      return countItemsInArray(this.ingredients);
    }
  },

  methods: {
    ...mapMutations("Builder", {
      updatePizza: UPDATE_CURRENT_PIZZA
    }),

    getIngredientCountClassName(ingredient, index) {
      const isMultiIngredient = this.ingredientsCount[ingredient] > 1;

      if (!isMultiIngredient) {
        return "";
      }

      let currentIngredientIndex = 0;

      this.ingredients.forEach((item, i) => {
        if (item === ingredient && i < index) {
          currentIngredientIndex += 1;
        } else {
          return;
        }
      });

      return this.ingredientsIndex[currentIngredientIndex]
        ? this.ingredientsIndex[currentIngredientIndex]
        : "";
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

        this.updatePizza({
          item: "ingredients",
          payload: transferData.value,
          isAddition: true
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ingredients-enter-active,
.ingredients-leave-active {
  transition: all 0.7s ease;
}
.ingredients-enter,
.ingredients-leave-to {
  transform: scale(1.7);
  opacity: 0;
}
</style>
