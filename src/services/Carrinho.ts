import axiosInstance from "@/config/axiosConfig";
import { useAuthStore } from "@/store/auth";
const store = useAuthStore()
export const carrinhoService = {
  async adicionarAoCarrinho(idProduto: string, quantidade: number) {
    try {
      const response = await axiosInstance.put(`/users/${store.getlocalId}/carrinho/${idProduto}.json?auth=${store.isLoggedIn}`, { quantidade });
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      throw error;
    }
  },
  async deletarProdutoCarrinho(idProduto: string){
    try{
      const response = await axiosInstance.delete(`users/${store.getlocalId}/carrinho/${idProduto}.json?auth=${store.isLoggedIn}`)
      return response
    }catch(error){
      throw error
    }
  },
  async atualizarProdutoCarrinho(idProduto: string, quantidade: number){
    try{
      const response = await axiosInstance.put(`users/${store.getlocalId}/carrinho/${idProduto}.json?auth=${store.isLoggedIn}`, quantidade)
      return response
    }catch(error){
      throw error
    }
  }
}
