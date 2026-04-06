import { User } from "@prisma/client";
import { Arg, Mutation, Resolver } from "type-graphql";
import { CreateCategoryInput } from "../dtos/input/category.input";
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

    return this.categoryService.createCategory(data, user.id)
  }
}
