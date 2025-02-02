import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { tableCellClasses } from "@mui/material/TableCell";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { getAllProducts, deleteProduct } from "../services/products";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

interface Product {
  _id: string;
  title: string;
  description: string;
  category: { _id: string; name: string };
  price: number;
  stock: number;
  image: string;
}

interface ProductTableProps {
  handleEdit: (product: Product) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#27984c",
    color: theme.palette.common.white,
    fontWeight: "bold",
    padding: "12px 16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "12px 16px",
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

const ProductTable = ({ handleEdit }: ProductTableProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Você tem certeza que deseja excluir este produto?")) {
      mutate(id);
    }
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isError || !data) {
    return <p>Erro ao carregar os produtos.</p>;
  }

  return (
    <TableContainer component={Paper} className="w-full">
      <Table sx={{ minWidth: 120 }} aria-label="Tabela de Produtos">
        <TableHead sx={{ backgroundColor: "#27984c", color: "white" }}>
          <TableRow>
            <StyledTableCell align="left">Produto</StyledTableCell>
            <StyledTableCell align="left">Categoria</StyledTableCell>
            <StyledTableCell align="left">Preço</StyledTableCell>
            <StyledTableCell align="left">Estoque</StyledTableCell>
            <StyledTableCell align="left">Imagem</StyledTableCell>
            <StyledTableCell align="center">Ações</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product) => (
            <StyledTableRow key={product._id}>
              <StyledTableCell align="left">{product.title}</StyledTableCell>
              <StyledTableCell align="left">
                {product.category.name}
              </StyledTableCell>
              <StyledTableCell align="left">R$ {product.price}</StyledTableCell>
              <StyledTableCell align="left">{product.stock}</StyledTableCell>
              <StyledTableCell align="left">
                <img
                  src={product.image || "/default-image.png"}
                  alt={product.title}
                  className="w-16 h-18 object-cover"
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <MdDeleteForever className="w-5 h-5" />
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
