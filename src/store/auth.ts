import type CreateUserResponse from "@/interfaces/CreateUserResponse"
import type signInSingInterface from "@/interfaces/signIn"
import signUp from "@/services/createAccount"
import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      localId: '',
      idToken: '',
    }
  },
  getters: {
    isLoggedIn(state): string | null {
      return state.idToken
    },
    getlocalId(state){
      return state.localId
    },
  },
  actions:{
    setUser(user: CreateUserResponse) {
      this.idToken = user.idToken
      this.localId = user.localId
      localStorage.setItem("token", this.idToken)
      localStorage.setItem("localId", this.localId)
    },
    clearUser(){
      this.idToken = ''
      this.localId = ''
      localStorage.removeItem("token")
      localStorage.removeItem("localId")
    },
    async createAccout(userData: signInSingInterface){
      const response = await signUp(userData)
      if(response && !response.error){
        this.setUser(response)
        return response
      }
    },

  }
})
