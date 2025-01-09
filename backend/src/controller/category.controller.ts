import { Request, Response } from 'express'
import { createCategoryService } from '../services/category.service'

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await createCategoryService(req.body)
    res.status(201).json(category)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error })
  }
}
