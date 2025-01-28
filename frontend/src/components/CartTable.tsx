import { useState } from "react"; // Adicionando a importação do useState
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CartItem, updateQuantity } from "../store/cart-slice";
import { useDispatch } from "react-redux";

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

const CartTable = ({
  items,
  handleRemoveItem,
}: {
  items: CartItem[];
  handleRemoveItem: (id: string) => void;
}) => {
  const dispatch = useDispatch();

  // Corrigido o tipo de quantities para um objeto onde cada chave é um id de produto e o valor é o número de unidades
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Correção no acesso ao quantity, usando a função callback de setQuantities
  const handleQuantityChange = (
    productId: string,
    quantity: number,
    operation: "increment" | "decrement"
  ) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || quantity; // A quantidade inicial será 1
      const newQuantity =
        operation === "increment"
          ? currentQuantity + 1
          : Math.max(1, currentQuantity - 1);

      // Atualiza a quantidade no estado e também despacha a ação
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));

      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  return (
    <TableContainer component={Paper} className="mt-12">
      <Table sx={{ minWidth: 400 }} aria-label="tabela personalizada">
        <TableHead>
          <TableRow>
            <StyledTableCell>Produto</StyledTableCell>
            <StyledTableCell align="center">Descrição</StyledTableCell>
            <StyledTableCell align="center">Quantidade</StyledTableCell>
            <StyledTableCell align="center">Valor unitário</StyledTableCell>
            <StyledTableCell align="center">Subtotal</StyledTableCell>
            <StyledTableCell align="center">Ação</StyledTableCell>{" "}
            {/* Coluna de Ação */}
          </TableRow>
        </TableHead>
        <TableBody>
          {items && items.length > 0 ? (
            items.map((item: CartItem) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  <img
                    src={item.image}
                    className="w-32"
                    alt={item.description}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.description}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <div className="flex">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.id,
                          item.quantity,
                          "decrement"
                        )
                      }
                      className="bg-teal-400 px-2 rounded-md mr-2"
                    >
                      -
                    </button>
                    {quantities[item.id] || item.quantity}{" "}
                    {/* Usando o estado quantities */}
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.id,
                          item.quantity,
                          "increment"
                        )
                      }
                      className="bg-teal-400 px-2 rounded-md ml-2"
                    >
                      +
                    </button>
                  </div>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.price}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  R$
                  {(
                    item.price * (quantities[item.id] || item.quantity)
                  ).toFixed(2)}{" "}
                  {/* Considerando a quantidade atual */}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={() => handleRemoveItem(item.id)} // Função de remoção do item
                    className="text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white font-semibold p-2"
                  >
                    Deletar
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={7} align="center">
                Nenhum produto encontrado
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
