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
}
