<template>
    <main>
        <div class="filters">
            <InputSearch class="filtroInput" place-holder="Buscar Produtos, marcas, categorias..."></InputSearch>
            <div class="showMoreFilters">
                <img src="/img/icons/filter.png" alt="">
                <span>Filtros</span>
            </div>
            <div class="changeLayout">
                <div><img src="/img/icons/grid.png" alt=""></div>
                <div><img src="/img/icons/lista.png" alt=""></div>
            </div>
        </div>

        <h3>Produtos em Destaque</h3>
        <p>4 produtos encontrados</p>
    </main>
</template>

<script setup lang="ts">
import InputSearch from '../Inputs/InputSearch.vue';
</script>

<style scoped>
main{
    width: 90%;
    margin: 0 auto;
}

.filters{
    display: flex;
    align-items: center;
    gap: 20px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
}

.showMoreFilters, .filtroInput{
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
}
.showMoreFilters, .changeLayout{
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #ccc;
    font-size: 15px;
    font-weight: bold;
}

.showMoreFilters:hover{
    background-color: #2863e6;
    color: white;
}

.filters img{
    width: 20px;
}

.changeLayout{
    border-radius: 5px;
    padding: 2px;
}
.changeLayout div{
    display: flex;
    align-items: center;
    padding: 6px;
    border-radius: 5px;
    cursor: pointer;
}

.changeLayout div:hover{
    background-color: #2863e6;
}
</style>