import express from "express";

export const categoryRouter = express.Router();

import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  editCategoryById,
} from "../controllers/category.controller";

categoryRouter.post("/create", createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.put("/:id", editCategoryById);
categoryRouter.delete("/:id", deleteCategoryById);
