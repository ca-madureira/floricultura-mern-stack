import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Tipagem do estado do usuário
export interface UserState {
  user: { name: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Criando o slice de autenticação
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
    },
  },
});

export const { setLogin } = authSlice.actions;

export default authSlice.reducer;
