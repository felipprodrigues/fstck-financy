import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAuthStore } from '@/store/auth.store'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AvatarComponentProps {
  userName: string | undefined
  isDrawer?: boolean
}

export const AvatarComponent = ({ userName, isDrawer = false }: AvatarComponentProps) => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Avatar className={`flex-shrink-0 ${isDrawer ? 'h-8 w-8' : 'h-12 w-12'}`}>
          <AvatarFallback
            className={isDrawer ? 'bg-blue-600 text-white' : 'bg-zinc-950 text-primary-foreground'}
          >
            {userName ? userName.charAt(0).toUpperCase() : ''}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" side="bottom" className="w-48 p-1">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </PopoverContent>
    </Popover>
  )
}
