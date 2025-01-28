import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/types"; // Tipagem correta do RootState
import { removeItem, clearCart } from "../store/cart-slice";
import CartTable from "../components/CartTable";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services/orders"; // Importando o serviço de pedidos
import { useNavigate } from "react-router-dom"; // Usaremos o useNavigate para redirecionar após sucesso

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Para redirecionar após a finalização da compra
  const cart = useSelector((state: RootState) => state.cart);

  const {
    mutate: createOrderMutation,
    status,
    error,
  } = useMutation({
    mutationFn: (orderData: {
      items: { product: string; quantity: number }[];
      total: number;
    }) => {
      return createOrder(orderData); // Chama o serviço de criação de pedidos
    },
    onSuccess: () => {
      dispatch(clearCart()); // Limpa o carrinho após o pedido ser criado com sucesso
      navigate("/order-success"); // Redireciona para a página de sucesso
    },
    onError: (error) => {
      console.error(error); // Exibe um erro caso a criação do pedido falhe
    },
  });

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id)); // Chama o reducer para remover item do carrinho
  };

  const handleClearCart = () => {
    dispatch(clearCart()); // Limpa o carrinho
  };

  const handleFinalizeOrder = () => {
    const orderData = {
      items: cart.items.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      })),
      total: cart.total, // Usando 'total' ao invés de 'totalAmount'
    };

    createOrderMutation(orderData); // Chama a mutação para criar o pedido
  };

  const isLoading = status === "pending";

  return (
    <section className="flex flex-col md:flex-row justify-evenly">
      <div className="w-full md:w-1/2 flex flex-col items-end ">
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
          <span>R${cart.total}.00</span>
        </div>
        <button
          onClick={handleFinalizeOrder} // Chamando a função para finalizar o pedido
          disabled={isLoading} // Desativa o botão enquanto o pedido está sendo processado
          className="bg-[#27984c] text-white font-semibold rounded-md p-2"
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
