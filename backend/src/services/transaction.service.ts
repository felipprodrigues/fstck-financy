// Deve ser possível criar uma transação
// Deve ser possível deletar uma transação
// Deve ser possível editar uma transação
// Deve ser possível listar todas as transações

import { prismaClient } from "../../prisma/prisma";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
    if(!userId) throw new Error("Unauthorized")
    if(!data) throw new Error("Cant process request")

    const {
      cashFlow,
      categoryId,
      description,
      type,
      date
    } = data

    if(!cashFlow || !categoryId || !description || !type) throw new Error("Transaction data is incomplete. Please provide type, description, cashFlow and category")

    return prismaClient.transactions.create({
      data: {
        cashFlow,
        categoryId,
        description,
        type,
        userId,
        ...(date ? { createdAt: new Date(date) } : {})
      }
    })
  }

  async updateTransaction(data: UpdateTransactionInput, userId: string) {
    if(!userId) throw new Error("Unauthorized")
    if(!data) throw new Error("Cant process request")

    const {
      cashFlow,
      id,
      description,
      type,
      categoryId,
      date
    } = data

    if(!cashFlow || !id || !description || !type || !categoryId) throw new Error("Transaction data is incomplete. Please provide type, description, cashFlow and category")

    const transaction = await prismaClient.transactions.findUnique({ where: { id } })
    if(!transaction || transaction.userId !== userId) throw new Error("Transaction not found")

    return prismaClient.transactions.update({
      where: { id },
      data: {
        cashFlow,
        description,
        type,
        categoryId,
        ...(date ? { createdAt: new Date(date) } : {})
      }
    })
  }

  async deleteTransaction(transactionId: string, userId: string) {
    const transaction = await prismaClient.transactions.findUnique({ where: { id: transactionId } })
    if(!transaction || transaction.userId !== userId) throw new Error("Transaction not found")

    await prismaClient.transactions.delete({ where: { id: transactionId } })

    return true
  }

  async findAllTransactions(userId: string) {
    return prismaClient.transactions.findMany({ where: { userId } })
  }

  async findTransactionById(categoryId: string, userId: string) {
    if(!categoryId) throw new Error("Transaction not found")
    if(!userId) throw new Error("Unauthenticated")

    return prismaClient.transactions.findUnique({
      where: {
        id: categoryId
      }
    })
  }
}
