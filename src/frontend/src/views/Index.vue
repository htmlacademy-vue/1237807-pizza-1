<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="#" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="#">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login">
          <span>Войти</span>
        </a>
      </div>
    </header>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>
              <div class="sheet__content dough">
                <RadioButton
                  v-for="doughType in dough"
                  :key="doughType.id"
                  :class="`dough__input dough__input--${doughType.value}`"
                  :radioData="doughType"
                  name="dough"
                />
              </div>
            </div>
          </div>
          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>
              <div class="sheet__content diameter">
                <RadioButton
                  v-for="size in sizes"
                  :key="size.id"
                  :class="`diameter__input diameter__input--${size.value}`"
                  :radioData="size"
                  name="diameter"
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
                  <RadioButton
                    v-for="sauce in sauces"
                    :key="sauce.id"
                    class="radio ingredients__input"
                    :radioData="sauce"
                    name="sauce"
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
                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="counter__button counter__button--minus"
                          disabled
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
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
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import pizza from "@/static/pizza.json";
import { normalizeData } from "@/common/helpers";
import {
  doughTypes,
  pizzaSizes,
  sauceTypes,
  ingredientsTypes,
} from "@/common/constants";

export default {
  name: "Index",
  components: { RadioButton },
  data() {
    return {
      dough: pizza.dough.map((dough) => normalizeData(dough, doughTypes)),
      sizes: pizza.sizes.map((size) => normalizeData(size, pizzaSizes)),
      sauces: pizza.sauces.map((sauce) => normalizeData(sauce, sauceTypes)),
      ingredients: pizza.ingredients.map((ingredient) =>
        normalizeData(ingredient, ingredientsTypes)
      ),
    };
  },
};
</script>

<style lang="scss" scoped></style>
