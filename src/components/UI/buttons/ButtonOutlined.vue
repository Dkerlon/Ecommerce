<template>
    <button class="text-sm">{{ text }}</button>
</template>

<script setup lang=ts>
defineProps<{
    text: string
}>()
</script>

<style scoped>
button{
    padding: 8px;
    border: none;
    background-color: white;
    cursor: pointer;
}
button:hover{
    opacity: 0.5;
}
</style>
