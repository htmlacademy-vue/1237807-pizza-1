<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="miscItem in miscData"
        :key="miscItem.id"
        class="additional-list__item sheet"
        data-test="misc-item"
      >
        <p class="additional-list__description">
          <img
            :src="miscItem.image"
            width="39"
            height="60"
            :alt="miscItem.name"
          />
          <span>{{ miscItem.name }}</span>
        </p>
        <div class="additional-list__wrapper">
          <ItemCounter
            :class="`additional-list__counter`"
            :buttonClass="`counter__button--orange`"
            :value="miscOrder[miscItem.value] || 0"
            data-test="misc-counter"
            @removeItem="
              updateMiscOrder({
                item: miscItem.value,
              })
            "
            @addItem="
              updateMiscOrder({
                item: miscItem.value,
                isAddition: true,
              })
            "
          />
          <div class="additional-list__price">
            <b>× {{ miscItem.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { UPDATE_MISC_ORDER } from "@/store/mutations-types";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "CartMiscSelector",
  components: { ItemCounter },
  computed: {
    ...mapState(["miscData"]),
    ...mapState("Cart", ["miscOrder"]),
  },
  methods: {
    ...mapMutations("Cart", {
      updateMiscOrder: UPDATE_MISC_ORDER,
    }),
  },
};
</script>
