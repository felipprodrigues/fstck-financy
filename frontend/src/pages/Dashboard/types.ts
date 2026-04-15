import type { Category } from '@/shared/CategoryBadge'
import type { LucideIcon } from 'lucide-react'

export interface CategorySummary {
  category: Category
  name: string
  count: number
  total: number
}

export interface SummaryCard {
  title: string
  value: string
  icon: LucideIcon
  iconColor: string
}
