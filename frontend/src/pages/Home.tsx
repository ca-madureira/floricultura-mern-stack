import { useQuery } from "@tanstack/react-query"; // Para gerenciar dados assíncronos e cache
import { getAllProducts } from "../services/products"; // Função para buscar os produtos
import { useState } from "react"; // Hook do React para gerenciar estado
import { useDispatch } from "react-redux"; // Hook para despachar ações para o Redux
import { addToCart } from "../store/cart-slice"; // Ação para adicionar produtos ao carrinho
// import { useSelector } from "react-redux"; // Hook para acessar o estado do Redux
// import { RootState } from "../store/types"; // Tipagem do estado global do Redux

export const Home = () => {
  // const cart = useSelector((state: RootState) => state.cart);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null); // Estado de carregamento
  const dispatch = useDispatch();

  interface Product {
    _id: string;
    title: string;
    description: string;
    category: { name: string };
    price: number;
    stock: number;
    image: string;
  }

  const { data, isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar produtos!</div>;
  }

  const handleQuantityChange = (
    productId: string,
    operation: "increment" | "decrement"
  ) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1;
      const newQuantity =
        operation === "increment"
          ? currentQuantity + 1
          : Math.max(1, currentQuantity - 1);
      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  const addProductToCart = (product: Product) => {
    const { _id, title, description, price, image } = product;
    const quantity = quantities[_id] || 1; // Se não houver quantidade definida, assume 1

    // Marcar o produto como sendo adicionado
    setLoadingProductId(_id);

    dispatch(
      addToCart({
        id: _id,
        name: title,
        description: description,
        price,
        image,
        quantity,
      })
    );

    // Após adicionar o produto ao carrinho, resetar o estado de carregamento
    setTimeout(() => {
      setLoadingProductId(null); // Reseta o estado após um tempo, simulando a "finalização" do processo
    }, 500); // Ajuste o tempo conforme necessário
  };

  return (
    <main className="flex flex-wrap gap-6">
      {data?.map((product: Product) => (
        <section
          key={product._id}
          className="bg-white shadow-sm border-1 w-fit p-4 flex flex-col gap-2 mt-2"
        >
          <div className="flex flex-col items-center">
            <img
              src={product.image}
              className="w-32 h-28"
              alt={product.title}
            />
            <p className="font-semibold">{product.title}</p>
            <p className="font-bold text-sm text-slate-600">
              R${product.price},00
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => handleQuantityChange(product._id, "decrement")}
                className="bg-teal-400 rounded-md px-2 font-semibold"
              >
                -
              </button>
              {quantities[product._id] || 1}
              <button
                onClick={() => handleQuantityChange(product._id, "increment")}
                className="bg-teal-400 rounded-md px-2"
              >
                +
              </button>
            </div>
          </div>

          <button
            className="bg-[#27984c] p-2 text-white font-semibold"
            onClick={() => addProductToCart(product)}
            disabled={loadingProductId === product._id} // Desabilita o botão enquanto o produto está sendo adicionado
          >
            {loadingProductId === product._id ? "Adicionando..." : "Adicionar"}
          </button>
        </section>
      ))}
    </main>
  );
};
