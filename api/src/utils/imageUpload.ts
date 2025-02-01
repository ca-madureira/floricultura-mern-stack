import { v2 as cloudinary } from "cloudinary";

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.API_KEY as string,
  api_secret: process.env.API_SECRET as string,
});

const uploadImageOnCloudinary = (file: Express.Multer.File) => {
  return new Promise<string>((resolve, reject) => {
    if (!file) {
      reject("Nenhum arquivo recebido");
      return;
    }

    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject("Erro ao fazer upload da imagem");
            return;
          }

          resolve(result?.secure_url || "");
        }
      )
      .end(file.buffer);
  });
};

export default uploadImageOnCloudinary;
