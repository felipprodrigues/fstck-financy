import type React from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from './Header'

const PUBLIC_ROUTES = ['/login', '/signup']

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation()
  const isPublic = PUBLIC_ROUTES.includes(pathname)

  return (
    <div className={`min-h-screen bg-gray-100 ${isPublic ? 'flex items-center justify-center' : ''}`}>
      {!isPublic && <Header />}
      <main className={isPublic ? 'w-full max-w-sm' : 'w-full px-6 py-4'}>{children}</main>
    </div>
  )
}
