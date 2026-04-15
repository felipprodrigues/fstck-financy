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
import { useState } from 'react'

interface DeleteDialogProps {
  trigger: React.ReactElement
  title: string
  description: string
  onConfirm: () => void
  isPending?: boolean
  error?: Error | null
}

export function DeleteDialog({
  trigger,
  title,
  description,
  onConfirm,
  isPending = false,
  error,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    onConfirm()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="flex flex-col gap-6 sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-gray-800">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {error && (
          <span className="text-xs text-red-500 text-center">{error.message}</span>
        )}

        <DialogFooter className="border-0 bg-transparent flex gap-2">
          <Button
            variant="outline"
            className="flex-1 h-auto px-4 py-3"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Não
          </Button>
          <Button
            className="flex-1 bg-red-600 text-base font-medium hover:bg-red-700 h-auto px-4 py-3"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? 'Excluindo...' : 'Sim'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
