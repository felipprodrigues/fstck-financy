import type { Category } from '@/shared/CategoryBadge'

export interface Transaction {
  description: string
  date: string
  category: Category
  amount: number
}
