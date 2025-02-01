import express from "express";
export const productRouter = express.Router();

import {
  createProduct,
  getAllProducts,
  deleteProductById,
  updateProduct,
} from "../controllers/product.controller";

productRouter.post("/create", createProduct);
productRouter.get("/", getAllProducts);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProductById);
