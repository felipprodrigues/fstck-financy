// Deve ser possível criar uma transação
// Deve ser possível deletar uma transação
// Deve ser possível editar uma transação
// Deve ser possível listar todas as transações

import { prismaClient } from "../../prisma/prisma";
import { CreateTransactionInput } from "../dtos/input/transaction.input";

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
    if(!userId) throw new Error("Unauthorized")
    if(!data) throw new Error("Cant process request")

    const {
      cashFlow,
      categoryId,
      description,
      type
    } = data

    if(!cashFlow || !categoryId || !description || !type) throw new Error("Transaction data is incomplete. Please provide type, description, cashFlow and category")

    return prismaClient.transactions.create({
      data: {
        cashFlow,
        categoryId,
        description,
        type,
        userId
      }
    })

  }
}
