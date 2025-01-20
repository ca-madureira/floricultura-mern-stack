import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Tipagem do estado do usuário
export interface UserState {
  user: { name: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Tenta pegar os dados de login armazenados no localStorage
const userLogin = localStorage.getItem("account");

// A partir dos dados de login, define o estado inicial
const initialState: UserState = userLogin
  ? {
      user: JSON.parse(userLogin).user, // Acessa o objeto do usuário dentro do localStorage
      token: JSON.parse(userLogin).token, // Acessa o token dentro do localStorage
      isAuthenticated: true, // Marca como autenticado se houver dados no localStorage
    }
  : {
      user: null,
      token: null,
      isAuthenticated: false,
    };

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Ação de login
    setLogin: (
      state,
      action: PayloadAction<{
        user: { name: string; email: string };
        token: string;
      }>
    ) => {
      state.user = action.payload.user; // Define o usuário
      state.token = action.payload.token; // Define o token
      state.isAuthenticated = true; // Marca o usuário como autenticado

      // Salva os dados no localStorage
      localStorage.setItem(
        "account",
        JSON.stringify({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated, // Salva o isAuthenticated
        })
      );
    },

    // Ação de logout
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
