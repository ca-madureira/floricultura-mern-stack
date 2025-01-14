import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schemas/productSchema"; // Path para o schema do produto
import { createProduct } from "../services/products"; // Path para o serviço de criar produto
import { getAllCategories } from "../services/categories";

import ProductTable from "../components/ProductTable";

interface ProductData {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: string | null; // Agora a imagem é uma string base64 ou null
}

interface Category {
  _id: string;
  name: string;
}

export const Products = () => {
  const { data } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const { mutate } = useMutation({
    mutationFn: (productData: {
      title: string;
      description: string;
      category: string;
      price: number;
      stock: number;
      image: string | null; // A imagem agora é uma string base64
    }) => {
      return createProduct(productData);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Necessário para atualizar o campo de imagem programaticamente
  } = useForm<ProductData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      stock: 0,
      image: null, // Iniciando como null
    },
  });

  // Função para lidar com o upload da imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Pega o primeiro arquivo selecionado
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Aqui você seta a imagem no estado do formulário como base64
        setValue("image", reader.result as string); // Usa o `setValue` para atualizar o valor no react-hook-form
      };
      reader.readAsDataURL(file); // Converte o arquivo para base64
    }
  };

  const onSubmit = async (data: ProductData) => {
    const price = parseFloat(data.price.toString().replace(",", "."));
    const stock = parseInt(data.stock.toString(), 10);

    if (isNaN(price) || isNaN(stock)) {
      return;
    }

    const productData = {
      title: data.title,
      description: data.description,
      category: data.category,
      price,
      stock,
      image: data.image, // A imagem já estará em base64 aqui
    };

    mutate(productData); // Envio da mutação
  };

  return (
    <main className="flex flex-col gap-20 bg-slate-200 w-full h-full justify-between">
      <section className="h-[9.6vh] flex items-center text-2xl font-semibold pl-2 text-slate-600 border-b-2 border-gray-300">
        <h1>Criar Produto</h1>
      </section>

      <section className="border-2 border-slate-400 h-[12vh] bg-purple-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
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
          <select
            id="category"
            {...register("category")}
            className="outline-none border-b-2 border-gray-200"
          >
            <option value="">Selecione uma categoria</option>
            {data?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500">{errors.category.message}</span>
          )}

          <label htmlFor="price">Preço:</label>
          <input
            id="price"
            type="text"
            placeholder="Escreva o preço do produto"
            className="outline-none border-b-2 border-gray-200"
            {...register("price", {
              setValueAs: (value) =>
                parseFloat(value.toString().replace(",", ".")),
            })}
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}

          <label htmlFor="stock">Estoque:</label>
          <input
            id="stock"
            type="text"
            className="outline-none border-b-2 border-gray-200"
            {...register("stock", {
              setValueAs: (value) => parseInt(value.toString(), 10),
            })}
          />
          {errors.stock && (
            <span className="text-red-500">{errors.stock.message}</span>
          )}

          <label htmlFor="image">Imagem (Upload):</label>
          <input
            id="image"
            type="file"
            className="outline-none border-b-2 border-gray-200"
            onChange={handleImageChange} // Usar a função handleImageChange
          />
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}

          <button type="submit" className="bg-sky-200 p-2">
            Criar Produto
          </button>
        </form>
      </section>

      <section>
        <ProductTable />
      </section>
    </main>
  );
};
