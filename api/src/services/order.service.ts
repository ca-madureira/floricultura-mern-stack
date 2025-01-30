import { Order } from "../models/order.model"; // Importando o modelo Order
import mongoose from "mongoose";

// Definindo a interface para os itens do carrinho
interface ICartItem {
  product: mongoose.Schema.Types.ObjectId; // ID do produto
  quantity: number; // Quantidade do produto
}

// Parâmetros para a criação de um pedido
interface CreateOrderParams {
  user: mongoose.Types.ObjectId; // ID do usuário
  cartItems: ICartItem[]; // Itens no carrinho
  totalAmount: number; // Valor total do pedido
}

// Função para criar um pedido
export const createOrderService = async ({
  user,
  cartItems,
  totalAmount,
}: CreateOrderParams) => {
  try {
    // Gerar o número do pedido
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    const lastOrderNumber = lastOrder ? parseInt(lastOrder.orderNumber, 10) : 0;
    const newOrderNumber = (lastOrderNumber + 1).toString().padStart(6, "0"); // Exemplo de número com 6 dígitos

    // Criando um novo pedido com os dados recebidos
    const newOrder = new Order({
      orderNumber: newOrderNumber, // Atribuindo o número gerado
      user, // Associando o pedido ao usuário
      cartItems,
      totalAmount,
      status: "pendente", // Status inicial da ordem
    });

    // Salvando o pedido no banco de dados
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
