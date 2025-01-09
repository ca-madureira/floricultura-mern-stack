// store/types.ts
import { UserState } from "./auth-slice";

// Definindo o tipo do estado global
export interface RootState {
  user: UserState;
}
