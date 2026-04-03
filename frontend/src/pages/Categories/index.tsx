import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/shared/PageHeader'
import { ArrowDownUp, Plus, Tag, Utensils } from 'lucide-react'
import { CategoryCard } from './CategoryCard'
import { mockCategories } from './MockData'
import { NewCategoryDialog } from './NewCategoryDialog'
import type { LucideIcon } from 'lucide-react'

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
          <SummaryCard icon={Tag} value="10" label="TOTAL DE CATEGORIAS" />
          <SummaryCard icon={ArrowDownUp} value="34" label="Total de transações" />
          <SummaryCard icon={Utensils} value="Alimentação" label="Categoria mais utilizada" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {mockCategories.map((item) => (
            <CategoryCard
              key={item.category}
              category={item.category}
              title={item.title}
              subtitle={item.subtitle}
              itemCount={item.itemCount}
            />
          ))}
        </div>
      </div>
    </Page>
  )
}
