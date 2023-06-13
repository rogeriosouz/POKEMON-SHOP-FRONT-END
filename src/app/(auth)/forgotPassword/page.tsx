'use client'
import { Alert } from '@/components/Alert'
import { Input } from '@/components/Input'
import { useForm } from '@/hooks/UseForm'
import { ArrowLeft, CircleNotch } from '@phosphor-icons/react'
import clsx from 'clsx'
import Link from 'next/link'
import { z } from 'zod'

const schemaFormDataForgotPassword = z.object({
  email: z.string().email('E-mail invalido'),
})

type ForgotPasswordType = z.infer<typeof schemaFormDataForgotPassword>
type TypeResponse = {
  message: string
}

export default function ForgotPassword() {
  const { errors, handleSubmit, mutation, register, Submit } = useForm<
    ForgotPasswordType,
    TypeResponse
  >({
    schemaZod: schemaFormDataForgotPassword,
    configMutation: { method: 'POST', url: '/auth/forgotPassword' },
  })

  return (
    <main className="relative w-[500px] rounded bg-white p-8 shadow-lg shadow-black/20">
      <Link href={'/login'} className="absolute left-2 top-3">
        <ArrowLeft className="h-6 w-6 text-zinc-900" weight="bold" />
      </Link>
      <header className="mb-6 flex w-full flex-col items-center justify-start">
        <h1 className="text-xl font-bold text-zinc-900">Redefina sua senha</h1>
        <p className="mt-2 text-center text-sm font-medium text-black">
          Digite o endereço de e-mail da sua conta de usuário e enviaremos um
          link de redefinição de senha.
        </p>
      </header>

      <section className="w-full">
        <form onSubmit={handleSubmit(Submit)}>
          {mutation.status === 'error' && mutation.isError && (
            <Alert
              message={mutation.error.response.data.message}
              type="error"
              className="mb-4"
            />
          )}

          {mutation.status === 'success' && (
            <Alert
              message={mutation.data.message}
              type="success"
              className="mb-4"
            />
          )}

          <label htmlFor="email" className="mb-6 block">
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
              typevalidate={errors.email ? 'error' : 'default'}
              placeholder="Seu e-mail"
              register={register}
            />
          </label>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className="disabled:hover:opacity-none flex h-10 w-full  items-center justify-center rounded bg-yellow-500  font-medium text-black transition-colors hover:text-zinc-200 hover:opacity-[90%]"
          >
            {mutation.isLoading ? (
              <CircleNotch className="h-full w-8 animate-spin text-zinc-50" />
            ) : (
              'Enviar e-mail de redefinição de senha'
            )}
          </button>
        </form>
      </section>
    </main>
  )
}
