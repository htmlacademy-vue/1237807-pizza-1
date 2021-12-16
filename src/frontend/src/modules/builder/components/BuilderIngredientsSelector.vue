<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <SelectorItem
            v-for="sauce in sauces"
            :key="sauce.id"
            class="radio ingredients__input"
            :selector="sauce"
            :checked="sauceChecked"
            @updatePizzaOrder="$emit('updatePizzaOrder', $event)"
          />
        </div>
        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <span :class="`filling filling--${ingredient.value}`">
                {{ ingredient.name }}
              </span>
              <ItemCounter
                :value="ingredientsCount[ingredient.value] || 0"
                @removeIngredient="
                  updateIngredient(ingredient.value, ingredient.type)
                "
                @addIngredient="
                  updateIngredient(ingredient.value, ingredient.type, true)
                "
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";
import { countItemsInArray } from "@/common/helpers";

export default {
  name: "BuilderIngredientsSelector",
  components: { SelectorItem, ItemCounter },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    sauceChecked: {
      type: String,
    },
    ingredientsChecked: {
      type: Array,
    },
  },
  computed: {
    ingredientsCount() {
      return countItemsInArray(this.ingredientsChecked);
    },
  },
  methods: {
    updateIngredient(value, type, isAddition) {
      let data = {
        payload: { ingredient: value },
        action: type,
      };

      if (isAddition) {
        data.payload.addition = isAddition;
      }

      this.$emit("updatePizzaOrder", data);
    },
  },
};
</script>
