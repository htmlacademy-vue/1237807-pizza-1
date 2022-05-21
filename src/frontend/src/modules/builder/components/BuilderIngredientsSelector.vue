<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите ингредиенты
      </h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <SelectorItem
            v-for="sauce in sauces"
            :key="sauce.id"
            class="radio ingredients__input"
            :selector="sauce"
            :checked="sauceChecked"
            data-test="sauce-selector"
            @updateData="updatePizza({ item: 'sauce', payload: $event })"
          />
        </div>
        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
              data-test="ingredients-item"
            >
              <span
                :class="`filling filling--${ingredient.value}`"
                :draggable="isDraggable(ingredient.value)"
                data-test="ingredient"
                @dragstart.self="onDrag($event, ingredient)"
                @dragover.prevent
                @dragenter.prevent
              >
                {{ ingredient.name }}
              </span>
              <ItemCounter
                :class="`ingredients__counter`"
                :value="ingredientsCount[ingredient.value] || 0"
                :max-count="MAX_INGREDIENTS"
                data-test="ingredients-counter"
                @removeItem="
                  updatePizza({
                    item: 'ingredients',
                    payload: ingredient.value,
                  })
                "
                @addItem="
                  updatePizza({
                    item: 'ingredients',
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
import { mapGetters, mapMutations } from "vuex";
import { UPDATE_CURRENT_PIZZA } from "@/store/mutations-types";
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";
import { countItemsInArray } from "@/common/helpers";
import {
  DATA_TRANSFER_PAYLOAD,
  MOVE,
  MAX_INGREDIENTS
} from "@/common/constants";

export default {
  name: "BuilderIngredientsSelector",
  components: { SelectorItem, ItemCounter },

  data() {
    return {
      MAX_INGREDIENTS
    };
  },

  computed: {
    ...mapGetters(["getPizzaDataItem"]),
    ...mapGetters("Builder", ["getPizzaItem"]),

    sauces() {
      return this.getPizzaDataItem("sauces");
    },

    ingredients() {
      return this.getPizzaDataItem("ingredients");
    },

    sauceChecked() {
      return this.getPizzaItem("sauce");
    },

    ingredientsChecked() {
      return this.getPizzaItem("ingredients");
    },

    ingredientsCount() {
      return countItemsInArray(this.ingredientsChecked);
    }
  },
  methods: {
    ...mapMutations("Builder", {
      updatePizza: UPDATE_CURRENT_PIZZA
    }),

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
    }
  }
};
</script>
