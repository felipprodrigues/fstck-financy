import { CategoryBadge, CategoryIconBadge, type Category } from '@/shared/CategoryBadge'
import { DeleteDialog } from '@/shared/DeleteDialog'
import { NewCategoryDialog } from './NewCategoryDialog'
import { useDeleteCategory } from './useCategories'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

interface CategoryCardProps {
  id: string
  category: Category
  title: string
  subtitle: string
  itemCount: number
}

export function CategoryCard({ id, category, title, subtitle, itemCount }: CategoryCardProps) {
  const { mutate: deleteCategory, isPending, error } = useDeleteCategory()

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 ring-1 ring-foreground/10">
      <div className="flex items-center justify-between">
        <CategoryIconBadge category={category} />
        <div className="flex items-center gap-1">
          <NewCategoryDialog
            mode="edit"
            categoryId={id}
            initialValues={{ title, subtitle, icon: category }}
            trigger={
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            }
          />
          <DeleteDialog
            title="Excluir Categoria"
            description="Tem certeza que quer excluir essa categoria?"
            onConfirm={() => deleteCategory(id)}
            isPending={isPending}
            error={error}
            trigger={
              <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-base font-semibold text-gray-800">{title}</span>
        <span className="text-sm font-normal text-muted-foreground">{subtitle}</span>
      </div>

      <div className="flex items-center justify-between">
        <CategoryBadge category={category} />
        <span className="text-sm font-normal text-gray-600">{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span>
      </div>
    </div>
  )
}
