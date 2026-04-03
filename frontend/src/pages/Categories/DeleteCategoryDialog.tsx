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

interface DeleteCategoryDialogProps {
  trigger: React.ReactNode
  onConfirm?: () => void
}

export function DeleteCategoryDialog({ trigger, onConfirm }: DeleteCategoryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent className="flex flex-col gap-6 sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-gray-800">
            Excluir Categoria
          </DialogTitle>
          <DialogDescription>
            Tem certeza que quer excluir essa categoria?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="border-0 bg-transparent flex gap-2">
          <Button
            variant="outline"
            className="flex-1 h-auto px-4 py-3"
          >
            Não
          </Button>
          <Button
            className="flex-1 bg-red-600 text-base font-medium hover:bg-red-700 h-auto px-4 py-3"
            onClick={onConfirm}
          >
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
