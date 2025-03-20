import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/types";
import { removeItem, clearCart } from "../store/cart-slice";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import CartTable from "../components/CartTable";
import { createOrder } from "../services/orders";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);

  const {
    mutate: createOrderMutation,
    status,
    error,
  } = useMutation({
    mutationFn: (orderData: {
      items: { product: string; quantity: number; price: number }[];
      total: number;
      userId: string;
    }) => {
      return createOrder(orderData);
    },
    onSuccess: () => {
      dispatch(clearCart());
      navigate("/order-success");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleFinalizeOrder = () => {
    const account = JSON.parse(localStorage.getItem("account") || "{}");
    const userId = account.user?._id || "";

    const orderData = {
      items: cart.items.map((item) => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      total: cart.total,
      userId: userId,
    };

    createOrderMutation(orderData);
  };

  const isLoading = status === "pending";

  return (
    <section className="flex flex-col min-h-screen md:flex-row justify-evenly mb-4">
      <div className="w-full md:w-[60%] flex flex-col items-end">
        <div className="flex w-full justify-between">
          <Link
            to="/"
            className="font-light text-slate-600 underline hover:text-slate-400 self-end"
          >
            Retornar às compras
          </Link>
          <button
            className="flex mt-12 font-light text-slate-600 underline hover:text-slate-400"
            onClick={handleClearCart}
          >
            Esvaziar carrinho
          </button>
        </div>

        <CartTable items={cart.items} handleRemoveItem={handleRemoveItem} />
      </div>
      <div className="flex flex-col justify-center bg-white p-2 w-full md:w-[20%] h-[16vh] rounded-md mt-12 border shadow-lg">
        <h3 className="text-slate-800 font-bold">Resumo do Pedido</h3>
        <div className="flex justify-between">
          <span>Total </span>
          <span>R${cart.total.toFixed(2).toString().replace(".", ",")}</span>
        </div>
        <button
          onClick={handleFinalizeOrder}
          disabled={isLoading}
          className="bg-rose-500 text-white hover:bg-rose-400 font-semibold rounded-md p-2"
        >
          {isLoading ? "Finalizando..." : "Finalizar compra"}
        </button>
        {error && (
          <p className="text-red-500 mt-2">
            Erro ao criar o pedido. Tente novamente.
          </p>
        )}
      </div>
    </section>
  );
};
