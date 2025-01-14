import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("products");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao retornar produtos");
  }
};
