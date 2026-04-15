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
import { useCategories } from '../Categories/useCategories'
import { useCreateTransaction, useUpdateTransaction } from './useTransactions'
import { TransactionFormType, TransactionType } from './types'
import type { TransactionFormValues, TransactionInitialValues } from './types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, CircleArrowDown, CircleArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface NewTransactionDialogProps {
  trigger: React.ReactElement
  mode?: 'create' | 'edit'
  transactionId?: string
  initialValues?: TransactionInitialValues
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const labelClass = 'text-sm font-medium text-gray-700'

export function NewTransactionDialog({
  trigger,
  mode = 'create',
  transactionId,
  initialValues,
  open: controlledOpen,
  onOpenChange,
}: NewTransactionDialogProps) {
  const isControlled = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = (val: boolean) => {
    if (isControlled) onOpenChange?.(val)
    else setInternalOpen(val)
  }

  const [type, setType] = useState<TransactionFormType>(initialValues?.type ?? TransactionFormType.DESPESA)
  const [date, setDate] = useState<Date>()
  const [valor, setValor] = useState(
    initialValues?.cashFlow
      ? initialValues.cashFlow.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : ''
  )
  const [selectedCategoryName, setSelectedCategoryName] = useState('')

  const { data: categories = [] } = useCategories()
  const createTransaction = useCreateTransaction()
  const updateTransaction = useUpdateTransaction()

  const isPending = createTransaction.isPending || updateTransaction.isPending
  const error = createTransaction.error ?? updateTransaction.error

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    defaultValues: {
      description: initialValues?.description ?? '',
      categoryId: initialValues?.categoryId ?? '',
    },
  })

  useEffect(() => {
    if (open && mode === 'edit' && initialValues) {
      setType(initialValues.type)
      setValor(initialValues.cashFlow.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setValue('description', initialValues.description)
      setValue('categoryId', initialValues.categoryId)
      setDate(initialValues.date ? new Date(initialValues.date) : undefined)
      const cat = categories.find((c) => c.id === initialValues.categoryId)
      setSelectedCategoryName(cat?.name ?? '')
    }
  }, [open, categories])

  const handleSubmitForm = (values: TransactionFormValues) => {
    const cashFlow = parseFloat(valor.replace(/\./g, '').replace(',', '.')) || 0
    const dateISO = date?.toISOString()
    const baseData = {
      type: type === TransactionFormType.RECEITA ? TransactionType.INCOME : TransactionType.EXPENSE,
      description: values.description,
      cashFlow,
      categoryId: values.categoryId,
      ...(dateISO ? { date: dateISO } : {}),
    }

    const onSuccess = () => {
      reset()
      setValor('')
      setDate(undefined)
      setType(TransactionFormType.DESPESA)
      setSelectedCategoryName('')
      setOpen(false)
    }

    if (mode === 'edit' && transactionId) {
      updateTransaction.mutate({ id: transactionId, ...baseData }, { onSuccess })
    } else {
      createTransaction.mutate(baseData, { onSuccess })
    }
  }

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '')
    if (!digits) { setValor(''); return }
    const cents = parseInt(digits, 10)
    setValor((cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="flex flex-col gap-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-gray-800">
            {mode === 'edit' ? 'Editar Transação' : 'Nova Transação'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit' ? 'Atualize os dados da transação' : 'Registre sua despesa ou receita'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType(TransactionFormType.DESPESA)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-colors ${
                  type === TransactionFormType.DESPESA
                    ? 'border-red-base bg-red-light text-red-base'
                    : 'border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <CircleArrowDown className="h-4 w-4" />
                Despesa
              </button>
              <button
                type="button"
                onClick={() => setType(TransactionFormType.RECEITA)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-colors ${
                  type === TransactionFormType.RECEITA
                    ? 'border-brand-base bg-green-light text-brand-base'
                    : 'border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <CircleArrowUp className="h-4 w-4" />
                Receita
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Descrição</label>
              <Input
                className="text-sm"
                placeholder="Ex: Almoço no restaurante"
                {...register('description', { required: 'Descrição obrigatória' })}
              />
              {errors.description && (
                <span className="text-xs text-red-500">{errors.description.message}</span>
              )}
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
                    {date
                      ? format(date, 'dd/MM/yyyy', { locale: ptBR })
                      : <span className="text-muted-foreground">Selecionar data</span>}
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={date} />
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
              <Combobox
                value={selectedCategoryName}
                onValueChange={(name) => {
                  const cat = categories.find((c) => c.name === name)
                  setSelectedCategoryName(name ?? '')
                  setValue('categoryId', cat?.id ?? '')
                }}
              >
                <ComboboxInput
                  className="w-full text-sm"
                  placeholder={categories.length === 0 ? 'Nenhuma categoria cadastrada' : 'Selecionar categoria'}
                />
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

            {error && (
              <span className="text-xs text-red-500 text-center">{error.message}</span>
            )}
          </div>

          <DialogFooter className="border-0 bg-transparent mt-6">
            <Button
              type="submit"
              className="w-full bg-brand-base text-base font-medium hover:bg-brand-dark sm:w-full h-auto px-4 py-3"
              disabled={isPending || categories.length === 0}
            >
              {isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
