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
    isLoggedIn(state): string {
      return state.idToken
    },
    getlocalId(state){
      return state.localId
    },
  },
  actions:{
    setUser(user: CreateUserResponse, remember: boolean) {
      this.idToken = user.idToken
      this.localId = user.localId
      if(remember){
        localStorage.setItem("token", this.idToken)
        localStorage.setItem("localId", this.localId)
      }
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
        this.setUser(response, true)
        return response
      }
    },

  }
})
