import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";

import { CartItem, updateQuantity } from "../store/cart-slice";

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

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (
    productId: string,
    quantity: number,
    operation: "increment" | "decrement"
  ) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || quantity;
      const newQuantity =
        operation === "increment"
          ? currentQuantity + 1
          : Math.max(1, currentQuantity - 1);

      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));

      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  return (
    <TableContainer component={Paper} className="mt-12">
      <Table aria-label="tabela personalizada">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Produto</StyledTableCell>
            <StyledTableCell align="center">Descrição</StyledTableCell>
            <StyledTableCell align="center">Quantidade</StyledTableCell>
            <StyledTableCell align="center">Valor unitário</StyledTableCell>
            <StyledTableCell align="center">Subtotal</StyledTableCell>
            <StyledTableCell align="center">Ação</StyledTableCell>{" "}
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
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 font-semibold p-2"
                  >
                    <MdDeleteForever className="w-6 h-6" />
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
