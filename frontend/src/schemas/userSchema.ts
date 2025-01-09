import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("Senha é obrigatória"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Nome de usuário deve ter pelo menos 3 caracteres")
      .nonempty("Nome de usuário é obrigatório"),
    email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .nonempty("Senha é obrigatória"),
    confirmPassword: z
      .string()
      .min(6, "A confirmação da senha deve ter pelo menos 6 caracteres")
      .nonempty("Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
