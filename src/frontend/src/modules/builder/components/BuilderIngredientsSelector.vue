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
            @updateData="$emit('updateSauce', $event)"
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
                :draggable="isDraggable(ingredient.value)"
                @dragstart.self="onDrag($event, ingredient)"
                @dragover.prevent
                @dragenter.prevent
              >
                {{ ingredient.name }}
              </span>
              <ItemCounter
                :value="ingredientsCount[ingredient.value] || 0"
                @removeItem="
                  $emit('updateIngredients', { payload: ingredient.value })
                "
                @addItem="
                  $emit('updateIngredients', {
                    payload: ingredient.value,
                    isAddition: true,
                  })
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
import { mapGetters } from "vuex";
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
  data() {
    return {
      MAX_INGREDIENTS,
    };
  },
  computed: {
    ...mapGetters("Builder", ["getBuilderItem"]),
    ...mapGetters("Builder", ["getPizzaItem"]),
    sauces() {
      return this.getBuilderItem("sauces");
    },
    ingredients() {
      return this.getBuilderItem("ingredients");
    },
    sauceChecked() {
      return this.getPizzaItem("sauce");
    },
    ingredientsChecked() {
      return this.getPizzaItem("ingredients");
    },
    ingredientsCount() {
      return countItemsInArray(this.ingredientsChecked);
    },
  },
  methods: {
    isDraggable(ingredient) {
      return (
        !this.ingredientsCount[ingredient] ||
        this.ingredientsCount[ingredient] < this.MAX_INGREDIENTS
      );
    },
    onDrag({ dataTransfer }, data) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(DATA_TRANSFER_PAYLOAD, JSON.stringify(data));
    },
  },
};
</script>
