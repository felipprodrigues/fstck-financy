import { CircleArrowDown, CircleArrowUp, Wallet } from 'lucide-react'
import type { CategorySummary, SummaryCard } from './types'

export { transactions } from '@/pages/Transactions/MockData'

export const summaryCards: SummaryCard[] = [
  { title: 'Saldo total',      value: 'R$ 12.450,00', icon: Wallet,          iconColor: 'text-purple-base' },
  { title: 'Receita do mês',   value: 'R$ 8.200,00',  icon: CircleArrowUp,   iconColor: 'text-brand-base'  },
  { title: 'Despesas do mês',  value: 'R$ 3.750,00',  icon: CircleArrowDown, iconColor: 'text-red-base'    },
]

export const categories: CategorySummary[] = [
  { category: 'grocery',       count: 3, total: 'R$ 430,50'   },
  { category: 'gym',           count: 1, total: 'R$ 99,90'    },
  { category: 'entertainment', count: 2, total: 'R$ 55,90'    },
  { category: 'health',        count: 2, total: 'R$ 87,30'    },
  { category: 'salary',        count: 1, total: 'R$ 8.200,00' },
]
