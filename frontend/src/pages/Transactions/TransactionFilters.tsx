import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import type { Category } from '../Categories/types'
import { Search } from 'lucide-react'
import {
  TransactionFilterTipo,
  TransactionFilterPeriodo,
  type TransactionFilters as Filters,
} from './types'

const tipoOptions: { value: TransactionFilterTipo; label: string }[] = [
  { value: TransactionFilterTipo.TODOS,   label: 'Todos' },
  { value: TransactionFilterTipo.ENTRADA, label: 'Entrada' },
  { value: TransactionFilterTipo.SAIDA,   label: 'Saída' },
]

const periodoOptions: { value: TransactionFilterPeriodo; label: string }[] = [
  { value: TransactionFilterPeriodo.ALL,        label: 'Todos' },
  { value: TransactionFilterPeriodo.HOJE,       label: 'Hoje' },
  { value: TransactionFilterPeriodo.ESTA_SEMANA,label: 'Esta semana' },
  { value: TransactionFilterPeriodo.ESTE_MES,   label: 'Este mês' },
  { value: TransactionFilterPeriodo.ULTIMOS_3,  label: 'Últimos 3 meses' },
  { value: TransactionFilterPeriodo.ESTE_ANO,   label: 'Este ano' },
]

interface FilterLabelProps {
  children: React.ReactNode
}

function FilterLabel({ children }: FilterLabelProps) {
  return <span className="text-sm font-medium text-gray-700">{children}</span>
}

interface TransactionFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  categories: Category[]
}

export function TransactionFilters({ filters, onFiltersChange, categories }: TransactionFiltersProps) {
  const set = (key: keyof Filters) => (value: string) =>
    onFiltersChange({ ...filters, [key]: value })

  return (
    <div className="rounded-xl bg-white p-6 ring-1 ring-foreground/10">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <FilterLabel>Buscar</FilterLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText><Search /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Buscar por descrição"
              value={filters.search}
              onChange={(e) => set('search')(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="flex flex-col gap-1.5">
          <FilterLabel>Tipo</FilterLabel>
          <Combobox
            value={tipoOptions.find((o) => o.value === filters.tipo)?.label ?? ''}
            onValueChange={(label) => {
              const opt = tipoOptions.find((o) => o.label === label)
              set('tipo')(opt?.value ?? TransactionFilterTipo.TODOS)
            }}
          >
            <ComboboxInput className="w-full" placeholder="Selecionar tipo" />
            <ComboboxContent>
              <ComboboxList>
                {tipoOptions.map((opt) => (
                  <ComboboxItem key={opt.value} value={opt.label}>
                    {opt.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="flex flex-col gap-1.5">
          <FilterLabel>Categoria</FilterLabel>
          <Combobox value={filters.categoria} onValueChange={(v) => set('categoria')(v ?? '')}>
            <ComboboxInput className="w-full" placeholder="Selecionar categoria" />
            <ComboboxContent>
              <ComboboxList>
                {categories.map((cat) => (
                  <ComboboxItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="flex flex-col gap-1.5">
          <FilterLabel>Período</FilterLabel>
          <Combobox
            value={periodoOptions.find((o) => o.value === filters.periodo)?.label ?? ''}
            onValueChange={(label) => {
              const opt = periodoOptions.find((o) => o.label === label)
              set('periodo')(opt?.value ?? TransactionFilterPeriodo.ALL)
            }}
          >
            <ComboboxInput className="w-full" placeholder="Selecionar período" />
            <ComboboxContent>
              <ComboboxList>
                {periodoOptions.map((opt) => (
                  <ComboboxItem key={opt.value || 'all'} value={opt.label}>
                    {opt.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>
    </div>
  )
}
