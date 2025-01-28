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
const storedTotal = localStorage.getItem("total");

// Garantir que storedCart e storedTotal não sejam null antes de usá-los
const initialState: CartState =
  storedCart && storedTotal
    ? {
        items: JSON.parse(storedCart),
        total: JSON.parse(storedTotal),
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
      localStorage.setItem("total", JSON.stringify(state.total));
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
      localStorage.setItem("total", JSON.stringify(state.total));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      console.log(
        "EU SOU O VALOR DO REDUX itemToUpdate.quantity",
        itemToUpdate?.quantity
      );
      if (itemToUpdate) {
        console.log("VOU VIRAR O NOVO VALOR AGORA quantity", quantity);
        itemToUpdate.quantity = quantity;
      }
      console.log(
        "JA VIREI O NOVO VALOR itemToUpdate.quantity",
        itemToUpdate?.quantity
      );
      // if (itemToUpdate) {
      //   if (operation === "increment") {
      //     itemToUpdate.quantity += quantity;
      //   } else {
      //     itemToUpdate.quantity -= quantity;
      //   }
      // }

      console.log("DEPOIS DA MUDANCA", itemToUpdate?.quantity);
      console.log("VALOR QUE ACABOU DE CHEGAR", quantity);

      state.total = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      console.log(state.items);
      // Salvar o estado no localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("total", JSON.stringify(state.total));
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;

      // Limpar o localStorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
    },
  },
});

export const { addToCart, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
