import type CreateUserResponse from "@/interfaces/CreateUserResponse";
import type signInInterface from "@/interfaces/signIn";
import { useStore } from "@/store";

export default async function signIn(userData: signInInterface): Promise<CreateUserResponse | void> {
  try {
    const mainStore = useStore()
    const api_key = mainStore.getApiKey
    const url_api = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`;

    const response = await fetch(url_api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        returnSecureToken: true,
      }),
    });

    const data: CreateUserResponse = await response.json();
    return data
  } catch (error) {
    console.error("Erro inesperado:", error);
  }
}
