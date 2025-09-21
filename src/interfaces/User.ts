export interface userInfo {
  carrinho: Record<string, number>,
  email: string,
  favoritos: string[],
  localId: string,
  nome: string,
  tipoConta: string,
  visaoGeral?: Record<string, string>
}
