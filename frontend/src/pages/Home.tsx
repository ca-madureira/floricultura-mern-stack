import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/products";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart-slice";
import { Hero } from "../components/Hero";

export const Home = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
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
    <main className="h-full bg-gradient-to-r from-purple-400 to-rose-300 flex flex-col md:justify-center md:items-center gap-2 md:gap-4 flex-wrap">
      <Hero />
      <section className="flex flex-wrap gap-2 md:gap-6 md:w-[80%] pb-6">
        {data?.map((product: Product) => (
          <section
            key={product._id}
            className="bg-rose-100 shadow-lg border-1 w-[46%] md:w-[25vh] h-[42vh] p-4 flex flex-col gap-2 mt-2 rounded-tl-md ml-2 md:ml-0"
          >
            <div className="flex flex-col items-center h-[30vh] justify-between">
              <img src={product.image} className=" h-24" alt={product.title} />
              <p className="font-semibold text-sm text-center">
                {product.title}
              </p>
              <p className="font-bold text-sm text-slate-600">
                R$ {product.price.toFixed(2).toString().replace(".", ",")}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => handleQuantityChange(product._id, "decrement")}
                  className="bg-rose-300 rounded-md px-2 font-semibold"
                >
                  -
                </button>
                {quantities[product._id] || 1}
                <button
                  onClick={() => handleQuantityChange(product._id, "increment")}
                  className="bg-rose-300 rounded-md px-2"
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="bg-rose-500 p-2 text-white font-semibold rounded-md"
              onClick={() => addProductToCart(product)}
              disabled={loadingProductId === product._id}
            >
              {loadingProductId === product._id
                ? "Adicionando..."
                : "Adicionar"}
            </button>
          </section>
        ))}
      </section>
    </main>
  );
};
