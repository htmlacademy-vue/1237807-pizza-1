<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector data-test="dough-selector" />
        <BuilderSizeSelector data-test="size-selector" />
        <BuilderIngredientsSelector data-test="ingredients-selector" />
        <div class="content__pizza">
          <BuilderPizzaTitle data-test="pizza-title" />
          <BuilderPizzaView data-test="pizza-view" />
          <BuilderPriceCounter data-test="price-counter" />
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
};
</script>
