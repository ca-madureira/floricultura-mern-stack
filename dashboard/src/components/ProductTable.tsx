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
    backgroundColor: theme.palette.common.black,
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="tabela personalizada">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="right">Descrição</StyledTableCell>
            <StyledTableCell align="right">Categoria</StyledTableCell>
            <StyledTableCell align="right">Preço</StyledTableCell>
            <StyledTableCell align="right">Estoque</StyledTableCell>
            <StyledTableCell align="right">Imagem</StyledTableCell>
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
                  {/* Exibindo a imagem usando a URL do Cloudinary */}
                  <img
                    src={product.image} // URL da imagem armazenada no Cloudinary
                    alt={product.title}
                    style={{ width: "100px", height: "auto" }} // Estilizando a imagem
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button onClick={() => handleDelete(product._id)}>
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
