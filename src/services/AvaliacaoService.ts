import axiosInstance from "@/config/axiosConfig";
import { useAuthStore } from "@/store/auth";
// tipo da avaliação
export interface AvaliacaoPayload {
  produtoId: string;
  idCliente: string;
  nomeCliente: string;
  avaliacao: number;
  comentario: string;
  data: string; // dd/mm/aaaa
}

export const AvaliacaoService = {
  async publicarAvaliacao(payload: AvaliacaoPayload) {
    const store = useAuthStore()
    const timeStampMs = Date.now();
    try {
      const response = await axiosInstance.put(`/produtos/${payload.produtoId}/avaliacoes/aval${timeStampMs}.json?auth=${store.isLoggedIn}`, payload);
      return response.data;
    } catch (error) {
      console.error("Erro ao publicar avaliação:", error);
      throw error;
    }
  },
  async getAvaliacoesProduto(idProduto: string) {
    try {
      const response = await axiosInstance.get(`/produtos/${idProduto}/avaliacoes.json`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar avaliação:", error);
      throw error;
    }
  },
};

