<template>
    <div class="search flex items-center border-2 border-[#ccc] px-4 py-2 w-2/4 gap-[10px] rounded-md focus-within:border-2 focus-within:border-[#2863e6]">
        <label for="search">
            <img class="w-6" src="/img/icons/search.png" alt="icone de pesquisa"/>
        </label>
        <input class="outline-none w-full border-none text-sm" type="text" id="search" :placeholder="placeHolder">
    </div>
</template>

<script setup lang="ts">
defineProps<{
    placeHolder: string
}>()
</script>
