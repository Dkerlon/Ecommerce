// services/ProdutoHttpService.ts
import axiosInstance from "../config/axiosConfig";
import { useAuthStore } from "@/store/auth";

const store = useAuthStore();

export interface Especificacao{
  nome: string,
  descricao: string
}

export interface Produto {
  nome: string;
  descricao: string;
  categoria: string;
  preco: {
    atual: number;
    original: number;
    emPromocao: boolean;
    percentualDesconto: number;
  };
  quantidadeDisponivel: number;
  status: string;
  fotos: string[];
  vendedorId: string;
  especificacoes?: Especificacao[]
}

export class ProdutoHttpService {

  private authtoken: string;
  private userId: string | null;

  constructor() {
    this.authtoken = store.isLoggedIn;
    this.userId = store.getlocalId || null;
  }
  async adicionarProduto(produto: Produto): Promise<string> {
    const produtoId = `prod_${Date.now()}`;

    await axiosInstance.put(`/produtos/${produtoId}.json?auth=${this.authtoken}`, {
      ...produto,
      avaliacoes: [],
      criadoEm: new Date().toISOString(),
    });

    await axiosInstance.put(`/users/${this.userId}/visaoGeral/produtos/${produtoId}.json?auth=${this.authtoken}`, produto.nome);
    return produtoId;
  }
}
