import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

export const generateToken = (userId: Types.ObjectId) => {
  const secret = process.env.JWT_SECRET as string

  const token = jwt.sign({ userId }, secret, { expiresIn: '7d' })

  return token
}
