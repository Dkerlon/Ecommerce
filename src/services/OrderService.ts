import axiosInstance from "@/config/axiosConfig"
import { useAuthStore } from "@/store/auth"
const store = useAuthStore()
export interface orderRequest{
  produtos: string[],
  metodoPagamento: string,
  data: string,
  codigoRastreio: string,
  statusEnvio: string,
  idComprador: string
}

export default class OrderService {
  static token = useAuthStore().isLoggedIn
  static async createNewOrder(order: orderRequest){
     try{
      axiosInstance.put(`orders/${'order' + order.data}.json?auth=${this.token}`, order)
      for(const produto of order.produtos){
        await axiosInstance.delete(`/users/${store.getlocalId}/carrinho/${produto}.json?auth=${store.isLoggedIn}`)
      }
     }catch (error){
      throw error
     }
  }
}
