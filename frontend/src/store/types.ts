import { UserState } from "./auth-slice";
import { CartState } from "./cart-slice";

export interface RootState {
  user: UserState;
  cart: CartState;
}
