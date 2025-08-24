// src/store/index.ts
import type signInInterface from '@/interfaces/signIn'
import signIn from '@/services/createAccount'
import { createStore } from 'vuex'

export interface State {
  token: string | null
}

const store = createStore<State>({
  state: {
    token: localStorage.getItem('token') || null,
  },
  getters: {
    isLoggedIn(state): boolean {
      return !!state.token
    },
  },
  mutations: {
    setToken(state, token: string | null) {
      state.token = token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
      console.log(state.token)
    },
  },
  actions: {
    login({ commit }, token: string) {

      commit('setToken', token)
    },
    logout({ commit }) {
      commit('setToken', null)
    },
    async createAccout({ commit }, userData: signInInterface){
      const response = await signIn(userData)
      if(response){
        commit('setToken', response)
      }
    }
  },
})

export default store
