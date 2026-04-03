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
import { categoryConfig, type Category } from '@/shared/CategoryBadge'
import { Search } from 'lucide-react'
import { useState } from 'react'

const tipoOptions = [
  { value: 'todos',   label: 'Todos' },
  { value: 'entrada', label: 'Entrada' },
  { value: 'saida',   label: 'Saída' },
]

const periodoOptions = [
  { value: 'hoje',          label: 'Hoje' },
  { value: 'esta-semana',   label: 'Esta semana' },
  { value: 'este-mes',      label: 'Este mês' },
  { value: 'ultimos-3',     label: 'Últimos 3 meses' },
  { value: 'este-ano',      label: 'Este ano' },
]

const categoriaOptions = Object.entries(categoryConfig).map(([key, val]) => ({
  value: key as Category,
  label: val.label,
}))

interface FilterLabelProps {
  children: React.ReactNode
}

function FilterLabel({ children }: FilterLabelProps) {
  return <span className="text-sm font-medium text-gray-700">{children}</span>
}

export function TransactionFilters() {
  const [search, setSearch] = useState('')
  const [tipo, setTipo] = useState('todos')
  const [categoria, setCategoria] = useState('')
  const [periodo, setPeriodo] = useState('')

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="flex flex-col gap-1.5">
          <FilterLabel>Tipo</FilterLabel>
          <Combobox value={tipo} onValueChange={setTipo}>
            <ComboboxInput className="w-full" placeholder="Selecionar tipo" />
            <ComboboxContent>
              <ComboboxList>
                {tipoOptions.map((opt) => (
                  <ComboboxItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="flex flex-col gap-1.5">
          <FilterLabel>Categoria</FilterLabel>
          <Combobox value={categoria} onValueChange={setCategoria}>
            <ComboboxInput className="w-full" placeholder="Selecionar categoria" />
            <ComboboxContent>
              <ComboboxList>
                {categoriaOptions.map((opt) => (
                  <ComboboxItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="flex flex-col gap-1.5">
          <FilterLabel>Período</FilterLabel>
          <Combobox value={periodo} onValueChange={setPeriodo}>
            <ComboboxInput className="w-full" placeholder="Selecionar período" />
            <ComboboxContent>
              <ComboboxList>
                {periodoOptions.map((opt) => (
                  <ComboboxItem key={opt.value} value={opt.value}>
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
