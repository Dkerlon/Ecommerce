import { defineStore } from "pinia";

export const useUserInfo = defineStore('userInfo', {
  state: () => {
    return {
      email: '',
      nome: 'Kerlon Brito de Aragão',
      carrinho: [],
      tipoConta: ''
    }
  },
  getters:{
    getTipoConta: (state) => {
      return state.tipoConta
    }
  },
  actions: {
    setUserInfo(userInfo){
      this.email = userInfo.email
      this.nome = userInfo.nome
      this.carrinho = userInfo.produtos || []
      this.tipoConta = userInfo.tipoConta
    }
  }
})
