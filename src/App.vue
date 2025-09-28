<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';
import { useUserInfo } from './store/userInfo';
import type CreateUserResponse from './interfaces/CreateUserResponse';
import getUserInfoById from './services/getUserInfo/userInfoById';

async function setUserInfo() {
  const store = useAuthStore()
  const userInfostore = useUserInfo()

  const userData = {
      localId: localStorage.getItem("localId") || store.getlocalId,
      idToken: localStorage.getItem("token") || store.isLoggedIn,
    }
    if(userData.localId && userData.idToken){
      store.setUser(userData as CreateUserResponse, true)
      const userInfo = await getUserInfoById(userData.localId)
      userInfostore.setUserInfo(userInfo)
      console.log(userInfostore.getTipoConta)
    }
}

onMounted(async () => {
  setUserInfo()
})
</script>

<template>
  <router-view></router-view>
</template>

<style>

</style>
