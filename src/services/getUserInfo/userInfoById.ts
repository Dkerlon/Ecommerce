import axiosInstance from "@/config/axiosConfig"
import type { userInfo } from "@/interfaces/User"

export default async function getUserInfoById(id:string): Promise<userInfo | undefined>    {
    try{
      const response = await axiosInstance.get(`/users/${id}.json`)

      return response.data
    }
    catch(error){
        console.log(error)
    }
}
