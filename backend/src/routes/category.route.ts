import express from 'express'

export const categoryRouter = express.Router()

import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
} from '../controller/category.controller'

categoryRouter.post('/create', createCategory)
categoryRouter.get('/', getAllCategories)
categoryRouter.delete('/:id', deleteCategoryById)
