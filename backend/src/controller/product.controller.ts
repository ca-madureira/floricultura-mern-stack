// Controller - Ajuste na tipagem
import { Request, Response } from 'express'
import { createProductService } from '../services/product.service'

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productCreate = await createProductService(
      req.body,
      req.file as Express.Multer.File,
    )
    res.status(201).json({
      success: true,
      message: 'Produto criado',
      product: productCreate,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
