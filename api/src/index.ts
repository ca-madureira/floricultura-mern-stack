import express from "express";
import dotenv from "dotenv";
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

app.use(cookieParser());

app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/admin/categories", categoryRouter);
app.use("/admin/products", productRouter);

app.listen(PORT, () => {
  connectMongo();
  console.log("Servidor rodando na porta", PORT);
});
