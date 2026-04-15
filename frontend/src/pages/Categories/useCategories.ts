import { gqlRequest } from '@/lib/gql-client'
import { useAuthStore } from '@/store/auth.store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Category } from './types'

import GET_CATEGORIES from './graphql/getCategories.graphql?raw'
import CREATE_CATEGORY from './graphql/createCategory.graphql?raw'
import UPDATE_CATEGORY from './graphql/updateCategory.graphql?raw'
import DELETE_CATEGORY from './graphql/deleteCategory.graphql?raw'

export function useCategories() {
  const { user } = useAuthStore()
  return useQuery({
    queryKey: ['categories', user?.id],
    enabled: !!user,
    queryFn: () => gqlRequest<{ getAllCategories: Category[] }>(GET_CATEGORIES),
    select: (data) => data.getAllCategories,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  return useMutation({
    mutationFn: (data: { name: string; description: string; symbol: string }) =>
      gqlRequest(CREATE_CATEGORY, { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', user?.id] })
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  return useMutation({
    mutationFn: (data: { id: string; name: string; description: string; symbol: string }) =>
      gqlRequest(UPDATE_CATEGORY, { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', user?.id] })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  return useMutation({
    mutationFn: (categoryId: string) => gqlRequest(DELETE_CATEGORY, { categoryId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', user?.id] })
    },
  })
}
