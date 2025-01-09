import mongoose, { Document, Model } from 'mongoose'

export interface ICategory extends Document {
  name: string
}

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Category: Model<ICategory> = mongoose.model<ICategory>(
  'Category',
  categorySchema,
)
