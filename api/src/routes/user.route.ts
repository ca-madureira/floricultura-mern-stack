import express from "express";

export const userRouter = express.Router();

import { login, signup } from "../controllers/user.controller";

userRouter.post("/register", signup);
userRouter.post("/login", login);
