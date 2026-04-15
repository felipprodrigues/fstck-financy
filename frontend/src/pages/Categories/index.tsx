import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/shared/PageHeader'
import type { LucideIcon } from 'lucide-react'
import { ArrowDownUp, Plus, Tag, Utensils } from 'lucide-react'
import { CategoryCard } from './CategoryCard'
import { NewCategoryDialog } from './NewCategoryDialog'
import { useCategories } from './useCategories'
import { useTransactions } from '../Transactions/useTransactions'
import type { Category } from './types'

interface SummaryCardProps {
  icon: LucideIcon
  value: string
  label: string
}

function SummaryCard({ icon: Icon, value, label }: SummaryCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Icon size={22} className="mt-1 text-gray-800 shrink-0" />
          <div className="flex flex-col">
            <CardTitle className="text-xl font-bold text-gray-800">{value}</CardTitle>
            <p className="text-sm uppercase text-gray-500">{label}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export function Categories() {
  const { data: categories = [], isLoading } = useCategories()
  const { data: transactions = [] } = useTransactions()

  const categoriesById = Object.fromEntries(categories.map((c) => [c.id, c]))

  const itemCountBySymbol = transactions.reduce<Record<string, number>>((acc, t) => {
    const cat = categoriesById[t.categoryId]
    if (!cat) return acc
    acc[cat.symbol] = (acc[cat.symbol] ?? 0) + 1
    return acc
  }, {})

  const mostUsed = categories.reduce<Category | null>((top, cat) => {
    if (!top) return cat
    return (itemCountBySymbol[cat.symbol] ?? 0) > (itemCountBySymbol[top.symbol] ?? 0) ? cat : top
  }, null)

  return (
    <Page>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Categorias"
          subtitle="Organize suas transações por categorias"
          buttonLabel="Nova Categoria"
          action={
            <NewCategoryDialog
              trigger={
                <Button className="gap-2 bg-brand-base hover:bg-brand-dark">
                  <Plus className="h-4 w-4" />
                  Nova Categoria
                </Button>
              }
            />
          }
        />

        <div className="grid grid-cols-3 gap-4">
          <SummaryCard icon={Tag} value={String(categories.length)} label="Total de categorias" />
          <SummaryCard icon={ArrowDownUp} value={String(transactions.length)} label="Total de transações" />
          <SummaryCard
            icon={Utensils}
            value={mostUsed?.name ?? '—'}
            label="Categoria mais utilizada"
          />
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Carregando categorias...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                id={cat.id}
                category={cat.symbol as import('@/shared/CategoryBadge').Category}
                title={cat.name}
                subtitle={cat.description}
                itemCount={itemCountBySymbol[cat.symbol] ?? 0}
              />
            ))}
          </div>
        )}
      </div>
    </Page>
  )
}
