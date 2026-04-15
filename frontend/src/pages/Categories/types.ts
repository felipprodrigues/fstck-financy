import type { Category as CategorySymbol } from '@/shared/CategoryBadge'

export interface Category {
  id: string
  name: string
  description: string
  symbol: string
  createdAt: string
}

export interface CategoryFormValues {
  name: string
  description: string
  symbol: CategorySymbol | null
}

export interface CategoryInitialValues {
  title: string
  subtitle: string
  icon: CategorySymbol | null
}
