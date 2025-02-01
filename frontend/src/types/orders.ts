export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  status: "pendente" | "pago";
  totalAmount: number;
  cartItems: CartItem[];
}
