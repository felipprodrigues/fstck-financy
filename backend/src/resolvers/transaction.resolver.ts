import { User } from "@prisma/client";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
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

  @Mutation(() => TransactionOutput)
  async updateTransaction(
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @GqlUser() user: User | null
  ) {
    if(!user) throw new Error("Unauthorized")
    if(!data) throw new Error("Failed to process data")

    return this.transactionService.updateTransaction(data, user.id)
  }

  @Mutation(() => String)
  async deleteTransaction(
    @Arg('transactionId', () => String) transactionId: string,
    @GqlUser() user: User | null
  ) {
    if(!user) throw new Error("Unauthorized")
    if(!transactionId) throw new Error("Failed to process data")

    return this.transactionService.deleteTransaction(transactionId, user.id)
  }

  @Query(() => [TransactionOutput])
  async getAllTransactions(
    @GqlUser() user: User | null
  ) {
    if(!user) throw new Error("Unauthorized")

    return this.transactionService.findAllTransactions(user.id)
  }

  @Query(() => TransactionOutput)
  async getTransactionById(
    @Arg('transactionId', () => String) transactionId: string,
    @GqlUser() user: User | null
  ) {
    if(!user) throw new Error("Unauthorized")
    if(!transactionId) throw new Error("Failed to process data")

    return this.transactionService.findTransactionById(transactionId, user.id)
  }

}
