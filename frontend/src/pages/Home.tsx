import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/products";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart-slice";

export const Home = () => {
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
    const quantity = quantities[_id] || 1;

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

    setTimeout(() => {
      setLoadingProductId(null);
    }, 500);
  };

  return (
    <main className="flex justify-center gap-2 md:gap-4 flex-wrap md:flex-nowrap ">
      {data?.map((product: Product) => (
        <section
          key={product._id}
          className="bg-white shadow-lg border-1 w-[45%] md:w-[40%] h-[42vh] p-4 flex flex-col gap-2 mt-2"
        >
          <div className="flex flex-col items-center h-[30vh] justify-between">
            <img
              src={product.image}
              className="w-16 h-20"
              alt={product.title}
            />
            <p className="font-semibold text-sm text-center">{product.title}</p>
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
            disabled={loadingProductId === product._id}
          >
            {loadingProductId === product._id ? "Adicionando..." : "Adicionar"}
          </button>
        </section>
      ))}
    </main>
  );
};
