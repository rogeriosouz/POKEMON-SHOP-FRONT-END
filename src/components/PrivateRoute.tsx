import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

const PrivateRoute = ({ children }: ProtectedRouteProps) => {
  const { push } = useRouter()
  const pathName = usePathname()
  const token = Cookies.get('authUser')

  useEffect(() => {
    if (pathName === '/login' || pathName === '/register') {
      if (token) {
        push('/')
      }
    } else {
      if (!token) {
        push('/login')
      }
    }
  }, [token, push, pathName])

  return (
    <>
      {pathName === '/login' || pathName === '/register' ? (
        <>
          {token && null}
          {!token && children}
        </>
      ) : (
        <>
          {!token && null}
          {token && children}
        </>
      )}
    </>
  )
}

export default PrivateRoute
