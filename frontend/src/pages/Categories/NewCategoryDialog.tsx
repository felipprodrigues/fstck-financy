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
import type { Category } from '@/shared/CategoryBadge'
import { useState } from 'react'

const allCategories = Object.keys(categoryConfig) as Category[]

interface CategoryFormValues {
  title: string
  subtitle: string
  icon: Category | null
}

interface NewCategoryDialogProps {
  trigger: React.ReactNode
  initialValues?: CategoryFormValues
  mode?: 'create' | 'edit'
  onSave?: (values: CategoryFormValues) => void
}

const labelClass = 'text-sm font-medium text-gray-700'

export function NewCategoryDialog({
  trigger,
  initialValues,
  mode = 'create',
  onSave,
}: NewCategoryDialogProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [subtitle, setSubtitle] = useState(initialValues?.subtitle ?? '')
  const [selectedIcon, setSelectedIcon] = useState<Category | null>(initialValues?.icon ?? null)

  function handleSave() {
    onSave?.({ title, subtitle, icon: selectedIcon })
  }

  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent className="flex flex-col gap-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-gray-800">
            {mode === 'edit' ? 'Editar Categoria' : 'Nova Categoria'}
          </DialogTitle>
          <DialogDescription>Organize suas transações com categorias</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Título</label>
            <Input
              className="text-sm"
              placeholder="Ex: Alimentação"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <label className={labelClass}>Descrição</label>
              <span className="text-xs text-gray-400">(opcional)</span>
            </div>
            <Input
              className="text-sm"
              placeholder="Descrição da categoria"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Ícone</label>
            <div className="grid grid-cols-5 justify-items-center gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedIcon(cat)}
                  className={`w-fit rounded-xl p-1 transition-colors ${
                    selectedIcon === cat ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <CategoryIconBadge category={cat} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-0 bg-transparent mt-2">
          <Button
            className="w-full bg-brand-base text-base font-medium hover:bg-brand-dark sm:w-full h-auto px-4 py-3"
            onClick={handleSave}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
