import mongoose, { Document, Model } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)
