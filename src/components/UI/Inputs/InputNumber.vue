<template>
  <input class="outline-none w-full border text-sm border-[#e5e7eb] p-2 rounded-lg focus:ring-2 focus:ring-blue-500" type="number" id="search" :placeholder="placeHolder"
  :value="modelValue"
  @input="$emit('update:modelValue', $event.target && ($event.target as HTMLInputElement).value !== '' ? Number(($event.target as HTMLInputElement).value) : 0)">
</template>

<script setup lang="ts">
defineProps<{
    modelValue: number,
    placeHolder: string,
    required?: boolean
}>()
defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>
