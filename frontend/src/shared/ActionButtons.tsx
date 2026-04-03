import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

interface ActionButtonsProps {
  onEdit?: () => void
  onDelete?: () => void
}

export function ActionButtons({ onEdit, onDelete }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" className="rounded-lg" onClick={onEdit}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="rounded-lg" onClick={onDelete}>
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  )
}
