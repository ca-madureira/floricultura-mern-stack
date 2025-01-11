import * as z from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(3, "O produto deve conter ao menos 3 caracteres")
    .nonempty("Nome do produto é obrigatório"),

  description: z
    .string()
    .min(20, "A descrição deve conter ao menos 20 caracteres"),

  category: z
    .string()
    .min(3, "A categoria deve conter ao menos 3 caracteres")
    .nonempty("A categoria é obrigatória"),

  price: z
    .number()
    .positive("O preço deve ser um número positivo")
    .min(0.01, "O preço deve ser maior que zero"),

  image: z
    .string()
    .url("A URL da imagem é inválida")
    .nonempty("A imagem é obrigatória"),
});
