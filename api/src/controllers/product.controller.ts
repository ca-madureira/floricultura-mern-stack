import { Request, Response } from "express";
import {
  createProductService,
  getAllProductsService,
  deleteProductByIdService,
} from "../services/product.service";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productCreate = await createProductService(req.body);
    res.status(201).json({
      success: true,
      message: "Produto criado",
      product: productCreate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao retornar todas as categorias", error });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productDeleted = await deleteProductByIdService(id);
    res.status(200).json({
      message: "Produto deletada com sucesso",
      category: productDeleted,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar categoria", error });
  }
};
