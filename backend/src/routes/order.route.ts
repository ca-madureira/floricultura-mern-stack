import express from 'express'
import {
  createOrder,
  getAllOrdersController,
} from '../controller/order.controller'
import { isAuthenticated } from '../middlewares/isAuthenticated'

export const orderRouter = express.Router()

// Usando o middleware de autenticação para proteger a rota
orderRouter.post('/create', isAuthenticated, createOrder)
orderRouter.get('/all', isAuthenticated, getAllOrdersController)
