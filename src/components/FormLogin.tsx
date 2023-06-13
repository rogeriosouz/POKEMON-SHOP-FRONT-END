'use client'
import { Alert } from '@/components/Alert'
import { Input } from '@/components/Input'
import { useAuth } from '@/context/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleNotch } from '@phosphor-icons/react'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schemaLogin = z.object({
  email: z.string().email('E-mail invalido'),
  password: z.string().min(4, 'Senha precisa ter no minimo 4 caracteres'),
})

type FormDataLogin = z.infer<typeof schemaLogin>

export function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({ resolver: zodResolver(schemaLogin) })

  const { SignIn, status, loading, error, success, setSuccess } = useAuth()

  useEffect(() => {
    setSuccess('')
  }, [])

  function loginUser(data: FormDataLogin) {
    SignIn({ email: data.email, password: data.password })
  }

  return (
    <form onSubmit={handleSubmit(loginUser)}>
      {status === 'error' && error.message && (
        <Alert message={error.message} type="error" className="mb-4" />
      )}

      {status === 'success' && success.message && (
        <Alert message={success.message} type="success" className="mb-4" />
      )}

      <label htmlFor="email" className="mb-2 block">
        <p
          className={clsx('mb-1 text-sm font-normal', {
            'text-red-500': errors.email,
            'text-black': !errors.email,
          })}
        >
          E-mail
        </p>

        <Input
          nameRegister="email"
          typeInput="text"
          id="email"
          messageErro={errors.email ? errors.email.message : ''}
          typevalidate={errors.email?.message?.length ? 'error' : 'default'}
          placeholder="Seu e-mail"
          register={register}
        />
      </label>

      <label htmlFor="password" className="mb-6 block ">
        <p
          className={clsx('mb-1 text-sm font-normal', {
            'text-red-500': errors.password,
            'text-black': !errors.password,
          })}
        >
          Senha
        </p>

        <Input
          nameRegister="password"
          typeInput="password"
          id="password"
          messageErro={errors.password ? errors.password.message : ''}
          typevalidate={errors.password?.message?.length ? 'error' : 'default'}
          placeholder="Sua senha"
          register={register}
        />

        <div className="text-right">
          <Link
            href={'/forgotPassword'}
            className="text-sm font-medium text-zinc-900"
          >
            Esqueçeu sua <span className="text-yellow-500"> senha? </span>
          </Link>
        </div>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="disabled:hover:opacity-none flex h-10 w-full  items-center justify-center rounded bg-yellow-500  font-medium text-black transition-colors hover:text-zinc-200 hover:opacity-[90%]"
      >
        {loading ? (
          <CircleNotch className="h-full w-8 animate-spin text-zinc-50" />
        ) : (
          'Fazer login'
        )}
      </button>
    </form>
  )
}
