export type User = {
  localId: string,
  refreshToken: string,
  email: string,
  expiresIn: string,
  idToken: string | null,
}

export type UserRegister = {
  nome: string,
  email: string,
  localId: string,
  tipoConta: string,
}