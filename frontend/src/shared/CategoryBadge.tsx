import { Badge } from '@/components/ui/badge'
import type { LucideIcon } from 'lucide-react'
import {
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  HeartPulse,
  PawPrint,
  PiggyBank,
  ShoppingCart,
  Tag,
  Ticket,
  ToolCase,
  Utensils,
} from 'lucide-react'

export const CategorySymbol = {
  FOOD: 'food',
  ENTERTAINMENT: 'entertainment',
  INVESTMENT: 'investment',
  GROCERY: 'grocery',
  SALARY: 'salary',
  HEALTH: 'health',
  TRANSPORT: 'transport',
  UTILITIES: 'utilities',
  GYM: 'gym',
  PET: 'pet',
} as const

export type Category = (typeof CategorySymbol)[keyof typeof CategorySymbol]

export const categoryConfig: Record<Category, { label: string; className: string; icon: LucideIcon }> = {
  salary: {
    label: 'Salário',
    className: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: BriefcaseBusiness,
  },
  health: { label: 'Saúde', className: 'bg-red-100 text-red-700 border-red-200', icon: HeartPulse },
  transport: {
    label: 'Transporte',
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    icon: CarFront,
  },
  utilities: {
    label: 'Utilidades',
    className: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: ToolCase,
  },
  grocery: {
    label: 'Mercado',
    className: 'bg-green-100 text-green-700 border-green-200',
    icon: ShoppingCart,
  },
  investment: {
    label: 'Investimento',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: PiggyBank,
  },
  entertainment: {
    label: 'Entretenimento',
    className: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: Ticket,
  },
  food: {
    label: 'Alimentação',
    className: 'bg-orange-100 text-orange-700 border-orange-200',
    icon: Utensils,
  },
  gym: {
    label: 'Academia',
    className: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    icon: Dumbbell,
  },
  pet: { label: 'Pet', className: 'bg-pink-100 text-pink-700 border-pink-200', icon: PawPrint },
}

const fallbackConfig = {
  label: 'Outro',
  className: 'bg-gray-100 text-gray-600 border-gray-200',
  icon: Tag,
}

interface CategoryBadgeProps {
  category: string
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = categoryConfig[category as Category] ?? fallbackConfig
  return (
    <Badge variant="outline" className={`px-3 py-1 ${config.className}`}>
      {config.label}
    </Badge>
  )
}

export function CategoryIconBadge({ category }: CategoryBadgeProps) {
  const { icon: Icon, className } = categoryConfig[category as Category] ?? fallbackConfig
  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${className}`}
    >
      <Icon className="h-5 w-5" />
    </span>
  )
}
