<template>
  <div class="content__constructor">
    <div
      :class="`pizza pizza--foundation--${
        doughLayer[dough.toUpperCase()]
      }-${sauce}`"
    >
      <div class="pizza__wrapper">
        <div
          v-for="ingredient in ingredients"
          :key="ingredient"
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
};
</script>
