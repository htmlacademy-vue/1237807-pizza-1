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
        />
        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>
          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>
          <div class="content__result">
            <p>Итого: {{ sum }} ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
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
};
</script>
