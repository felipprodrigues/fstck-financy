import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'
import type { Category as CategorySymbol } from '@/shared/CategoryBadge'
import { CategoryBadge, CategoryIconBadge } from '@/shared/CategoryBadge'
import { DataTable, type ColumnDef } from '@/shared/DataTable'
import { format } from 'date-fns'
import { ChevronRight, CircleArrowDown, CircleArrowUp, Plus, Wallet } from 'lucide-react'
import { useCategories } from '@/pages/Categories/useCategories'
import { useTransactions } from '@/pages/Transactions/useTransactions'
import { NewTransactionDialog } from '@/pages/Transactions/NewTransactionDialog'
import type { Transaction } from '@/pages/Transactions/types'
import { Link } from 'react-router-dom'
import { Cards } from './Cards'
import type { CategorySummary } from './types'

interface DashboardTransaction extends Transaction {
  categorySymbol: CategorySymbol | null
  date: string
}

const transactionColumns: ColumnDef<DashboardTransaction>[] = [
  {
    key: 'description',
    label: 'Descrição',
    showHeader: false,
    cellClassName: 'w-full',
    render: (row) => (
      <div className="flex items-center gap-3">
        {row.categorySymbol && <CategoryIconBadge category={row.categorySymbol} />}
        <div className="flex flex-col">
          <span className="text-base font-medium text-gray-800">{row.description}</span>
          <span className="text-sm text-muted-foreground">{row.date}</span>
        </div>
      </div>
    ),
  },
  {
    key: 'categoryId',
    label: 'Categoria',
    showHeader: false,
    cellClassName: 'text-center',
    render: (row) =>
      row.categorySymbol ? <CategoryBadge category={row.categorySymbol} /> : null,
  },
  {
    key: 'cashFlow',
    label: 'Valor',
    showHeader: false,
    cellClassName: 'text-right',
    render: (row) => {
      const positive = row.type === 'INCOME'
      return (
        <div className={`flex items-center justify-end gap-1 text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          R$ {row.cashFlow.toFixed(2).replace('.', ',')}
          {positive
            ? <CircleArrowUp className="h-4 w-4" />
            : <CircleArrowDown className="h-4 w-4" />
          }
        </div>
      )
    },
  },
]

const categoryColumns: ColumnDef<CategorySummary>[] = [
  {
    key: 'category',
    label: 'Categoria',
    showHeader: false,
    render: (row) => <CategoryBadge category={row.category} />,
  },
  {
    key: 'count',
    label: 'Itens',
    showHeader: false,
    cellClassName: 'text-right',
    render: (row) => (
      <span className="text-sm text-gray-500">{row.count} {row.count === 1 ? 'item' : 'itens'}</span>
    ),
  },
  {
    key: 'total',
    label: 'Total',
    showHeader: false,
    cellClassName: 'text-right',
    render: (row) => (
      <span className="text-sm text-gray-800">
        R$ {row.total.toFixed(2).replace('.', ',')}
      </span>
    ),
  },
]

function fmt(value: number) {
  return `R$ ${value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

export function Dashboard() {
  const { data: transactions = [] } = useTransactions()
  const { data: categoriesArray = [] } = useCategories()

  const categoriesById = Object.fromEntries(categoriesArray.map((c) => [c.id, c]))

  const income = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.cashFlow, 0)

  const expenses = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.cashFlow, 0)

  const balance = income - expenses

  const summaryCards = [
    { title: 'Saldo total',     value: fmt(balance),   icon: Wallet,          iconColor: 'text-purple-base' },
    { title: 'Receita do mês',  value: fmt(income),    icon: CircleArrowUp,   iconColor: 'text-brand-base'  },
    { title: 'Despesas do mês', value: fmt(expenses),  icon: CircleArrowDown, iconColor: 'text-red-base'    },
  ]

  const dashboardTransactions: DashboardTransaction[] = transactions
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)
    .map((t) => {
      const cat = categoriesById[t.categoryId]
      return {
        ...t,
        categorySymbol: (cat?.symbol ?? null) as CategorySymbol | null,
        date: format(new Date(t.createdAt), 'dd/MM/yyyy'),
      }
    })

  const categorySummary: CategorySummary[] = Object.values(
    categoriesArray.reduce<Record<string, CategorySummary>>((acc, cat) => {
      const symbol = cat.symbol
      if (!acc[symbol]) {
        acc[symbol] = { category: symbol as CategorySymbol, name: cat.name, count: 0, total: 0 }
      }
      const linked = transactions.filter((t) => t.categoryId === cat.id)
      acc[symbol].count += linked.length
      acc[symbol].total += linked.reduce((sum, t) => sum + t.cashFlow, 0)
      return acc
    }, {})
  ).sort((a, b) => b.count - a.count)

  return (
    <Page>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          {summaryCards.map((card) => (
            <Cards
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              iconColor={card.iconColor}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <DataTable
              data={dashboardTransactions}
              columns={transactionColumns}
              pagination
              pageSize={10}
              title="TRANSAÇÕES RECENTES"
              footer={
                <NewTransactionDialog
                  trigger={
                    <Button variant="ghost" className="gap-1 text-green-600 hover:text-green-700">
                      <Plus className="h-4 w-4" />
                      Nova Transação
                    </Button>
                  }
                />
              }
              headerAction={
                <Link to="/transactions">
                  <Button variant="link" size="sm" className="gap-1 p-0">
                    Ver Todas <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              }
            />
          </div>
          <div className="col-span-1">
            <DataTable
              data={categorySummary}
              columns={categoryColumns}
              title="CATEGORIAS"
              headerAction={
                <Link to="/categories">
                  <Button variant="link" size="sm" className="gap-1 p-0">
                    Gerenciar <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              }
            />
          </div>
        </div>
      </div>
    </Page>
  )
}
