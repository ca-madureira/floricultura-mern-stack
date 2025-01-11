import express from 'express'
import upload from '../middlewares/multer'

export const productRouter = express.Router()

import { createProduct } from '../controller/product.controller'

productRouter.post('/create', upload.single('image'), createProduct)
