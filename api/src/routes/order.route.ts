import express from "express";
import {
  createOrder,
  getAllOrdersController,
} from "../controllers/order.controller";

export const orderRouter = express.Router();

// Usando o middleware de autenticação para proteger a rota
orderRouter.post("/create", createOrder);
orderRouter.get("/:id", getAllOrdersController);
