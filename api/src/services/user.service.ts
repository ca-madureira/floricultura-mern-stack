import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { Types } from "mongoose";

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface UserLogin {
  email: string;
  password: string;
}

export const createUser = async (userData: UserData) => {
  try {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("Usuário já existe com esse email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error}`);
  }
};

export const loginUser = async (userLogin: UserLogin) => {
  const { email, password } = userLogin;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email não encontrado");
  }

  const isPassMatch = await bcrypt.compare(password, user.password);

  if (!isPassMatch) {
    throw new Error("Senhas não sao iguais");
  }

  const token = generateToken(user);
  const userWithoutPassword = await User.findOne({ email }).select("-password");

  return {
    userWithoutPassword,
    token,
  };
};
