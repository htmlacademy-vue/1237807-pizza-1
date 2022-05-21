<template>
  <label>
    <RadioButton
      :name="selector.type"
      :value="selector.value"
      :is-checked="selector.value === checked"
      @updateData="$emit('updateData', $event)"
    />
    <b v-if="selector.description">
      {{ selector.name }}
    </b>
    <span v-if="selector.description">
      {{ selector.description }}
    </span>
    <span v-else>
      {{ selector.name }}
    </span>
  </label>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "SelectorItem",
  components: { RadioButton },

  props: {
    selector: {
      type: Object,
      required: true
    },

    checked: {
      type: String,
      required: true
    }
  }
};
</script>
