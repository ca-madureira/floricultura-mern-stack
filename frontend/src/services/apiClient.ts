import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Habilita o envio de cookies para o backend
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
