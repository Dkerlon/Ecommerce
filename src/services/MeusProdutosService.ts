// services/ProdutoService.ts
import axiosInstance from "@/config/axiosConfig";
import { useAuthStore } from "@/store/auth";
import type { AvaliacaoPayload } from "./AvaliacaoService";

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
  avaliacoes?: Record<string, AvaliacaoPayload>;
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
  async getAllProdutos(){
    try{
      const response = await axiosInstance.get("/produtos.json")
      const produtos: { [key: string]: Produto } = response.data;
      const produtosArray = Object.keys(produtos).map((id: string) => ({
        ...produtos[id],
        id: id
      }))
      console.log(produtosArray)
      return produtosArray
    }catch (error){
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  }
  async getProdutoById(id: string){
    try{
      const response = await axiosInstance.get(`/produtos/${id}.json`)
      const produto: Produto = response.data
      console.log(produto)
      return produto
    }catch (error){
      console.error("Erro ao buscar produto:", error);
      throw error;
    }
  }
}
