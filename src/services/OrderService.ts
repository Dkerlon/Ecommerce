import axiosInstance from "@/config/axiosConfig"
import { useAuthStore } from "@/store/auth"

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
  static createNewOrder(order: orderRequest){
     try{
      axiosInstance.put(`orders/${'order' + order.data}.json?auth=${this.token}`, order)

     }catch (error){
      throw error
     }
  }
}
