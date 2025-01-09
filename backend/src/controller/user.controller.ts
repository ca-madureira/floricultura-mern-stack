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

    res.cookie('jwt-user', user.token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
    })

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao logar', error })
  }
}
