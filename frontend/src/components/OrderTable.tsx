import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { getAllOrder } from "../services/orders";

interface CartItem {
  product: {
    _id: string;
    title: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  orderNumber: string;
  totalAmount: number;
  cartItems: CartItem[];
  status: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#27984c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const OrderTable = () => {
  const account = JSON.parse(localStorage.getItem("account") || "{}");
  const userId = account.user?._id || "";

  const { data, isLoading, isError } = useQuery<Order[], Error>({
    queryKey: ["orders", userId],
    queryFn: () => getAllOrder(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os pedidos!</div>;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 400, width: "100%" }}
      className="mt-6"
    >
      <Table aria-label="tabela personalizada">
        <TableHead>
          <TableRow>
            <StyledTableCell>Numero do Pedido</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Itens no Carrinho</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((order) => (
              <StyledTableRow key={order.orderNumber}>
                <StyledTableCell component="th" scope="row">
                  {order.orderNumber}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {order.totalAmount}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  <div className="rounded-md text-amber-600 text-sm font-semibold">
                    {order.status}
                  </div>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  <div>
                    {order.cartItems.map((item, index) => (
                      <div key={index} style={{ marginBottom: "8px" }}>
                        {item.product?.title}-{item.quantity}
                      </div>
                    ))}
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={4} align="center">
                Nenhum produto encontrado
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
