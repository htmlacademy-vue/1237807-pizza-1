<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector
          @updateData="updateCurrentPizza('dough', $event)"
        />
        <BuilderSizeSelector
          @updateData="updateCurrentPizza('diameter', $event)"
        />
        <BuilderIngredientsSelector
          @updateSauce="updateCurrentPizza('sauce', $event)"
          @updateIngredients="updateCurrentPizza('ingredients', $event)"
        />
        <div class="content__pizza">
          <BuilderPizzaTitle
            @updateData="updateCurrentPizza('title', $event)"
          />
          <BuilderPizzaView
            @updateIngredients="updateCurrentPizza('ingredients', $event)"
          />
          <BuilderPriceCounter
            :disabled="ingredients.length === 0 || title === ''"
          />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { UPDATE_CURRENT_PIZZA } from "@/store/mutations-types";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaTitle from "@/modules/builder/components/BuilderPizzaTitle";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaTitle,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  computed: {
    ...mapGetters("Builder", ["getPizzaItem"]),
    ingredients() {
      return this.getPizzaItem("ingredients");
    },
    title() {
      return this.getPizzaItem("title");
    },
  },
  methods: {
    ...mapMutations("Builder", {
      updatePizza: UPDATE_CURRENT_PIZZA,
    }),
    updateCurrentPizza(name, data) {
      let newData;

      if (name === "ingredients") {
        const { payload, isAddition } = data;
        newData = [...this.ingredients];

        if (isAddition) {
          newData.push(payload);
        } else {
          const index = newData.indexOf(payload);
          if (~index) {
            newData.splice(index, 1);
          }
        }
      } else {
        newData = data;
      }

      this.updatePizza({ item: name, payload: newData });
    },
  },
};
</script>
