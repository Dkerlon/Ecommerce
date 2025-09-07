<template>
    <button class="text-sm border border-[#e5e7eb] py-2 px-5 rounded-lg font-semibold hover:bg-[#e5e7eb] cursor-pointer">{{ text }}</button>
</template>

<script setup lang=ts>
defineProps<{
    text: string
}>()
</script>

<style scoped>

</style>
