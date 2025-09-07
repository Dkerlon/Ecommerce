<template>
  <input
    class="outline-none w-full border text-sm border-[#e5e7eb] p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
    type="text"
    id="search"
    :required="required"
    :placeholder="placeHolder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target ? ($event.target as HTMLInputElement).value : '')"
  />
</template>

<script setup lang="ts">
defineProps<{
    modelValue: string,
    placeHolder: string,
    required?: boolean
}>()
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
