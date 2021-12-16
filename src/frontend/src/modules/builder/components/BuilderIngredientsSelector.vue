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
              <span
                :class="`filling filling--${ingredient.value}`"
                :draggable="
                  !ingredientsCount[ingredient.value] ||
                  ingredientsCount[ingredient.value] < MAX_INGREDIENTS
                "
                @dragstart.self="onDrag($event, ingredient)"
                @dragover.prevent
                @dragenter.prevent
              >
                {{ ingredient.name }}
              </span>
              <ItemCounter
                :value="ingredientsCount[ingredient.value] || 0"
                @removeIngredient="
                  $emit('updateIngredient', ingredient.value, ingredient.type)
                "
                @addIngredient="
                  $emit(
                    'updateIngredient',
                    ingredient.value,
                    ingredient.type,
                    true
                  )
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
import {
  DATA_TRANSFER_PAYLOAD,
  MOVE,
  MAX_INGREDIENTS,
} from "@/common/constants";

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
  data() {
    return {
      MAX_INGREDIENTS,
    };
  },
  computed: {
    ingredientsCount() {
      return countItemsInArray(this.ingredientsChecked);
    },
  },
  methods: {
    onDrag({ dataTransfer }, data) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(DATA_TRANSFER_PAYLOAD, JSON.stringify(data));
    },
  },
};
</script>
