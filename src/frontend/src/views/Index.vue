<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector
          :dough="data.dough"
          :checked="order.dough"
          @updatePizzaOrder="$emit('updatePizzaOrder', $event)"
        />
        <BuilderSizeSelector
          :sizes="data.sizes"
          :checked="order.diameter"
          @updatePizzaOrder="$emit('updatePizzaOrder', $event)"
        />
        <BuilderIngredientsSelector
          :sauces="data.sauces"
          :ingredients="data.ingredients"
          :sauceChecked="order.sauce"
          :ingredientsChecked="order.ingredients"
          @updatePizzaOrder="$emit('updatePizzaOrder', $event)"
          @updateIngredient="updateIngredient"
        />
        <div class="content__pizza">
          <BuilderPizzaTitle
            :title="order.title"
            @updatePizzaOrder="$emit('updatePizzaOrder', $event)"
          />
          <BuilderPizzaView
            :dough="order.dough"
            :ingredients="order.ingredients"
            :sauce="order.sauce"
            @updateIngredient="updateIngredient"
          />
          <BuilderPriceCounter
            :sum="sum"
            :disabled="order.ingredients.length === 0 || order.title === ''"
          />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
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
  props: {
    data: {
      type: Object,
      required: true,
    },
    order: {
      type: Object,
      required: true,
    },
    sum: {
      type: Number,
      required: true,
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
