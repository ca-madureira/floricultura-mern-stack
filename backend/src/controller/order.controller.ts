// src/controllers/order.controller.ts
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import {
  createOrderService,
  getAllOrdersService,
} from '../services/order.service'

// Controlador para criar um pedido
export const createOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Asserção de tipo para garantir que req tenha a propriedade `id`
    const userId = (req as Request & { id: string }).id

    if (!userId) {
      // Verificando se o `id` está presente
      res.status(400).json({ message: 'Usuário não autenticado' })
      return
    }

    // Garantir que o `id` seja tratado como ObjectId do MongoDB
    const orderCreate = await createOrderService({
      user: new mongoose.Types.ObjectId(userId),
      cartItems: req.body.items,
      totalAmount: req.body.total,
    })

    res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      order: orderCreate,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

// Controlador para obter todos os pedidos
export const getAllOrdersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Asserção de tipo para garantir que req tenha a propriedade `id`
    const userId = (req as Request & { id: string }).id

    if (!userId) {
      res.status(400).json({ message: 'Usuário não autenticado' })
      return
    }

    const orders = await getAllOrdersService(
      new mongoose.Types.ObjectId(userId),
    )

    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}
