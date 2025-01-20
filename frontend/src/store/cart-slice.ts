import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

// Carregar o estado do carrinho do localStorage, caso exista
const storedCart = localStorage.getItem("cart");
const initialState: CartState = storedCart
  ? {
      items: JSON.parse(storedCart),
      total: 0,
    }
  : {
      items: [],
      total: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      // Atualizar o total
      state.total = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // Salvar o estado no localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const idItem = action.payload;
      state.items = state.items.filter((item) => item.id !== idItem);
      state.total = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // Salvar o estado no localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }

      state.total = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // Salvar o estado no localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;

      // Limpar o localStorage
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
