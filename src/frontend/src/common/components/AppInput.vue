<template>
  <label class="input">
    <span :class="{ 'visually-hidden': hideLabel }">
      {{ label }}
    </span>
    <input
      ref="input"
      :value="value"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :class="{ error__input: showError }"
      :required="required"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    />
    <span
      v-if="showError"
      class="error__text"
    >
      {{ errorText }}
    </span>
  </label>
</template>

<script>
export default {
  name: "AppInput",

  model: {
    prop: "value",
    event: "input"
  },

  props: {
    value: {
      type: [String, Number],
      default: ""
    },

    name: {
      type: String,
      required: true
    },

    label: {
      type: String,
      required: true
    },

    type: {
      type: String,
      default: "text"
    },

    placeholder: {
      type: String,
      default: ""
    },

    errorText: {
      type: String,
      default: ""
    },

    required: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    hideLabel: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    showError() {
      return !!this.errorText;
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  &__input {
    border-color: $red-800;
  }

  &__text {
    margin-top: 5px;
    color: $red-800;
    @include r-s14-h16;
  }
}
</style>
