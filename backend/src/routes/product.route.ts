import express from 'express'
export const productRouter = express.Router()

import {
  createProduct,
  getAllProducts,
  deleteProductById,
} from '../controller/product.controller'

productRouter.post('/create', createProduct)
productRouter.get('/', getAllProducts)

productRouter.delete('/:id', deleteProductById)
