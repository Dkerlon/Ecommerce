<template>
    <button>{{ text }}</button>
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
    background-color: #2863e6;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}
button:hover{
    background-color: #044be4;
}
</style>