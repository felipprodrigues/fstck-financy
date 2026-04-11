import { User } from "@prisma/client";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";
import { CategoryOutput } from "../dtos/output/category.output";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { CategoryService } from "../services/category.service";

@Resolver()
export class CategoryResolver {
  private categoryService = new CategoryService();

  @Mutation(() => CategoryOutput)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: User | null
  ) {
    // if(!user) throw new Error("Unauthorized")
    if(!data) throw new Error("Failed to process data")
    if(!user) throw new Error("Unauthorized")

    return this.categoryService.createCategory(data, user.id)
  }

  @Mutation(() => CategoryOutput)
  async updateCategory(
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @GqlUser() user: User | null
  ) {
    if(!data) throw new Error("Failed to process data")
    if(!user) throw new Error("Unauthorized")
    return this.categoryService.updateCategory(data, user.id)
  }

  @Mutation(() => String)
  async deleteCategory(
    @Arg('categoryId', () => String) categoryId: string,
    @GqlUser() user: User | null
  ) {
    if(!user) throw new Error("Unauthorized")
    if(!categoryId) throw new Error("Failed to process data")

    return this.categoryService.deleteCategory(categoryId, user.id)
  }

  @Query(() => [CategoryOutput])
  async getAllCategories(
    @GqlUser() user: User | null
  ) {
    if(!user) throw new Error("Unauthorized")

    return this.categoryService.findAllCategories(user.id)
  }

  @Query(() => CategoryOutput)
  async getCategoryById(
    @Arg('categoryId', () => String) categoryId: string,
    @GqlUser() user: User | null
  ) {
    if(!user) throw new Error("Unauthorized")
    if(!categoryId) throw new Error("Failed to process data")

    return this.categoryService.findCategoryById(categoryId, user.id)
  }

}

