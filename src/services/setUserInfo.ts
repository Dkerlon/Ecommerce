import { useAuthStore } from "@/store/auth"
import getUserInfoById from "./getUserInfo/userInfoById"
import { useUserInfo } from "@/store/userInfo"
import type CreateUserResponse from "@/interfaces/CreateUserResponse"

export async function setUserInfo() {
  const store = useAuthStore()
  const userInfostore = useUserInfo()

  const userData = {
      localId: localStorage.getItem("localId"),
      idToken: localStorage.getItem("token"),
    }
    if(userData.localId && userData.idToken){
      store.setUser(userData as CreateUserResponse, true)
      const userInfo = await getUserInfoById(userData.localId)
      userInfostore.setUserInfo(userInfo)
      console.log(userInfostore.getTipoConta)
    }
}
