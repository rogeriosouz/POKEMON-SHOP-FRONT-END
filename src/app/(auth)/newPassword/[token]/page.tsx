'use client'
import { Alert } from '@/components/Alert'
import { Input } from '@/components/Input'
import { useForm } from '@/hooks/UseForm'
import { CircleNotch } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { z } from 'zod'

const schemaFormDataNewPassword = z
  .object({
    newPassword: z
      .string()
      .min(4, 'Nova senha presica ter no minimo 4 caracteres'),
    confirmPassword: z
      .string()
      .min(4, 'Confime sua senha presica ter no minimo 4 caracteres'),
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.newPassword
    },
    {
      path: ['confirmPassword'],
      message: 'As senha precisam ser iguails',
    },
  )

type FormDataNewPassword = z.infer<typeof schemaFormDataNewPassword>

type TypeResponse = {
  message: string
}

export default function NewPassword() {
  const { token } = useParams()
  const { errors, handleSubmit, mutation, register, Submit } = useForm<
    FormDataNewPassword,
    TypeResponse
  >({
    schemaZod: schemaFormDataNewPassword,
    configMutation: {
      method: 'POST',
      url: '/auth/forgotPassword',
      params: { token },
    },
  })

  return (
    <main className="relative w-[500px] rounded bg-white p-8 shadow-lg shadow-black/20 ">
      <header className="mb-6 flex w-full flex-col items-center justify-start">
        <h1 className="text-xl font-bold text-zinc-900">Alterar sua senha</h1>
        <p className="mt-2 text-center text-sm font-medium text-black">
          Faça a alteraçao de sua senha abaixo
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

          <label htmlFor="newPassword" className="mb-2 block">
            <p
              className={clsx('mb-1 text-sm font-normal', {
                'text-red-500': errors.newPassword,
                'text-black': !errors.newPassword,
              })}
            >
              Nova senha
            </p>

            <Input
              nameRegister="newPassword"
              typeInput="password"
              id="newPassword"
              messageErro={errors.newPassword ? errors.newPassword.message : ''}
              typevalidate={
                errors.newPassword?.message?.length ? 'error' : 'default'
              }
              placeholder="Nova senha"
              register={register}
            />
          </label>

          <label htmlFor="confimPassword" className="mb-6 block">
            <p
              className={clsx('mb-1 text-sm font-normal', {
                'text-red-500': errors.confirmPassword,
                'text-black': !errors.confirmPassword,
              })}
            >
              Confirme sua senha
            </p>

            <Input
              nameRegister="confirmPassword"
              typeInput="password"
              id="confirmPassword"
              messageErro={
                errors.confirmPassword ? errors.confirmPassword.message : ''
              }
              typevalidate={
                errors.confirmPassword?.message?.length ? 'error' : 'default'
              }
              placeholder="Confirme sua senha"
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
              'Modificar senha'
            )}
          </button>
        </form>
      </section>
    </main>
  )
}
