import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories, deleteCategory } from "../services/categories"; // A função que retorna as categorias

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

const CategoriesTable = () => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation<void, Error, string>({
    mutationFn: deleteCategory, // A função de deleção
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleDelete = (id: string) => {
    deletePostMutation.mutate(id); // Passando o id corretamente para a mutação
  };

  const { data, isLoading, isError } = useQuery<Category[], Error>({
    queryKey: ["categories"], // A chave única para a query
    queryFn: getAllCategories, // A função que obtém as categorias
  });

  // Lidar com o carregamento e erro de forma condicional
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar categorias!</div>;
  }

  // Aqui, tipamos o `useMutation` para esperar um `string` (id) e não retornar nada (void)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 520 }} aria-label="tabela personalizada">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>

            <StyledTableCell align="center">Ações</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Verificando se 'data' está disponível antes de mapear */}
          {data && data.length > 0 ? (
            data.map((category) => (
              <StyledTableRow key={category._id}>
                <StyledTableCell component="th" scope="row">
                  {category.name}
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
