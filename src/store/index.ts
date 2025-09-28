// src/store/index.ts
import { defineStore } from "pinia"

export const useStore = defineStore('mainStore', {
  state: () => {
    return {
      api_key : import.meta.env.VITE_API_KEY
    }
  },
  getters:{
    getApiKey(state){
      return state.api_key
    }
  }
})
