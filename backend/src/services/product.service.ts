import { Product } from '../models/product.model'
import cloudinary from '../utils/cloudinary'

interface ProductData {
  title: string
  description: string
  category: string
  price: number
  stock: number
  image: string
}

export const createProductService = async (data: ProductData) => {
  const { title, description, category, price, stock, image } = data
  let cloudinaryResponse = null

  if (image) {
    cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: 'papelaria',
    })
  }

  const product = await Product.findOne({ title })
  if (product) {
    throw new Error('Já existe produto com esse nome')
  }

  const newProduct = await Product.create({
    title,
    description,
    category,
    price,
    stock,
    image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : '',
  })

  return newProduct
}

export const getAllProductsService = async () => {
  try {
    const products = await Product.find({}).populate('category', 'name')

    if (!products || products.length === 0) {
      throw new Error('Não há produtos disponíveis')
    }

    return products
  } catch (error) {
    console.log(error)
    throw error // Re-throwing the error after logging it
  }
}

export const deleteProductByIdService = async (data: string) => {
  try {
    const productDeleted = await Product.findByIdAndDelete(data)

    if (!productDeleted) {
      throw new Error('Produto não encontrada')
    }

    return productDeleted
  } catch (error) {
    throw new Error(`Erro ao deletar produto: ${error}`)
  }
}
