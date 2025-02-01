import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories, deleteCategory } from "../services/categories"; // Funções que fazem chamadas ao backend
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Category {
  _id: string;
  name: string;
}

interface CategoryTableProps {
  handleEdit: (category: { id: string; name: string }) => void;
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

const CategoriesTable: React.FC<CategoryTableProps> = ({ handleEdit }) => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation<void, Error, string>({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleDelete = (id: string) => {
    deletePostMutation.mutate(id);
  };

  const { data, isLoading, isError } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar categorias!</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="tabela personalizada">
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
                <StyledTableCell align="center">
                  <button
                    onClick={() =>
                      handleEdit({ id: category._id, name: category.name })
                    }
                    className="border-2 border-blue-500 bg-blue-500 hover:bg-white text-white hover:text-blue-500 font-semibold p-2 mr-2" // Adicionando margem à direita
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-white hover:text-red-500 border-2 border-red-500 bg-red-500 hover:bg-white font-semibold p-2"
                  >
                    <MdDeleteForever />
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={3} align="center">
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
