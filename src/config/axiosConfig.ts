// config/axiosConfig.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce-e0a11-default-rtdb.firebaseio.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors para logs ou tratamento de erros global
axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  error => {
    console.error("Erro na requisição Axios:", error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
