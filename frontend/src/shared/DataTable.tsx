import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export interface ColumnDef<T> {
  key: keyof T | string
  label: string
  showHeader?: boolean
  cellClassName?: string
  headerCellClassName?: string
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  pagination?: boolean
  pageSize?: number
  title?: string
  headerAction?: React.ReactNode
  footer?: React.ReactNode
}

export function DataTable<T>({
  data,
  columns,
  pagination = false,
  pageSize = 10,
  title,
  headerAction,
  footer,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(data.length / pageSize)
  const rows = pagination ? data.slice((page - 1) * pageSize, page * pageSize) : data

  const hasAnyHeader = columns.some((col) => col.showHeader !== false)

  const getCellValue = (row: T, col: ColumnDef<T>): React.ReactNode => {
    if (col.render) return col.render(row)
    return row[col.key as keyof T] as React.ReactNode
  }

  return (
    <Card>
      {(title || headerAction) && (
        <CardHeader className="flex flex-row items-center justify-between">
          {title && <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>}
          {headerAction && <div>{headerAction}</div>}
        </CardHeader>
      )}
      <CardContent className="flex flex-col gap-4 p-0">
        <Table className="[&_td]:px-4 [&_th]:px-4">
        {hasAnyHeader && (
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)} className={col.headerCellClassName}>
                  {col.showHeader !== false ? col.label : null}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center text-muted-foreground py-8">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)} className={col.cellClassName}>{getCellValue(row, col)}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

        {pagination && totalPages > 1 && (
          <div className="flex items-center justify-between px-4 pb-4 text-sm text-muted-foreground">
            <span>
              Página {page} de {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      {footer && (
        <CardFooter className="justify-center border-t pt-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}
