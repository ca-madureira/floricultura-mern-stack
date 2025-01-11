import { categorySchema } from "../schemas/categorySchema";
import { createCategory } from "../services/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoryTable from "../components/CategoryTable";

export const Categories = () => {
  const queryClient = useQueryClient();
  // Mutação com React Query
  const { mutate } = useMutation({
    mutationFn: ({ name }: { name: string }) => {
      return createCategory({ name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Hook do formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "", // Valor inicial para o campo 'name'
    },
  });

  // Função de submissão do formulário
  const onSubmit = ({ name }: { name: string }) => {
    mutate({ name });
  };

  return (
    <main className="flex flex-col gap-20 bg-slate-200 w-full h-full">
      <section className="h-[9.6vh] flex items-center text-2xl font-semibold pl-2 text-slate-600 border-b-2 border-gray-300">
        <h1>Categoria</h1>
      </section>

      <section className="border-2 border-slate-400 h-[12vh] bg-purple-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4"
        >
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            placeholder="Escreva o nome da categoria"
            className="outline-none border-b-2 border-gray-200"
            {...register("name")} // Associando o campo 'name' com o 'register'
          />
          {/* Exibindo erros de validação, se houver */}
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}

          <button
            type="submit" // Definindo o botão como 'submit' para disparar a ação de envio
            className="bg-sky-200 p-2"
          >
            Criar
          </button>
        </form>
      </section>

      <section>
        <CategoryTable />
      </section>
    </main>
  );
};
