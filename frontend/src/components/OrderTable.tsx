import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllOrder } from "../services/orders"; // Seu serviço que faz a requisição à API

// Tipagem para um produto e item no carrinho
interface CartItem {
  product: {
    _id: string;
    title: string; // Supondo que você tenha a propriedade "name" no produto
    price: number; // E também a propriedade "price"
  };
  quantidade: number; // Quantidade do produto
}

interface Order {
  orderNumber: string;
  totalAmount: number;
  cartItems: CartItem[]; // Agora é um array de objetos com produto e quantidade
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
  // Obtendo o ID do usuário do localStorage
  const account = JSON.parse(localStorage.getItem("account") || "{}");
  const userId = account.user?._id || ""; // Acessando o _id dentro de user, se existir

  // Usando useQuery para obter os pedidos do usuário
  const { data, isLoading, isError } = useQuery<Order[], Error>({
    queryKey: ["orders", userId], // Definindo a chave de cache única para esse usuário
    queryFn: () => getAllOrder(userId), // Passando o userId para a função de API
    enabled: !!userId, // Apenas ativa a query se userId existir
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os pedidos!</div>;
  }

  return (
    <TableContainer component={Paper} className="mt-6">
      <Table sx={{ minWidth: 750 }} aria-label="tabela personalizada">
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
                <StyledTableCell component="th" scope="row">
                  {order.totalAmount}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {order.status}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <div>
                    {/* Exibindo os itens do carrinho */}
                    {order.cartItems.map((item, index) => (
                      <div key={index} style={{ marginBottom: "8px" }}>
                        <strong>{item.product.title}</strong> - Quantidade:{" "}
                        {item.quantidade} - Preço: {item.product.price}
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
