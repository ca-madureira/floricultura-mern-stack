import { categorySchema } from "../schemas/categorySchema";
import { createCategory } from "../services/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoryTable from "../components/CategoryTable";
import { FaPlusCircle } from "react-icons/fa";

export const Categories = () => {
  const queryClient = useQueryClient();
  // Mutação com React Query
  const { mutate, status } = useMutation({
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

  const isLoading = status === "pending";

  return (
    <main className="w-full flex flex-col justify-evenly items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-end w-2/4"
      >
        <button
          type="submit"
          className="flex items-center gap-2 text-[#27984c] hover:bg-[#27984c] hover:text-white font-medium border border-[#27984c] p-2"
        >
          <FaPlusCircle />
          {isLoading ? "Salvando..." : "Adicionar Categoria"}
        </button>
        <section className="bg-slate-100 rounded-md p-2 w-[40%]">
          <legend className="text-sm font-medium text-slate-800">
            Categoria
          </legend>
          <label
            htmlFor="name"
            className="block text-sm/6 font-light text-gray-900"
          >
            Nome:
          </label>
          <input
            id="name"
            type="text"
            placeholder="Escreva o nome do produto"
            className="outline-none bg-zinc-200 w-full h-[6vh] text-sm font-light text-gray-900 p-2"
            {...register("name")}
          />

          {/* Exibindo erros de validação, se houver */}
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </section>
      </form>

      <section className="">
        <CategoryTable />
      </section>
    </main>
  );
};
