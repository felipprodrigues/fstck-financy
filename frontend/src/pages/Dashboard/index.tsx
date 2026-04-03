import { DataTable, type ColumnDef } from '@/shared/DataTable'
import { CategoryBadge, CategoryIconBadge } from '@/shared/CategoryBadge'
import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { ChevronRight, CircleArrowDown, CircleArrowUp, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NewTransactionDialog } from '@/pages/Transactions/NewTransactionDialog'
import { Cards } from './Cards'
import type { CategorySummary, Transaction } from './types'
import { summaryCards, transactions, categories } from './MockData'


const transactionColumns: ColumnDef<Transaction>[] = [
  {
    key: 'description',
    label: 'Descrição',
    showHeader: false,
    cellClassName: 'w-full',
    render: (row) => (
      <div className="flex items-center gap-3">
        <CategoryIconBadge category={row.category} />
        <div className="flex flex-col">
          <span className="text-base font-medium text-gray-800 ">{row.description}</span>
          <span className="text-sm text-muted-foreground">{row.date}</span>
        </div>
      </div>
    ),
  },
  {
    key: 'category',
    label: 'Categoria',
    showHeader: false,
    cellClassName: 'text-center',
    render: (row) => <CategoryBadge category={row.category} />,
  },
  {
    key: 'amount',
    label: 'Valor',
    showHeader: false,
    cellClassName: 'text-right',
    render: (row) => {
      const positive = row.amount >= 0
      return (
        <div className={`flex items-center justify-end gap-1 text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          R$ {Math.abs(row.amount).toFixed(2).replace('.', ',')}
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
      <span className="text-sm text-gray-800">{row.total}</span>
    ),
  },
]

export function Dashboard() {
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
              data={transactions}
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
              data={categories}
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
