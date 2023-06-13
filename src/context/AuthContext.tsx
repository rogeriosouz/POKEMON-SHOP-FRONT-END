'use client'
import { api } from '@/lib/api'
import { MutationStatus, useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/navigation'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type SignInData = {
  email: string
  password: string
}

type UserType = {
  coins: number
  id: string
  name: string
  email: string
}

type AuthcontextProps = {
  user: UserType | null
  signOut: () => void
  SignIn: ({ email, password }: SignInData) => void
  loading: boolean
  status: MutationStatus
  isAuthenticated: boolean
  success: { message: string }
  data: { message: string }
  error: { message: string }
  recoveryUser: () => void
  setSuccess: Dispatch<SetStateAction<string>>
}

const Authcontext = createContext({} as AuthcontextProps)

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(false)
  const token = Cookies.get('authUser')

  async function recoveryUser() {
    if (token) {
      const response = await api.get('/recovery')
      const { user } = response.data

      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        coins: user.coins,
      })
    }
  }

  // useEffect(() => {
  //   recoveryUser()
  // }, [window])

  const loginUserMutation = useMutation(
    async ({ email, password }: SignInData) => {
      setLoading(true)
      const response = await api.post('/auth/login', { email, password })

      return response.data
    },
    {
      onSuccess: (data) => {
        setError('')
        Cookies.set('authUser', data.token, { expires: 60 * 60 * 24 * 4 }) // 4d
        const token = jwt.decode(data.token) as {
          name: string
          email: string
          userId: string
          coins: number
        }
        api.defaults.headers.authorization = `Bearer ${data.token}`
        setUser({
          name: token.name,
          email: token.email,
          id: token.userId,
          coins: token.coins,
        })

        setSuccess(data.message)

        setTimeout(() => {
          router.replace('/')
          setLoading((v) => !v)
        }, 2000)
      },
      onError: (error: any) => {
        setError(error.response.data.message)
        setLoading(false)
      },
    },
  )

  function SignIn({ email, password }: SignInData) {
    loginUserMutation.mutate({ email, password })
  }

  function signOut() {
    Cookies.remove('authUser')
    api.defaults.headers.authorization = ``
    router.push('/login')
  }

  const isAuthenticated = !!token

  return (
    <Authcontext.Provider
      value={{
        recoveryUser,
        isAuthenticated,
        user,
        SignIn,
        signOut,
        loading,
        status: loginUserMutation.status,
        data: loginUserMutation.data,
        error: { message: error },
        success: { message: success },
        setSuccess,
      }}
    >
      {children}
    </Authcontext.Provider>
  )
}

export function useAuth() {
  const context = useContext(Authcontext)
  return context
}
