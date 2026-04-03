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
import { ActionButtons } from '@/shared/ActionButtons'
import { CategoryBadge, CategoryIconBadge } from '@/shared/CategoryBadge'
import { transactions } from './MockData'
import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import { useState } from 'react'

const PAGE_SIZE = 8

const HEADER_CLASS = 'text-xs font-medium uppercase text-gray-500'

export function TransactionTable() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(transactions.length / PAGE_SIZE)
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
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, i) => {
                const positive = row.amount >= 0
                const absValue = Math.abs(row.amount).toFixed(2).replace('.', ',')

                return (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <CategoryIconBadge category={row.category} />
                        <span className="text-base font-medium text-gray-800">{row.description}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{row.date}</span>
                    </TableCell>
                    <TableCell>
                      <CategoryBadge category={row.category} />
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
                      <ActionButtons />
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t px-4 py-3">
        <span className="text-sm text-gray-500">
          {(page - 1) * PAGE_SIZE + 1} a {Math.min(page * PAGE_SIZE, transactions.length)} | {transactions.length} resultados
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
