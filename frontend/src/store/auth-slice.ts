import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: { name: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
}

const userLogin = localStorage.getItem("account");

const initialState: UserState = userLogin
  ? {
      user: JSON.parse(userLogin).user,
      token: JSON.parse(userLogin).token,
      isAuthenticated: true,
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
    setLogin: (
      state,
      action: PayloadAction<{
        user: { name: string; email: string };
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem(
        "account",
        JSON.stringify({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        })
      );
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("account");
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
