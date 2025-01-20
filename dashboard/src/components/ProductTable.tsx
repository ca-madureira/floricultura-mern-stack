import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllProducts, deleteProduct } from "../services/products";

// Tipagem para um produto
interface Product {
  _id: string;
  title: string;
  description: string;
  category: { name: string };
  price: number;
  stock: number;
  image: string; // Assumindo que 'image' contém a URL completa da imagem
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

const ProductTable = () => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation<void, Error, string>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDelete = (id: string) => {
    deletePostMutation.mutate(id);
  };

  const { data, isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar produtos!</div>;
  }

  return (
    <TableContainer
      component={Paper}
      className="mt-12" // Remover o scroll e a altura máxima
    >
      <Table sx={{ minWidth: 850 }} aria-label="tabela personalizada">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="center">Descrição</StyledTableCell>
            <StyledTableCell align="center">Categoria</StyledTableCell>
            <StyledTableCell align="center">Preço</StyledTableCell>
            <StyledTableCell align="center">Estoque</StyledTableCell>
            <StyledTableCell align="center">Imagem</StyledTableCell>
            <StyledTableCell align="center">Ações</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((product) => (
              <StyledTableRow key={product._id}>
                <StyledTableCell component="th" scope="row">
                  {product.title}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {product.description}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {product.category.name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {product.price}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {product.stock}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100px", height: "auto" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    onClick={() => handleDelete(product._id)}
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

export default ProductTable;
