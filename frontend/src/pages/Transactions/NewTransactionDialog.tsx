import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { categoryConfig } from '@/shared/CategoryBadge'
import type { Category } from '@/shared/CategoryBadge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, CircleArrowDown, CircleArrowUp } from 'lucide-react'
import { useState } from 'react'

type TransactionType = 'despesa' | 'receita'

const categoryOptions = Object.entries(categoryConfig).map(([key, val]) => ({
  value: key as Category,
  label: val.label,
}))

interface NewTransactionDialogProps {
  trigger: React.ReactNode
}

const labelClass = 'text-sm font-medium text-gray-700'

export function NewTransactionDialog({ trigger }: NewTransactionDialogProps) {
  const [type, setType] = useState<TransactionType>('despesa')
  const [date, setDate] = useState<Date>()
  const [categoria, setCategoria] = useState('')
  const [valor, setValor] = useState('')

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '')
    if (!digits) { setValor(''); return }
    const cents = parseInt(digits, 10)
    setValor((cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  }

  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent className="flex flex-col gap-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-gray-800">
            Nova Transação
          </DialogTitle>
          <DialogDescription>Registre sua despesa ou receita</DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setType('despesa')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-colors ${
              type === 'despesa'
                ? 'border-red-base bg-red-light text-red-base'
                : 'border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <CircleArrowDown className="h-4 w-4" />
            Despesa
          </button>
          <button
            type="button"
            onClick={() => setType('receita')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-colors ${
              type === 'receita'
                ? 'border-brand-base bg-green-light text-brand-base'
                : 'border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <CircleArrowUp className="h-4 w-4" />
            Receita
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Descrição</label>
            <Input className="text-sm" placeholder="Ex: Almoço no restaurante" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Data</label>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      className="w-full justify-between text-sm font-normal"
                    />
                  }
                >
                  {date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : <span className="text-muted-foreground">Selecionar data</span>}
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Valor</label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText className="text-sm">R$</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  type="text"
                  inputMode="numeric"
                  placeholder="0,00"
                  value={valor}
                  onChange={handleValorChange}
                  className="text-sm"
                />
              </InputGroup>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Categoria</label>
            <Combobox value={categoria} onValueChange={setCategoria}>
              <ComboboxInput className="w-full text-sm" placeholder="Selecionar categoria" />
              <ComboboxContent>
                <ComboboxList>
                  {categoryOptions.map((opt) => (
                    <ComboboxItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>

        <DialogFooter className="border-0 bg-transparent mt-2">
          <Button className="w-full bg-brand-base text-base font-medium hover:bg-brand-dark sm:w-full h-auto px-4 py-3">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
