// src/store/index.ts
import { defineStore } from "pinia"

export const useStore = defineStore('mainStore', {
  state: () => {
    return {
      api_key :"AIzaSyBZn-DXKwqEA9mCdn8DB6a1bt0jUsw-Qiw"
    }
  },
  getters:{
    getApiKey(state){
      return state.api_key
    }
  }
})
