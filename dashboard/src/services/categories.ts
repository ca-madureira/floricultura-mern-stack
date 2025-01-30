import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const createCategory = async ({ name }: { name: string }) => {
  try {
    const { data } = await api.post("categories/create", {
      name,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao se cadastrar");
  }
};

export const getAllCategories = async () => {
  try {
    const { data } = await api.get("categories/");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao retornar categorias");
  }
};

export const editCategoryById = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  try {
    const { data } = await api.put(`/categories/${id}`, { name }); // Passando o nome como um objeto
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao editar categorias");
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const { data } = await api.delete(`categories/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("erro ao excluir categoria");
  }
};
