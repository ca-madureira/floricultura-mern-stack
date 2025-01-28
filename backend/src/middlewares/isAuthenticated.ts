import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Middleware de autenticação
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Pega o token do cookie 'jwt-user'
    const token = req.cookies?.token

    console.log('token', token)

    // Se não houver token, retornamos um erro
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      })
      return // Evitar continuar com o fluxo sem token
    }

    // Verificamos o token usando a chave secreta
    const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload

    // Se o token não for válido ou não contiver o campo '_id', retornamos um erro
    if (!decode || !decode._id) {
      res.status(401).json({
        success: false,
        message: 'Invalid token',
      })
      return // Evitar continuar com o fluxo sem um token válido
    }

    // Atribuímos o '_id' à requisição para que esteja disponível nas próximas etapas
    ;(req as Request & { id: string }).id = decode._id // Atribuindo o '_id' no req

    next() // Passa a execução para o próximo middleware ou controlador
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
