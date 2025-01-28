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
    <main className="w-[85%] md:w-full flex flex-col justify-center items-center h-screen px-4 sm:px-6 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center sm:items-end w-full sm:w-[80%] md:w-[50%] lg:w-[40%]"
      >
        <button
          type="submit"
          className="flex items-center gap-2 text-[#27984c] hover:bg-[#27984c] hover:text-white font-medium border border-[#27984c] p-2 w-full sm:w-auto"
        >
          <FaPlusCircle />
          {isLoading ? "Salvando..." : "Adicionar Categoria"}
        </button>

        <section className="bg-slate-100 rounded-md p-4 w-full">
          <legend className="text-sm font-medium text-slate-800">
            Categoria
          </legend>
          <label
            htmlFor="name"
            className="block text-sm font-light text-gray-900"
          >
            Nome:
          </label>
          <input
            id="name"
            type="text"
            placeholder="Escreva o nome da categoria"
            className="outline-none bg-zinc-200 w-full h-[6vh] text-sm font-light text-gray-900 p-2 mt-2"
            {...register("name")}
          />

          {/* Exibindo erros de validação, se houver */}
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </section>
      </form>

      <section className="w-full md:w-[40%] mt-6 px-2 sm:px-0">
        <div className="overflow-x-auto">
          <CategoryTable />
        </div>
      </section>
    </main>
  );
};
