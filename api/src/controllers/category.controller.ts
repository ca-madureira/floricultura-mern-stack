import { Request, Response } from "express";
import {
  createCategoryService,
  deleteCategoryByIdService,
  getAllCategoriesService,
  editCategoryByIdService,
} from "../services/category.service";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await createCategoryService(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao retornar todas as categorias", error });
  }
};

export const editCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await editCategoryByIdService(id, req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Erro ao editar categoria", error });
  }
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    // Garantir que o ID está sendo passado corretamente
    const categoryId = req.params.id;

    // Chamar o serviço para deletar a categoria
    const categoryDeleted = await deleteCategoryByIdService({
      _id: categoryId,
    });

    // Retornar o documento deletado com um status 200
    res.status(200).json({
      message: "Categoria deletada com sucesso",
      category: categoryDeleted,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar categoria", error });
  }
};
