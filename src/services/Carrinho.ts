import axiosInstance from "@/config/axiosConfig";
import { useAuthStore } from "@/store/auth";

export const carrinhoService = {
  async adicionarAoCarrinho(idProduto: string, quantidade: number) {
    const store = useAuthStore(); // <- só inicializa quando o método é chamado
    try {
      const response = await axiosInstance.put(
        `/users/${store.getlocalId}/carrinho/${idProduto}.json?auth=${store.isLoggedIn}`,
        { quantidade }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      throw error;
    }
  },

  async deletarProdutoCarrinho(idProduto: string) {
    const store = useAuthStore();
    try {
      const response = await axiosInstance.delete(
        `users/${store.getlocalId}/carrinho/${idProduto}.json?auth=${store.isLoggedIn}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async atualizarProdutoCarrinho(idProduto: string, quantidade: number) {
    const store = useAuthStore();
    try {
      const response = await axiosInstance.put(
        `users/${store.getlocalId}/carrinho/${idProduto}.json?auth=${store.isLoggedIn}`,
        quantidade
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getItensCarrinho() {
    const store = useAuthStore();
    try {
      const response = await axiosInstance.get(
        `users/${store.getlocalId}/carrinho/.json?auth=${store.isLoggedIn}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
