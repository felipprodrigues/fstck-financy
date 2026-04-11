import { prismaClient } from "../../prisma/prisma";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    if(!userId) throw new Error("Unauthorized")
    if(!data) throw new Error("Cant process request")

    const {
      name,
      symbol,
      description
    } = data

    if(!name || !symbol) throw new Error("Category data is incomplete. Please provide name and symbol")

    return prismaClient.categories.create({
      data: {
        name,
        symbol,
        description,
        userId
      }
    })
  }

  async updateCategory(data: UpdateCategoryInput, userId: string) {
    if(!userId) throw new Error("Unauthorized")
    if(!data) throw new Error("Cant process request")

    const { id, name, symbol, description } = data

    if(!name || !symbol) throw new Error("Category data is incomplete. Please provide name and symbol")

    const category = await prismaClient.categories.findUnique({ where: { id } })
    if(!category || category.userId !== userId) throw new Error("Category not found")

    return prismaClient.categories.update({
      where: { id },
      data: { name, symbol, description }
    })
  }

  async deleteCategory(categoryId: string, userId: string) {
    const category = await prismaClient.categories.findUnique({ where: { id: categoryId } })
    if(!category || category.userId !== userId) throw new Error("Category not found")

    await prismaClient.categories.delete({ where: { id: categoryId } })

    return true
  }

  async findAllCategories(userId: string) {
    return prismaClient.categories.findMany({ where: { userId } })
  }

  async findCategoryById(categoryId: string, userId: string) {
    if(!categoryId) throw new Error("Category not found")
    if(!userId) throw new Error("Category not found")

    return prismaClient.categories.findUnique({
      where: {
        id: categoryId
      }
    })
  }
}
