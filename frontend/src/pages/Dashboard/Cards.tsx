import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { LucideIcon } from 'lucide-react'

interface CardsProps {
  title: string
  value: string
  icon: LucideIcon
  iconColor: string
}

export const Cards = ({ title, value, icon: Icon, iconColor }: CardsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Icon className={iconColor} size={18} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[28px] font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}
