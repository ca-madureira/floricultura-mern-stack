import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  createOrderService,
  getAllOrdersService,
} from "../services/order.service";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, total } = req.body;

    if (!userId) {
      res.status(400).json({ message: "Usuário não autenticado" });
    }

    const orderCreate = await createOrderService({
      user: new mongoose.Types.ObjectId(userId),
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
