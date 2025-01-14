// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth-slice";
import cartReducer from "./cart-slice";

// Tenta pegar o item do localStorage e faz o parsing se o item existir
const userInfoFromStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account") as string)
  : null;

// Definindo o estado inicial de forma correta
const initialState = {
  user: {
    name: userInfoFromStorage ? userInfoFromStorage.user.name : null,
    email: userInfoFromStorage ? userInfoFromStorage.user.email : null,
  },
  token: userInfoFromStorage ? userInfoFromStorage.token : null,
  isAuthenticated: !!userInfoFromStorage, // Verifica se o usuário está autenticado
};

const store = configureStore({
  reducer: {
    user: authReducer, // Repassando o reducer do usuário
    cart: cartReducer,
  },
  preloadedState: {
    user: initialState, // Colocando o estado de 'user' aqui
  },
});

export default store;
