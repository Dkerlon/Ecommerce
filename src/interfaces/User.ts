interface carrinho {
  produtoId: string,
  quantidade: number
}

export interface userInfo {
  carrinho: carrinho[],
  email: string,
  favoritos: string[],
  localId: string,
  nome: string,
  tipoConta: string,
  visaoGeral?: Record<string, string>
}
