import { User } from "@prisma/client";
import { Arg, Mutation, Resolver } from "type-graphql";
import { CreateTransactionInput } from "../dtos/input/transaction.input";
import { TransactionOutput } from "../dtos/output/transaction.output";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { TransactionService } from "../services/transaction.service";

@Resolver()
export class TransactionResolver {
  private transactionService = new TransactionService();

  @Mutation(() => TransactionOutput)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: User | null
  ) {
    if(!user) throw new Error("Unauthorized")
    if(!data) throw new Error("Failed to process data")

    return this.transactionService.createTransaction(data, user.id)
  }
}
