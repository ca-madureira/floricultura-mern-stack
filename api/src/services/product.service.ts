import { Product } from "../models/product.model";
import cloudinary from "../utils/cloudinary";

interface ProductData {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

export const createProductService = async (data: ProductData) => {
  const { title, description, category, price, stock, image } = data;
  let cloudinaryResponse = null;

  if (image) {
    cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: "papelaria",
    });
  }

  const product = await Product.findOne({ title });
  if (product) {
    throw new Error("Já existe produto com esse nome");
  }

  const newProduct = await Product.create({
    title,
    description,
    category,
    price,
    stock,
    image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
  });

  return newProduct;
};

export const updateProductService = async (id: string, data: ProductData) => {
  const { title, description, category, price, stock, image } = data;

  let cloudinaryResponse = null;

  if (image) {
    // Se a imagem foi alterada, fazemos o upload da nova imagem no Cloudinary
    cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: "papelaria", // Altere a pasta conforme necessário
    });
  }

  // Atualiza o produto no banco de dados
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      title,
      description,
      category,
      price,
      stock,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : image, // Se não houver nova imagem, mantemos a antiga
    },
    { new: true } // Retorna o produto atualizado
  );

  return updatedProduct;
};

export const getAllProductsService = async () => {
  try {
    const products = await Product.find({}).populate("category", "name");

    if (!products || products.length === 0) {
      throw new Error("Não há produtos disponíveis");
    }

    return products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProductByIdService = async (data: string) => {
  try {
    const productDeleted = await Product.findByIdAndDelete(data);

    if (!productDeleted) {
      throw new Error("Produto não encontrada");
    }

    return productDeleted;
  } catch (error) {
    throw new Error(`Erro ao deletar produto: ${error}`);
  }
};
