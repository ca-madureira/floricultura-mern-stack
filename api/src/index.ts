import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectMongo } from "./db/connectMongo";

import { userRouter } from "./routes/user.route";
import { categoryRouter } from "./routes/category.route";
import { productRouter } from "./routes/product.route";
import { orderRouter } from "./routes/order.route";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

console.log(process.env.CLOUD_NAME); // Verifique se a variável está sendo carregada
console.log(process.env.API_KEY);
console.log(process.env.API_SECRET);

// Garantir que o cookie-parser seja aplicado antes de qualquer middleware de requisição
app.use(cookieParser()); // Agora 'cookie-parser' vem antes do 'express.json()'

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

// Configuração do CORS
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Adicione isso
};
app.use(cors(corsOptions));

// Suas rotas
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/admin/categories", categoryRouter);
app.use("/admin/products", productRouter);

app.listen(PORT, () => {
  connectMongo();
  console.log("Servidor rodando na porta", PORT);
});
