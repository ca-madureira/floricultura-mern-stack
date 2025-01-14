import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/products";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart-slice";
import { useSelector } from "react-redux";
import { RootState } from "../store/types";

export const Home = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const [cont, setCont] = useState(1);
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

  const addProductToCart = (product: Product) => {
    const { _id, title, price, image } = product;
    // Corrigir para passar id em vez de _id
    dispatch(addToCart({ id: _id, name: title, price, image, quantity: cont }));
  };

  console.log(cart);

  return (
    <main>
      {data?.map((product: Product) => (
        <div key={product._id}>
          <div>
            <p>{product.title}</p>
            <p>{product.price}</p>
          </div>
          <div>
            Quantidade:
            <button
              onClick={() =>
                setCont((prevCont) => (prevCont > 1 ? prevCont - 1 : prevCont))
              }
            >
              -
            </button>
            {cont}
            <button onClick={() => setCont((prevCont) => prevCont + 1)}>
              +
            </button>
          </div>
          <button
            className="bg-purple-500"
            onClick={() => addProductToCart(product)} // Correção: Passar função de callback
          >
            Adicionar ao carrinho
          </button>
        </div>
      ))}
    </main>
  );
};
