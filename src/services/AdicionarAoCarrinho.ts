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
}
