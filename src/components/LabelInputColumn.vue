<template>
  <label :for="id">{{ labelText }}</label>
  <input :type="type || 'text'" :id="id" :placeholder="placeHolder" :value="modelValue" @input="onInput"/>
</template>

<script setup lang="ts">
type Props = {
  id: string
  labelText: string,
  placeHolder: string,
  type?:string,
  modelValue: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<style scoped>
input{
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
