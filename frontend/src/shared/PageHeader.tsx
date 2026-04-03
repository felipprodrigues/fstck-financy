import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface PageHeaderProps {
  title: string
  subtitle: string
  buttonLabel: string
  onAction?: () => void
  action?: React.ReactNode
}

export function PageHeader({ title, subtitle, buttonLabel, onAction, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      {action ?? (
        <Button className="gap-2 bg-brand-base hover:bg-brand-dark" onClick={onAction}>
          <Plus className="h-4 w-4" />
          {buttonLabel}
        </Button>
      )}
    </div>
  )
}
