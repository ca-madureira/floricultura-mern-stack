import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticatedToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json("usuario nao autenticado");
  }

  try {
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    if (!decode) {
      res.status(401).json("usuario nao autorizado");
      return;
    }
    req.id = decode.userId;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json("Sessão expirada");
    } else {
      res.status(401).json("usuario nao autorizado");
    }
  }
};
