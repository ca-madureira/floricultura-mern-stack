import { Order } from "../models/order.model"; // Importando o modelo Order
import mongoose from "mongoose";

interface ICartItem {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

interface CreateOrderParams {
  user: mongoose.Types.ObjectId;
  cartItems: ICartItem[];
  totalAmount: number;
}

export const createOrderService = async ({
  user,
  cartItems,
  totalAmount,
}: CreateOrderParams) => {
  try {
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    const lastOrderNumber = lastOrder ? parseInt(lastOrder.orderNumber, 10) : 0;
    const newOrderNumber = (lastOrderNumber + 1).toString().padStart(6, "0");

    const newOrder = new Order({
      orderNumber: newOrderNumber,
      cartItems,
      totalAmount,
      status: "pago",
    });

    await newOrder.save();
    return newOrder;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao criar o pedido");
  }
};

// Função para obter todos os pedidos de um usuário
export const getAllOrdersService = async (userId: mongoose.Types.ObjectId) => {
  try {
    // Buscando pedidos do usuário e populando o campo `product` nos itens do carrinho
    const orders = await Order.find({ user: userId }).populate({
      path: "cartItems.product", // Populando o campo "product" dentro de "cartItems"
      select: "title", // Selecionando o campo "title" do produto (ajuste caso o nome do campo seja diferente)
    });

    return orders;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar pedidos");
  }
};
