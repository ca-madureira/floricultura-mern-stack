import React, { useState } from "react";
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
import { MdExpandMore } from "react-icons/md";
import { CartItem, updateQuantity } from "../store/cart-slice";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F43F5E",
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

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

  const toggleRowExpansion = (productId: string) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [productId]: !prevExpandedRows[productId],
    }));
  };

  return (
    <TableContainer component={Paper} className="mt-12 overflow-hidden">
      <Table aria-label="tabela personalizada">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Produto</StyledTableCell>
            <StyledTableCell align="center">Descrição</StyledTableCell>
            <StyledTableCell align="center">Quantidade</StyledTableCell>
            {isMobile ? (
              <StyledTableCell align="center">Detalhes</StyledTableCell>
            ) : (
              <>
                <StyledTableCell align="center">Valor unitário</StyledTableCell>
                <StyledTableCell align="center">Subtotal</StyledTableCell>
                <StyledTableCell align="center">Ação</StyledTableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item: CartItem) => {
            const isExpanded = !!expandedRows[item.id];
            return (
              <React.Fragment key={item.id}>
                {" "}
                {/* Use React.Fragment */}
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    <img
                      src={item.image}
                      className="w-16 h-18 object-cover"
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
                        className="bg-rose-300 px-2 rounded-md mr-2"
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
                        className="bg-rose-300 px-2 rounded-md ml-2"
                      >
                        +
                      </button>
                    </div>
                  </StyledTableCell>
                  {isMobile ? (
                    <StyledTableCell align="center">
                      <button onClick={() => toggleRowExpansion(item.id)}>
                        <MdExpandMore
                          className={`w-6 h-6 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </StyledTableCell>
                  ) : (
                    <>
                      <StyledTableCell component="th" scope="row">
                        R$ {item.price.toFixed(2).toString().replace(".", ",")}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        R$
                        {(item.price * (quantities[item.id] || item.quantity))
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 font-semibold p-2"
                        >
                          <MdDeleteForever className="w-6 h-6" />
                        </button>
                      </StyledTableCell>
                    </>
                  )}
                </StyledTableRow>
                {isMobile && isExpanded && (
                  <StyledTableRow>
                    <StyledTableCell colSpan={4} align="center">
                      <Box>
                        <div className="flex justify-between">
                          <p className="font-semibold">Valor unitário:</p>
                          <p>
                            R${" "}
                            {item.price.toFixed(2).toString().replace(".", ",")}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-semibold">Subtotal:</p>
                          <p>
                            R${" "}
                            {(
                              item.price *
                              (quantities[item.id] || item.quantity)
                            )
                              .toFixed(2)
                              .toString()
                              .replace(".", ",")}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-semibold">Ação:</p>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-white bg-red-500 font-semibold p-1 rounded-md"
                          >
                            Deletar
                          </button>
                        </div>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
