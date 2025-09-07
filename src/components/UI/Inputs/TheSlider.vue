<template>
  <div class="w-64">
    <input
      :id="id"
      type="range"
      :min="min"
      :max="max"
      v-model="internalValue"
      class="w-full h-2 rounded-lg appearance-none cursor-pointer"
      :style="trackStyle"
      @input="updateValue"
    />
    <div class="flex justify-between text-xs mt-2">
      <span class="text-[#6c727f]">R$ {{ internalValue }}</span>
      <span class="text-[#6c727f]">R$ {{ max }}</span>
    </div>
  </div>
</template>

<script setup lang=ts>
import { ref, watch, computed } from "vue";

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  label: { type: String, default: "Preço" },
  id: { type: String, default: "price-slider" }
});

const emit = defineEmits(["update:modelValue"]);
const internalValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal;
  }
);

function updateValue() {
  emit("update:modelValue", Number(internalValue.value));
}

const trackStyle = computed(() => {
  const percent = ((internalValue.value - props.min) / (props.max - props.min)) * 100;
  return {
    background: `linear-gradient(to right, #f97316 ${percent}%, #2563eb ${percent}%)`
  };
});
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #2563eb;
  border-radius: 9999px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;
}
input[type="range"]::-moz-range-thumb {
  width: 1.25rem;
  height: 1.25rem;
  background-color: #2563eb;
  border-radius: 9999px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;
}
</style>
