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
        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>
            <div class="sheet__content diameter">
              <SelectorItem
                v-for="size in data.sizes"
                :key="size.id"
                :class="`diameter__input diameter__input--${size.value}`"
                :selector="size"
              />
            </div>
          </div>
        </div>
        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>
            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>
                <SelectorItem
                  v-for="sauce in data.sauces"
                  :key="sauce.id"
                  class="radio ingredients__input"
                  :selector="sauce"
                />
              </div>
              <div class="ingredients__filling">
                <p>Начинка:</p>
                <ul class="ingredients__list">
                  <li
                    v-for="ingredient in data.ingredients"
                    :key="ingredient.id"
                    class="ingredients__item"
                  >
                    <span :class="`filling filling--${ingredient.value}`">
                      {{ ingredient.name }}
                    </span>
                    <ItemCounter value="3" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "Index",
  components: { BuilderDoughSelector, SelectorItem, ItemCounter },
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
