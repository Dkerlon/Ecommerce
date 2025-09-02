<script setup lang="ts">
import { onMounted } from 'vue';
import { setUserInfo } from './services/setUserInfo';
onMounted(async () => {
  setUserInfo()
})
</script>

<template>
  <router-view></router-view>
</template>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
</style>
