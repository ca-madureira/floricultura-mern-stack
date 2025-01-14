import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/types"; // A importação correta do tipo RootState
import {
  removeItem,
  updateQuantity,
  clearCart,
  CartItem,
} from "../store/cart-slice";

export const Cart = () => {
  const dispatch = useDispatch();

  // Acessando o estado do carrinho corretamente com o tipo RootState
  const cart = useSelector((state: RootState) => state.cart);

  console.log(cart);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {cart.items.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div>
          <ul>
            {cart.items.map((item: CartItem) => (
              <li key={item.id}>
                <div>
                  <h2>{item.name}</h2>
                  <p>Preço: R${item.price.toFixed(2)}</p>
                  <p>Quantidade: {item.quantity}</p>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    Aumentar quantidade
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    Diminuir quantidade
                  </button>
                  <button onClick={() => handleRemoveItem(item.id)}>
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <h3>Total: R${cart.total.toFixed(2)}</h3>
            <button onClick={handleClearCart}>Limpar carrinho</button>
          </div>
        </div>
      )}
    </div>
  );
};
