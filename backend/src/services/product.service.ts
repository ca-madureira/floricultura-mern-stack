import { Express } from 'express'
import mongoose from 'mongoose'
import { Product } from '../models/product.model'
import uploadImageOnCloudinary from '../utils/imageUpload'

interface ProductData {
  title: string
  description: string
  category: mongoose.Types.ObjectId
  price: number
  stock: number
}

export const createProductService = async (
  data: ProductData,
  file: Express.Multer.File,
) => {
  const { title, description, category, price, stock } = data
  const product = await Product.findOne({ title })

  if (product) {
    throw new Error('ja existe produto com esse nome')
  }

  if (!file) {
    throw new Error('imagem é obrigatoria')
  }

  const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File)

  const newProduct = await Product.create({
    title,
    description,
    category,
    price,
    stock,
    imageUrl,
  })

  return newProduct
}
