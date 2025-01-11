import * as z from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "categoria deve conter ao menos 3 caracteres")
    .nonempty("Nome da categoria é obrigatoria"),
});
