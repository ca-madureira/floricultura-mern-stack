// store/types.ts
import { UserState } from "./auth-slice";
import { CartState } from "./cart-slice";

// Definindo o tipo do estado global
export interface RootState {
  user: UserState;
  cart: CartState;
}
