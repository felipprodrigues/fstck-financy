import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/shared/PageHeader'
import { Plus } from 'lucide-react'
import { NewTransactionDialog } from './NewTransactionDialog'
import { TransactionFilters } from './TransactionFilters'
import { TransactionTable } from './TransactionTable'

export function Transactions() {
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
        <TransactionFilters />
        <TransactionTable />
      </div>
    </Page>
  )
}
