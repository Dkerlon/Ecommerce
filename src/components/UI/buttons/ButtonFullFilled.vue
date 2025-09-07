<template>
    <button class="text-sm bg-blue-600 text-white py-2 px-5 rounded-lg font-semibold cursor-pointer hover:bg-blue-700">{{ text }}</button>
</template>

<script setup lang=ts>
defineProps<{
    text: string
}>()
</script>

<style scoped>

</style>
