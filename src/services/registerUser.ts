import type  { UserRegister } from "@/types/User";
export default async function registerUser(userData: UserRegister, idToken: string) {
    
  try {
    console.log(idToken)
    const url_api = `https://ecommerce-e0a11-default-rtdb.firebaseio.com/users/${userData.localId}.json?auth=`+idToken;
    const response = await fetch(url_api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData
      }),
    });

    const data = await response.json();
    console.log(response.ok)
    return data
  } catch (error) {
    console.error("Erro inesperado:", error);
  }
}
