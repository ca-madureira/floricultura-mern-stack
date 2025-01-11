import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schemas/productSchema"; // Path do schema do produto
import { createProduct } from "../services/products"; // Path para o serviço de criar produto

interface ProductData {
  title: string;
  description: string;
  category: string;
  price: number;
  image: FileList; // Mudando para FileList para suportar o arquivo
}

export const Products = () => {
  // Mutação com React Query
  const { mutate } = useMutation({
    mutationFn: (productData: {
      title: string;
      description: string;
      category: string;
      price: number;
      image: File;
    }) => {
      return createProduct(productData); // Passando os dados do produto para a requisição
    },
  });

  // Hook do formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      image: undefined, // Alterando para aceitar arquivo
    },
  });

  // Função de submissão do formulário
  const onSubmit = async (data: ProductData) => {
    const productData = {
      title: data.title,
      description: data.description,
      category: data.category,
      price: data.price,
      image: data.image[0], // Selecionando a imagem do FileList
    };

    // Chamando a mutação passando os dados do produto
    mutate(productData);
  };

  return (
    <main className="flex flex-col gap-20 bg-slate-200 w-full h-full">
      <section className="h-[9.6vh] flex items-center text-2xl font-semibold pl-2 text-slate-600 border-b-2 border-gray-300">
        <h1>Criar Produto</h1>
      </section>

      <section className="border-2 border-slate-400 h-[12vh] bg-purple-200">
        <form
          onSubmit={handleSubmit(onSubmit)} // Submete os dados com validação
          className="flex flex-col gap-4 p-4"
        >
          <label htmlFor="title">Nome do Produto:</label>
          <input
            id="title"
            type="text"
            placeholder="Escreva o nome do produto"
            className="outline-none border-b-2 border-gray-200"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}

          <label htmlFor="description">Descrição:</label>
          <input
            id="description"
            type="text"
            placeholder="Escreva a descrição do produto"
            className="outline-none border-b-2 border-gray-200"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}

          <label htmlFor="category">Categoria:</label>
          <input
            id="category"
            type="text"
            placeholder="Escreva a categoria do produto"
            className="outline-none border-b-2 border-gray-200"
            {...register("category")}
          />
          {errors.category && (
            <span className="text-red-500">{errors.category.message}</span>
          )}

          <label htmlFor="price">Preço:</label>
          <input
            id="price"
            type="number"
            placeholder="Escreva o preço do produto"
            className="outline-none border-b-2 border-gray-200"
            {...register("price")}
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}

          <label htmlFor="image">Imagem (Upload):</label>
          <input
            id="image"
            type="file"
            className="outline-none border-b-2 border-gray-200"
            {...register("image")}
          />
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}

          <button type="submit" className="bg-sky-200 p-2">
            Criar Produto
          </button>
        </form>
      </section>
    </main>
  );
};
