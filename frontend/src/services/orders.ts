import axios, { AxiosResponse } from "axios";
import apiClient from "./apiClient";

interface OrderItem {
  product: string;
  quantity: number;
}

interface OrderData {
  items: OrderItem[];
  total: number;
  userId: string; // Incluindo o userId aqui para ser consistente com o que você precisa passar
}

export const createOrder = async (orderData: OrderData) => {
  // A função espera um objeto OrderData
  try {
    const { data }: AxiosResponse<OrderData> = await apiClient.post(
      "/orders/create",
      orderData
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage = error.response.data?.message;
        if (error.response.status === 401) {
          if (errorMessage === "Sessão expirada") {
            throw new Error("Sessão expirada.");
          } else {
            throw new Error(errorMessage || "Token inválido.");
          }
        }
        throw new Error(errorMessage || "Erro na requisição");
      }
      throw new Error("Erro desconhecido na requisição");
    }
    throw error;
  }
};

// Atualizando a função para aceitar userId
export const getAllOrder = async (userId: string) => {
  try {
    // Passando o userId na URL para filtrar os pedidos do usuário
    const { data } = await apiClient.get(`/orders/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao retornar pedidos");
  }
};
