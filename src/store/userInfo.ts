import { defineStore } from "pinia";
import { carrinhoService } from "@/services/Carrinho";

export const useUserInfo = defineStore('userInfo', {
  state: () => {
    return {
      email: '',
      nome: 'Kerlon Brito de Aragão',
      carrinho: [],
      favoritos:[],
      notificacoes:[],
      tipoConta: ''
    }
  },
  getters:{
    getTipoConta: (state) => {
      return state.tipoConta
    },
    getCarrinho: (state => {
      return state.carrinho
    })
  },
  actions: {
    setUserInfo(userInfo){
      this.email = userInfo.email
      this.nome = userInfo.nome
      console.log(this.carrinho)
      this.carrinho = Object.entries(userInfo.carrinho || [])
      this.tipoConta = userInfo.tipoConta
    },
    async setUserCarrinho(){
      const response = await carrinhoService.getItensCarrinho()
      console.log(response)
      this.carrinho = Object.entries(response.data || [])
    }
  }
})
