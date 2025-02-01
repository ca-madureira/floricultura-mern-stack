import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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

const ProductTable = ({ handleEdit }: ProductTableProps) => {
  const queryClient = useQueryClient();

  const { data } = useQuery<Product[], Error>({
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

  return (
    <TableContainer component={Paper} className="w-full">
      <Table sx={{ minWidth: 650 }} aria-label="Tabela de Produtos">
        <TableHead>
          <TableRow>
            <TableCell align="left">Produto</TableCell>
            <TableCell align="left">Categoria</TableCell>
            <TableCell align="left">Preço</TableCell>
            <TableCell align="left">Estoque</TableCell>
            <TableCell align="left">Imagem</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((product) => (
            <TableRow key={product._id}>
              <TableCell align="left">{product.title}</TableCell>
              <TableCell align="left">{product.category.name}</TableCell>
              <TableCell align="left">R$ {product.price}</TableCell>
              <TableCell align="left">{product.stock}</TableCell>
              <TableCell align="left">
                <img src={product.image} className="w-16 h-16" />
              </TableCell>
              <TableCell align="center">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <MdDeleteForever />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
