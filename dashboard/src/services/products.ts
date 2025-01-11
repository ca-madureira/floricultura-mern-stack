import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const createProduct = async ({
  title,
  description,
  category,
  price,
  image,
}: {
  title: string;
  description: string;
  category: string;
  price: number;
  image: File; // Aqui você pode alterar para aceitar um File se for o caso
}) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price.toString()); // Convertendo o preço para string
    if (image) {
      formData.append("image", image); // Adicionando a imagem
    }

    const { data } = await api.post("products/create", formData);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao criar o produto");
  }
};
