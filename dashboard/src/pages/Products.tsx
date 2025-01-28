import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schemas/productSchema"; // Caminho para o schema do produto
import { createProduct } from "../services/products"; // Caminho para o serviço de criar produto
import { getAllCategories } from "../services/categories";
import { FaPlusCircle, FaFileImage } from "react-icons/fa";
import { GrUploadOption } from "react-icons/gr";
import ProductTable from "../components/ProductTable";
import { useRef } from "react";

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
  const queryClient = useQueryClient();

  // Fazendo o fetch das categorias
  const { data } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // Hook de mutação para criar o produto
  const { mutate, status } = useMutation({
    mutationFn: (productData: ProductData) => {
      return createProduct(productData); // Chama a função para criar o produto
    },
    onSuccess: () => {
      // Limpa o formulário após sucesso na mutação
      reset();
      // Invalida as queries para recarregar a lista de produtos
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // Configuração do useForm com react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProductData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      stock: 0,
      image: null,
    },
  });

  const inputFileRef = useRef<HTMLInputElement | null>(null); // Ref para o input de arquivo

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

  // Função chamada no submit do formulário
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

    mutate(productData); // Chama a mutação para criar o produto
  };

  // Pegando o valor da imagem do formulário
  const image = watch("image");

  const isLoading = status === "pending";

  return (
    <main className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full ">
        <button
          type="submit"
          className="flex items-center md:self-end md:w-[18%] w-[82%] ml-2 gap-2 text-[#27984c] hover:bg-[#27984c] hover:text-white font-medium mr-[8%] mt-6 border border-[#27984c] p-2"
        >
          <FaPlusCircle />
          {isLoading ? "Salvando..." : "Adicionar Produto"}
        </button>
        <section className="flex flex-col md:flex-row justify-evenly">
          <section className="bg-slate-100 rounded-md mx-2 md:mx-20 mt-10 p-4 w-[82%] md:w-2/4">
            <legend className="text-sm font-medium text-slate-800">
              Informações gerais
            </legend>
            <label
              htmlFor="title"
              className="block text-sm/6 font-light text-gray-900"
            >
              Nome:
            </label>
            <input
              id="title"
              type="text"
              placeholder="Escreva o nome do produto"
              className="outline-none bg-zinc-200 w-full h-[6vh] text-sm font-light text-gray-900 p-2"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}

            <label
              htmlFor="description"
              className="block text-sm/6 font-light text-gray-900"
            >
              Descrição:
            </label>
            <textarea
              id="description"
              rows={4}
              cols={5}
              placeholder="Escreva a descrição do produto"
              className="outline-none bg-zinc-200 w-full h-[12vh] text-sm font-light text-gray-900 p-2 resize-none"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}

            <label
              htmlFor="category"
              className="block text-sm/6 font-light text-gray-900"
            >
              Categoria:
            </label>
            <select
              id="category"
              {...register("category")}
              className="outline-none bg-zinc-200 w-[40vw] md:w-[10vw] h-[6vh] text-sm font-light text-gray-900 p-2"
            >
              <option value="">Selecione</option>
              {data?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
            <div className="flex gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="price"
                  className="block text-sm/6 font-light text-gray-900"
                >
                  Preço:
                </label>

                <div className="flex items-center bg-zinc-200 pl-3 outline-gray-300 w-[30vw] md:w-[6vw]">
                  <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                    R$
                  </div>
                  <input
                    id="price"
                    type="text"
                    placeholder="0.00"
                    className="outline-none bg-zinc-200 w-full h-[6vh] text-sm font-light text-gray-900"
                    {...register("price", {
                      setValueAs: (value) =>
                        parseFloat(value.toString().replace(",", ".")),
                    })}
                  />
                </div>
                {errors.price && (
                  <span className="text-red-500">{errors.price.message}</span>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="stock"
                  className="block text-sm/6 font-light text-gray-900"
                >
                  Estoque:
                </label>
                <input
                  id="stock"
                  type="number"
                  placeholder="0"
                  className="outline-none bg-zinc-200 w-[30vw] md:w-[6vw] h-[6vh] text-sm text-center font-light text-gray-900 p-2"
                  {...register("stock", {
                    setValueAs: (value) => parseInt(value.toString(), 10),
                  })}
                />
                {errors.stock && (
                  <span className="text-red-500">{errors.stock.message}</span>
                )}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-2 mx-4 justify-between bg-slate-100 rounded-md mt-10 p-4 w-[80%] md:w-1/4">
            {errors.image && (
              <span className="text-red-500">{errors.image.message}</span>
            )}
            <legend className="text-sm font-medium text-slate-800">
              Adicionar imagem
            </legend>
            {image ? (
              <div className="mt-4 rounded-md ">
                <img
                  src={image}
                  alt="Pré-visualização"
                  className="h-[28vh] rounded-md"
                />
              </div>
            ) : (
              <FaFileImage className="w-24 h-24 text-gray-300 self-center" />
            )}

            <button
              type="button"
              className="flex items-center justify-center gap-2 border-2 border-[#27984c] text-[#27984c] hover:bg-[#27984c] hover:text-white font-medium p-2"
              onClick={() => inputFileRef.current?.click()} // Aciona o input file ao clicar
            >
              <GrUploadOption className="" /> Carregar
            </button>

            <input
              ref={inputFileRef}
              id="image"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </section>
        </section>
      </form>
      <div className="flex self-center w-[75%] md:w-full">
        <ProductTable />
      </div>
    </main>
  );
};
