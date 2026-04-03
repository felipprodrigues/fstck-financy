import type { Category } from '@/shared/CategoryBadge'
import type { LucideIcon } from 'lucide-react'

export type { Transaction } from '@/pages/Transactions/types'

export interface CategorySummary {
  category: Category
  count: number
  total: string
}

export interface SummaryCard {
  title: string
  value: string
  icon: LucideIcon
  iconColor: string
}
