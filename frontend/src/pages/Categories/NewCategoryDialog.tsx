import { Button } from '@/components/ui/button'
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
import { categoryConfig, CategoryIconBadge } from '@/shared/CategoryBadge'
import type { Category as CategorySymbol } from '@/shared/CategoryBadge'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateCategory, useUpdateCategory } from './useCategories'
import type { CategoryFormValues, CategoryInitialValues } from './types'

const allCategories = Object.keys(categoryConfig) as CategorySymbol[]

interface NewCategoryDialogProps {
  trigger: React.ReactElement
  mode?: 'create' | 'edit'
  initialValues?: CategoryInitialValues
  categoryId?: string
}

const labelClass = 'text-sm font-medium text-gray-700'

export function NewCategoryDialog({
  trigger,
  mode = 'create',
  initialValues,
  categoryId,
}: NewCategoryDialogProps) {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      name: initialValues?.title ?? '',
      description: initialValues?.subtitle ?? '',
      symbol: initialValues?.icon ?? null,
    },
  })

  const selectedSymbol = watch('symbol')

  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()

  const isPending = createCategory.isPending || updateCategory.isPending
  const error = createCategory.error ?? updateCategory.error

  const onSubmit = (values: CategoryFormValues) => {
    if (!values.symbol) return
    const data = { name: values.name, description: values.description, symbol: values.symbol }

    if (mode === 'edit' && categoryId) {
      updateCategory.mutate({ id: categoryId, ...data }, {
        onSuccess: () => { reset(); setOpen(false) },
      })
    } else {
      createCategory.mutate(data, {
        onSuccess: () => { reset(); setOpen(false) },
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="flex flex-col gap-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-gray-800">
            {mode === 'edit' ? 'Editar Categoria' : 'Nova Categoria'}
          </DialogTitle>
          <DialogDescription>Organize suas transações com categorias</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Título</label>
              <Input
                className="text-sm"
                placeholder="Ex: Alimentação"
                {...register('name', { required: 'Título obrigatório' })}
              />
              {errors.name && (
                <span className="text-xs text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <label className={labelClass}>Descrição</label>
                <span className="text-xs text-gray-400">(opcional)</span>
              </div>
              <Input
                className="text-sm"
                placeholder="Descrição da categoria"
                {...register('description')}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Ícone</label>
              <div className="grid grid-cols-5 justify-items-center gap-2">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setValue('symbol', cat)}
                    className={`w-fit rounded-xl p-1 transition-colors ${
                      selectedSymbol === cat ? 'bg-gray-200' : 'hover:bg-gray-100'
                    }`}
                  >
                    <CategoryIconBadge category={cat} />
                  </button>
                ))}
              </div>
              {!selectedSymbol && errors.symbol && (
                <span className="text-xs text-red-500">Selecione um ícone</span>
              )}
            </div>

            {error && (
              <span className="text-xs text-red-500 text-center">{error.message}</span>
            )}
          </div>

          <DialogFooter className="border-0 bg-transparent mt-6">
            <Button
              type="submit"
              className="w-full bg-brand-base text-base font-medium hover:bg-brand-dark sm:w-full h-auto px-4 py-3"
              disabled={isPending || !selectedSymbol}
            >
              {isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
