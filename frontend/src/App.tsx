import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Categories } from './pages/Categories'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Transactions } from './pages/Transactions'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // const { isAuthenticated } = useAuthStore()
  const isAuthenticated = true
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  // const { isAuthenticated } = useAuthStore()
  const isAuthenticated = false
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Layout>
  )
}
