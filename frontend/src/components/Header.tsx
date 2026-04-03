// import { useAuthStore } from '@/stores/auth'
import { AvatarComponent } from '@/shared/AvatarComponent'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'

export function Header() {
  // const { user, isAuthenticated, logout } = useAuthStore()
  const isAuthenticated = true
  const user = 'JT'
  const location = useLocation()

  const isDashboard = location.pathname === '/'
  const isTransactions = location.pathname === '/transactions'
  const isCategories = location.pathname === '/categories'

  return (
    <header className="w-full px-6 py-4 border-b bg-white">
      {isAuthenticated && (
        <div className="flex items-center justify-between w-full">
          <img src="/Logo.svg" alt="Logo" className="h-7" />

          <nav className="flex items-center gap-1">
            <Link to="/">
              <Button size="sm" variant={isDashboard ? 'default' : 'ghost'}>
                Dashboard
              </Button>
            </Link>
            <Link to="/transactions">
              <Button size="sm" variant={isTransactions ? 'default' : 'ghost'}>
                Transações
              </Button>
            </Link>
            <Link to="/categories">
              <Button size="sm" variant={isCategories ? 'default' : 'ghost'}>
                Categorias
              </Button>
            </Link>
          </nav>

          <AvatarComponent userName={user || ''} />
        </div>
      )}
    </header>
  )
}
