import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/shared/PageHeader'
import { isAfter, startOfDay, startOfMonth, startOfWeek, startOfYear, subMonths } from 'date-fns'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useCategories } from '../Categories/useCategories'
import { NewTransactionDialog } from './NewTransactionDialog'
import { TransactionFilters } from './TransactionFilters'
import { TransactionTable } from './TransactionTable'
import { useTransactions } from './useTransactions'
import type { Category } from '../Categories/types'
import {
  TransactionFilterPeriodo,
  TransactionFilterTipo,
  TransactionType,
  type Transaction,
  type TransactionFilters as Filters,
} from './types'

function applyFilters(
  transactions: Transaction[],
  _categoriesById: Record<string, Category>,
  categoriesArray: Category[],
  filters: Filters,
): Transaction[] {
  const now = new Date()

  const matchingCategoryIds = filters.categoria
    ? new Set(categoriesArray.filter((c) => c.name === filters.categoria).map((c) => c.id))
    : null

  return transactions.filter((t) => {
    if (filters.search && !t.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    if (filters.tipo === TransactionFilterTipo.ENTRADA && t.type !== TransactionType.INCOME) return false
    if (filters.tipo === TransactionFilterTipo.SAIDA && t.type !== TransactionType.EXPENSE) return false

    if (matchingCategoryIds && !matchingCategoryIds.has(t.categoryId)) return false

    if (filters.periodo) {
      const createdAt = new Date(t.createdAt)
      if (filters.periodo === TransactionFilterPeriodo.HOJE && !isAfter(createdAt, startOfDay(now))) return false
      if (filters.periodo === TransactionFilterPeriodo.ESTA_SEMANA && !isAfter(createdAt, startOfWeek(now))) return false
      if (filters.periodo === TransactionFilterPeriodo.ESTE_MES && !isAfter(createdAt, startOfMonth(now))) return false
      if (filters.periodo === TransactionFilterPeriodo.ULTIMOS_3 && !isAfter(createdAt, subMonths(now, 3))) return false
      if (filters.periodo === TransactionFilterPeriodo.ESTE_ANO && !isAfter(createdAt, startOfYear(now))) return false
    }

    return true
  })
}

export function Transactions() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    tipo: TransactionFilterTipo.TODOS,
    categoria: '',
    periodo: TransactionFilterPeriodo.ALL,
  })

  const { data: transactions = [], isLoading: loadingTx } = useTransactions()
  const { data: categoriesArray = [], isLoading: loadingCats } = useCategories()

  const categoriesById = Object.fromEntries(categoriesArray.map((c) => [c.id, c]))
  const filtered = applyFilters(transactions, categoriesById, categoriesArray, filters)

  return (
    <Page>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Transações"
          subtitle="Gerencie todas as suas transações financeiras"
          buttonLabel="Nova Transação"
          action={
            <NewTransactionDialog
              trigger={
                <Button className="gap-2 bg-brand-base hover:bg-brand-dark">
                  <Plus className="h-4 w-4" />
                  Nova Transação
                </Button>
              }
            />
          }
        />
        <TransactionFilters filters={filters} onFiltersChange={setFilters} categories={categoriesArray} />
        <TransactionTable
          transactions={filtered}
          categories={categoriesById}
          isLoading={loadingTx || loadingCats}
        />
      </div>
    </Page>
  )
}
