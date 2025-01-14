import { v2 as cloudinary } from 'cloudinary' // Atualizando para importar v2 corretamente

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.API_KEY as string,
  api_secret: process.env.API_SECRET as string,
})

const uploadImageOnCloudinary = (file: Express.Multer.File) => {
  return new Promise<string>((resolve, reject) => {
    console.log('File received:', file) // Verifique se o arquivo chegou corretamente

    if (!file) {
      reject('Nenhum arquivo recebido')
      return
    }

    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('Erro ao fazer upload:', error) // Log do erro
            reject('Erro ao fazer upload da imagem')
            return
          }
          console.log('Upload bem-sucedido:', result) // Verifique o resultado
          resolve(result?.secure_url || '') // Retorna a URL segura da imagem
        },
      )
      .end(file.buffer) // Envia o arquivo em buffer
  })
}

export default uploadImageOnCloudinary
