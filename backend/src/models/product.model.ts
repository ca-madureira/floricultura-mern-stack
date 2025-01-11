import mongoose, { Document, Model } from 'mongoose'

export interface IProduct extends Document {
  title: string
  description: string
  category: mongoose.Schema.Types.ObjectId
  price: number
  image: string
  stock: number
}

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
})

export const Product: Model<IProduct> = mongoose.model<IProduct>(
  'Product',
  productSchema,
)
