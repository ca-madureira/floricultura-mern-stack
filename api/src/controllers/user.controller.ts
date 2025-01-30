import { Request, Response } from "express";
import { createUser, loginUser } from "../services/user.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body);

    console.log("Antes de setar o cookie:", user.token);

    res.cookie("access_token", user.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    console.log("Depois de setar o cookie:", res.getHeaders());

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao logar", error });
  }
};
