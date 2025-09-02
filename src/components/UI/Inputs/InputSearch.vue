<template>
    <div class="search">
        <label for="search">
            <img src="/img/icons/search.png" alt="icone de pesquisa"/>
        </label>
        <input type="text" id="search" :placeholder="placeHolder">
    </div>
</template>

<script setup lang="ts">
defineProps<{
    placeHolder: string
}>()
</script>

<style scoped>
.search{
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    padding: 8px 15px;
    width: 50%;
    gap: 10px;
    border-radius: 5px;
}
.search:focus-within {
  border: #2863e6 2px solid; /* muda a borda quando o input estiver em foco */
}
.search img{
    width: 20px;
}
.search input{
    outline: none;
    width: 100%;
    border: none;
}
.search label{
    display: flex;
}
</style>