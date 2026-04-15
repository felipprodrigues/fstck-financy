// ─── Backend values ───────────────────────────────────────────────────────────

export const TransactionType = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
} as const
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]

// ─── Form / UI values ─────────────────────────────────────────────────────────

export const TransactionFormType = {
  RECEITA: 'receita',
  DESPESA: 'despesa',
} as const
export type TransactionFormType = (typeof TransactionFormType)[keyof typeof TransactionFormType]

export const TransactionFilterTipo = {
  TODOS: 'todos',
  ENTRADA: 'entrada',
  SAIDA: 'saida',
} as const
export type TransactionFilterTipo = (typeof TransactionFilterTipo)[keyof typeof TransactionFilterTipo]

export const TransactionFilterPeriodo = {
  ALL: '',
  HOJE: 'hoje',
  ESTA_SEMANA: 'esta-semana',
  ESTE_MES: 'este-mes',
  ULTIMOS_3: 'ultimos-3',
  ESTE_ANO: 'este-ano',
} as const
export type TransactionFilterPeriodo = (typeof TransactionFilterPeriodo)[keyof typeof TransactionFilterPeriodo]

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface Transaction {
  id: string
  type: TransactionType
  description: string
  cashFlow: number
  categoryId: string
  createdAt: string
}

export interface TransactionFilters {
  search: string
  tipo: TransactionFilterTipo
  categoria: string
  periodo: TransactionFilterPeriodo
}

export interface TransactionFormValues {
  description: string
  categoryId: string
}

export interface TransactionInitialValues {
  type: TransactionFormType
  description: string
  cashFlow: number
  categoryId: string
  date?: string
}
