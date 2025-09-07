// services/ProdutoService.ts
import axiosInstance from "@/config/axiosConfig";
import { useAuthStore } from "@/store/auth";

export interface Produto {
  categoria: string;
  criadoEm: string;
  descricao: string;
  fotos: string[];
  nome: string;
  preco: {
    atual: number;
    emPromocao: boolean;
    original: number;
    percentualDesconto: number;
  };
  quantidadeDisponivel: number;
  status: string;
  vendedorId: string;
  avaliacoes?: any[];
  id?: string;
}
const store = useAuthStore();
export class MeusProdutosService {

  private userId: string | null;

  constructor() {
    this.userId = store.getlocalId || null;
  }

  async getProdutosByVendedor() {
    try {
      const response = await axiosInstance.get("/produtos.json");
      const produtos: { [key: string]: Produto } = response.data;
      const produtosArray = Object.keys(produtos).map((id: string) => ({
        ...produtos[id],
        id: id
      })).filter(produto => produto.vendedorId === this.userId);

      return produtosArray;
    } catch (error) {
      console.error("Erro ao buscar produtos do vendedor:", error);
      throw error;
    }
  }
}
