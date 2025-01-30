import { Category } from "../models/category.model";

interface CategoryData {
  name: string;
}

interface CategoryId {
  _id: string;
}

export const createCategoryService = async (data: CategoryData) => {
  try {
    const { name } = data;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      throw new Error("categoria ja criada");
    }

    const category = await Category.create({
      name,
    });

    return category;
  } catch (error) {
    throw new Error(`Erro ao criar categoria: ${error}`);
  }
};

export const getAllCategoriesService = async () => {
  try {
    const categories = await Category.find({});

    if (!categories) {
      throw new Error("Não tem categorias disponiveis");
    }

    return categories;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryByIdService = async (data: CategoryId) => {
  try {
    const { _id } = data;

    const deletedCategory = await Category.findOneAndDelete({ _id });

    if (!deletedCategory) {
      throw new Error("Categoria não encontrada");
    }

    return deletedCategory;
  } catch (error) {
    throw new Error(`Erro ao deletar categoria: ${error}`);
  }
};
