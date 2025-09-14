<template>
  <input
    type="checkbox"
    :checked="modelValue"
    @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    class="toggle border-[#e5e7eb] bg-white checked:border-blue-600 checked:bg-blue-600 checked:text-white"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>
