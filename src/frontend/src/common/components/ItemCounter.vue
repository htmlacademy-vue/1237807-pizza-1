<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :class="buttonClass"
      :disabled="value <= 0"
      @click="$emit('removeItem')"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      readonly
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="buttonClass"
      :disabled="disabledPlus"
      @click="$emit('addItem')"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    value: {
      type: Number,
      required: true,
    },
    maxCount: {
      type: Number,
      default: null,
    },
    buttonClass: {
      type: String,
      default: "",
    },
  },
  computed: {
    disabledPlus() {
      if (this.maxCount && this.value >= this.maxCount) {
        return true;
      }
      return false;
    },
  },
};
</script>
