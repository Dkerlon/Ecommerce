<template>
  <select
    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-[#e5e7eb] text-sm"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target ? $event.target.value : '')"
  >
    <option v-if="placeholder" disabled value="">
      {{ placeholder }}
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts" setup>

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  options: Option[];
  placeholder?: string;
  modelValue?: string | number;
}

defineProps<Props>();

defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>();
</script>
