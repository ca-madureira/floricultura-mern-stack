import express from "express";
import {
  createOrder,
  getAllOrdersController,
} from "../controllers/order.controller";

export const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/:id", getAllOrdersController);
