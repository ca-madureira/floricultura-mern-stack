import { Request, Response } from 'express'
import { createUser } from '../services/user.service'
import { loginUser } from '../services/user.service'

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body)

    console.log('fiz o login', user.token)

    res.cookie('token', user.token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 dias
      httpOnly: true, // Impede o acesso via JS no navegador
      sameSite: 'lax',
      secure: false, // Altere para 'true' em produção (com HTTPS)
    })

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao logar', error })
  }
}
