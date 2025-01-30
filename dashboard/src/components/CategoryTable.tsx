import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories, deleteCategory } from "../services/categories"; // Funções que fazem chamadas ao backend

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Tipagem para uma categoria
interface Category {
  _id: string; // Alterei para 'string' assumindo que você usa um identificador string no back-end
  name: string;
}

// Tipagem para as props do componente CategoryTable
interface CategoryTableProps {
  handleEdit: (category: { id: string; name: string }) => void;
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

const CategoriesTable: React.FC<CategoryTableProps> = ({ handleEdit }) => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation<void, Error, string>({
    mutationFn: deleteCategory, // Função de deleção
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleDelete = (id: string) => {
    deletePostMutation.mutate(id); // Passando o id corretamente para a mutação
  };

  const { data, isLoading, isError } = useQuery<Category[], Error>({
    queryKey: ["categories"], // A chave única para a query
    queryFn: getAllCategories, // Função que obtém as categorias
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar categorias!</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 120 }} aria-label="tabela personalizada">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="center">Ações</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((category) => (
              <StyledTableRow key={category._id}>
                <StyledTableCell component="th" scope="row">
                  {category.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    onClick={() =>
                      handleEdit({ id: category._id, name: category.name })
                    }
                    className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white font-semibold p-2"
                  >
                    Editar
                  </button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white font-semibold p-2"
                  >
                    Deletar
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={4} align="center">
                Nenhuma categoria encontrada
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesTable;
