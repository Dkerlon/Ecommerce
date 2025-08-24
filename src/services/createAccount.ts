import type signInInterface from "@/interfaces/signIn";

export default async function signIn(userData:signInInterface): Promise<string | void> {
  try{
    const api_key = 'AIzaSyBZn-DXKwqEA9mCdn8DB6a1bt0jUsw-Qiw'
    const url_api = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`
    const  response = await fetch(url_api,{
      method:'POST',
      body: JSON.stringify({
        ...userData,
        returnSecureToken: true
      })
    })
    const data = await response.json()
    console.log(data)
    if(response.ok){
      return data.idToken
    }
  }catch{
    console.log('Erro na solicitação!')
  }
}
