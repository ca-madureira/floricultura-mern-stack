// components/OrdersPage.tsx

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/orders"; // Função para pegar os pedidos
import { Order, CartItem } from "../types/orders"; // Importando as interfaces
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

export const OrderPage = () => {
  // Usando o react-query para buscar os pedidos
  const { data, isLoading, error } = useQuery<Order[], Error>({
    queryKey: ["orders"], // Chave da query
    queryFn: getOrders, // Função de busca dos dados
  });

  if (isLoading) {
    return <CircularProgress />; // Exibe um carregamento enquanto os pedidos estão sendo buscados
  }

  if (error instanceof Error) {
    return <div>Erro ao carregar os pedidos: {error.message}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Pedidos</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de pedidos">
          <TableHead>
            <TableRow>
              <TableCell>Pedido Número</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((order: Order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.status}</TableCell> {/* Status sem Chip */}
                <TableCell>
                  {/* Formatando o total com moeda */}
                  {order.totalAmount}
                </TableCell>
                <TableCell>
                  <ul style={{ padding: 0 }}>
                    {order.cartItems.map((item: CartItem, index: number) => (
                      <li key={index}>
                        {item.product.name} | Quantidade: {item.quantity}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
