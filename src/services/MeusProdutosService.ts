// services/ProdutoService.ts
import axiosInstance from "@/config/axiosConfig";
import { useAuthStore } from "@/store/auth";
import type { AvaliacaoPayload } from "./AvaliacaoService";
import type { Especificacao } from "./AdicionarProdutoService";

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
  especificacoes: Especificacao[]
  id?: string;
}
const store = useAuthStore();
export class MeusProdutosService {

  private userId: string | null;
  private userToken: string | null;
  constructor() {
    this.userId = store.getlocalId || null;
    this.userToken = store.isLoggedIn
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
  async atualizarProduto(id: string, payload:Produto){
    try{
      const response = await axiosInstance.patch(`/produtos/${id}.json?auth=${this.userToken}`, payload)
      return response.data
    }catch (error){
      console.error("Erro ao editar produto:", error);
      throw error;
    }
  }
}
