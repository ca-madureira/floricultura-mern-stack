import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  createOrderService,
  getAllOrdersService,
} from "../services/order.service";

// Controlador para criar um pedido
export const createOrder = async (req: Request, res: Response) => {
  try {
    // Obtendo o userId diretamente da requisição (esperando que esteja sendo passado no corpo da requisição)
    const { userId, items, total } = req.body; // userId, items e total vêm do corpo da requisição

    if (!userId) {
      res.status(400).json({ message: "Usuário não autenticado" });
    }

    // Garantir que o userId seja tratado como ObjectId do MongoDB
    const orderCreate = await createOrderService({
      user: new mongoose.Types.ObjectId(userId), // Convertendo para ObjectId do MongoDB
      cartItems: items,
      totalAmount: total,
    });

    // Respondendo com sucesso
    res.status(201).json({
      success: true,
      message: "Pedido criado com sucesso",
      order: orderCreate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// Controlador para obter todos os pedidos de um usuário
export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Usuário não autenticado" });
    }

    const orders = await getAllOrdersService(new mongoose.Types.ObjectId(id));

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
