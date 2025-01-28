import axios from "axios";
import Cookies from "js-cookie"; // Importando js-cookie para ler os cookies

// Criando uma instância do axios com base na URL da API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL base da API
});

// Interceptor para adicionar o token de autenticação nas requisições
api.interceptors.request.use(
  (config) => {
    // Pegando o token do cookie 'jwt-user'
    const token = Cookies.get("jwt-user"); // Lê o token diretamente do cookie

    // Se o token existir, adiciona no cabeçalho Authorization
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Função para criar um pedido
export const createOrder = async (orderData: {
  items: {
    product: string;
    quantity: number;
  }[];
  total: number;
}) => {
  try {
    const response = await api.post("/orders/create", orderData); // Envia a requisição com o token no cabeçalho
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro ao criar pedido:",
        error.response?.data || error.message
      );
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw new Error("Erro ao criar o pedido");
  }
};

// Função para obter todos os pedidos
export const getOrders = async () => {
  try {
    const response = await api.get("/orders/all"); // Envia a requisição com o token no cabeçalho
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro ao buscar pedidos:",
        error.response?.data || error.message
      );
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw new Error("Erro ao buscar os pedidos");
  }
};
