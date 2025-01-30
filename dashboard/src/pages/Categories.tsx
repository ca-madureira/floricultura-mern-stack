import { categorySchema } from "../schemas/categorySchema";
import { createCategory, editCategoryById } from "../services/categories"; // Adiciona o editCategoryById
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoryTable from "../components/CategoryTable"; // Importando o componente CategoryTable
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";

export const Categories = () => {
  const queryClient = useQueryClient();
  const [editingCategory, setEditingCategory] = useState<null | {
    id: string;
    name: string;
  }>(null);

  // Mutação para criar categoria
  const { mutate: createMutate, status: createStatus } = useMutation({
    mutationFn: ({ name }: { name: string }) => {
      return createCategory({ name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Mutação para editar categoria
  const { mutate: editMutate, status: editStatus } = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => {
      return editCategoryById({ id, name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Hook do formulário
  const {
    register,
    handleSubmit,
    setValue, // Usado para preencher os campos do formulário com os dados da categoria que está sendo editada
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "", // Valor inicial para o campo 'name'
    },
  });

  // Função de submissão do formulário
  const onSubmit = ({ name }: { name: string }) => {
    if (editingCategory) {
      // Se estiver editando, chamamos a mutação de edição
      editMutate({ id: editingCategory.id, name });
    } else {
      // Se não estiver editando, chamamos a mutação de criação
      createMutate({ name });
    }
  };

  // Função para iniciar a edição de uma categoria
  const handleEdit = (category: { id: string; name: string }) => {
    setEditingCategory(category);
    setValue("name", category.name); // Preenche o campo de nome com o valor da categoria a ser editada
  };

  const isLoading = createStatus === "pending" || editStatus === "pending";

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
          {isLoading
            ? "Salvando..."
            : editingCategory
            ? "Salvar Edição"
            : "Adicionar Categoria"}
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
          <CategoryTable handleEdit={handleEdit} />{" "}
          {/* Passando a função de editar para a tabela */}
        </div>
      </section>
    </main>
  );
};
