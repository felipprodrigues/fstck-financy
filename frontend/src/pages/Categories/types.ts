import type { Category } from '@/shared/CategoryBadge'

export interface CategoryItem {
  category: Category
  title: string
  subtitle: string
  itemCount: number
}
