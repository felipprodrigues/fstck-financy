import { gqlRequest } from '@/lib/gql-client'
import { useAuthStore } from '@/store/auth.store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TransactionType, type Transaction } from './types'

import GET_TRANSACTIONS from './graphql/getTransactions.graphql?raw'
import CREATE_TRANSACTION from './graphql/createTransaction.graphql?raw'
import UPDATE_TRANSACTION from './graphql/updateTransaction.graphql?raw'
import DELETE_TRANSACTION from './graphql/deleteTransaction.graphql?raw'

export function useTransactions() {
  const { user } = useAuthStore()
  return useQuery({
    queryKey: ['transactions', user?.id],
    enabled: !!user,
    queryFn: () => gqlRequest<{ getAllTransactions: Transaction[] }>(GET_TRANSACTIONS),
    select: (data) => data.getAllTransactions,
  })
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  return useMutation({
    mutationFn: (data: {
      type: TransactionType
      description: string
      cashFlow: number
      categoryId: string
      date?: string
    }) => gqlRequest(CREATE_TRANSACTION, { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', user?.id] })
    },
  })
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  return useMutation({
    mutationFn: (data: {
      id: string
      type: TransactionType
      description: string
      cashFlow: number
      categoryId: string
      date?: string
    }) => gqlRequest(UPDATE_TRANSACTION, { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', user?.id] })
    },
  })
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  return useMutation({
    mutationFn: (transactionId: string) => gqlRequest(DELETE_TRANSACTION, { transactionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', user?.id] })
    },
  })
}
