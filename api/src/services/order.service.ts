import { Order } from "../models/order.model";
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
      user,
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

export const getAllOrdersService = async (userId: mongoose.Types.ObjectId) => {
  try {
    const orders = await Order.find({ user: userId }).populate({
      path: "cartItems.product",
      select: "title price",
    });

    return orders;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar pedidos");
  }
};
