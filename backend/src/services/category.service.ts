import { Category } from '../models/category.model'

interface CategoryData {
  name: string
}

export const createCategoryService = async (data: CategoryData) => {
  try {
    const { name } = data

    const existingCategory = await Category.findOne({ name })

    if (existingCategory) {
      throw new Error('categoria ja criada')
    }

    const category = await Category.create({
      name,
    })

    return category
  } catch (error) {
    throw new Error(`Erro ao criar categoria: ${error}`)
    console.log(error)
  }
}
