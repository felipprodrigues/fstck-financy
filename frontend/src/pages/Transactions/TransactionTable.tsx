import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { CategoryBadge, CategoryIconBadge, type Category } from '@/shared/CategoryBadge'
import { DeleteDialog } from '@/shared/DeleteDialog'
import { format } from 'date-fns'
import { CircleArrowDown, CircleArrowUp, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { Category as CategoryModel } from '../Categories/types'
import { NewTransactionDialog } from './NewTransactionDialog'
import { useDeleteTransaction } from './useTransactions'
import { TransactionFormType, TransactionType, type Transaction } from './types'

const PAGE_SIZE = 8
const HEADER_CLASS = 'text-xs font-medium uppercase text-gray-500'

interface TransactionTableProps {
  transactions: Transaction[]
  categories: Record<string, CategoryModel>
  isLoading: boolean
}

function TransactionRow({
  row,
  categories,
  editingId,
  setEditingId,
}: {
  row: Transaction
  categories: Record<string, CategoryModel>
  editingId: string | null
  setEditingId: (id: string | null) => void
}) {
  const { mutate: deleteTransaction, isPending, error } = useDeleteTransaction()
  const positive = row.type === TransactionType.INCOME
  const absValue = row.cashFlow.toFixed(2).replace('.', ',')
  const category = categories[row.categoryId]
  const symbol = (category?.symbol ?? '') as Category

  return (
    <TableRow key={row.id}>
      <TableCell>
        <div className="flex items-center gap-3">
          {symbol && <CategoryIconBadge category={symbol} />}
          <span className="text-base font-medium text-gray-800">{row.description}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm text-gray-600">
          {format(new Date(row.createdAt), 'dd/MM/yyyy')}
        </span>
      </TableCell>
      <TableCell>
        {symbol && <CategoryBadge category={symbol} />}
      </TableCell>
      <TableCell>
        <div className={`flex items-center gap-1 text-sm ${positive ? 'text-green-dark' : 'text-red-dark'}`}>
          {positive
            ? <CircleArrowUp className="h-4 w-4" />
            : <CircleArrowDown className="h-4 w-4" />
          }
          {positive ? 'Entrada' : 'Saída'}
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm font-semibold text-gray-800">
          {positive ? '+' : '-'} R$ {absValue}
        </span>
      </TableCell>
      <TableCell>
        <NewTransactionDialog
          mode="edit"
          transactionId={row.id}
          initialValues={{
            type: row.type === TransactionType.INCOME ? TransactionFormType.RECEITA : TransactionFormType.DESPESA,
            description: row.description,
            cashFlow: row.cashFlow,
            categoryId: row.categoryId,
            date: row.createdAt,
          }}
          open={editingId === row.id}
          onOpenChange={(open) => setEditingId(open ? row.id : null)}
          trigger={<span />}
        />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg"
            onClick={() => setEditingId(row.id)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <DeleteDialog
            title="Excluir Transação"
            description="Tem certeza que quer excluir essa transação?"
            onConfirm={() => deleteTransaction(row.id)}
            isPending={isPending}
            error={error}
            trigger={
              <Button variant="outline" size="icon" className="rounded-lg">
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            }
          />
        </div>
      </TableCell>
    </TableRow>
  )
}

export function TransactionTable({ transactions, categories, isLoading }: TransactionTableProps) {
  const [page, setPage] = useState(1)
  const [editingId, setEditingId] = useState<string | null>(null)
  const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE))
  const rows = transactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <Card>
      <CardContent className="p-0">
        <Table className="[&_td]:px-4 [&_th]:px-4">
          <TableHeader>
            <TableRow>
              <TableHead className={HEADER_CLASS}>Descrição</TableHead>
              <TableHead className={HEADER_CLASS}>Data</TableHead>
              <TableHead className={HEADER_CLASS}>Categoria</TableHead>
              <TableHead className={HEADER_CLASS}>Tipo</TableHead>
              <TableHead className={HEADER_CLASS}>Valor</TableHead>
              <TableHead className={HEADER_CLASS}>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TransactionRow
                  key={row.id}
                  row={row}
                  categories={categories}
                  editingId={editingId}
                  setEditingId={setEditingId}
                />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t px-4 py-3">
        <span className="text-sm text-gray-500">
          {transactions.length === 0
            ? '0 resultados'
            : `${(page - 1) * PAGE_SIZE + 1} a ${Math.min(page * PAGE_SIZE, transactions.length)} | ${transactions.length} resultados`}
        </span>
        <Pagination className="w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text=""
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                text=""
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  )
}
