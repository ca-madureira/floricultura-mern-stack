import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const createProduct = async ({
  title,
  description,
  category,
  price,
  stock,
  image,
}: {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: string | null;
}) => {
  try {
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("description", description);
    // formData.append("category", category);
    // formData.append("price", price.toString());
    // formData.append("stock", stock.toString());
    // if (image) {
    //   formData.append("image", image);
    // }

    const { data } = await api.post("products/create", {
      title,
      description,
      category,
      price,
      stock,
      image,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao criar o produto");
  }
};

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("products/");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao retornar produtos");
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const { data } = await api.delete(`products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("erro ao excluir product");
  }
};
