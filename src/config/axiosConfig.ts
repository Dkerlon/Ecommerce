// config/axiosConfig.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce-e0a11-default-rtdb.firebaseio.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  error => {
    if (error.response && error.response.status === 401) {
      alert("Sua sessão expirou. Faça login novamente.");
    }else if(error.response){
      alert('Ocorreu um erro durante a requisição, tente novamente mais tarde...')
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
