'use client'
import { Alert } from '@/components/Alert'
import { useForm } from '@/hooks/UseForm'
import { CircleNotch } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Input } from './Input'

const schemaRegister = z
  .object({
    name: z
      .string()
      .min(1, 'Nome não pode ser vazio')
      .transform((name) => {
        return name
          .trim()
          .split(' ')
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1))
          })
          .join(' ')
      }),
    email: z.string().email('E-mail invalido'),
    password: z.string().min(4, 'Senha precisa ter no mínimo 4 caracteres'),
    repte_password: z
      .string()
      .min(4, 'Confirmar senha precisa ter no mínimo 4 caracteres'),
  })
  .refine(
    (data) => {
      return data.password === data.repte_password
    },
    {
      path: ['repte_password'],
      message: 'As senha precisam ser iguais',
    },
  )

type FormDataRegister = z.infer<typeof schemaRegister>

type TypeResponse = {
  message: string
}

export function FormRegister() {
  const router = useRouter()

  const { errors, handleSubmit, mutation, register, Submit } = useForm<
    FormDataRegister,
    TypeResponse
  >({
    schemaZod: schemaRegister,
    configMutation: {
      method: 'POST',
      url: '/auth/register',
    },
    resultMutation: {
      onSuccess: () => {
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      },
    },
  })

  return (
    <form onSubmit={handleSubmit(Submit)}>
      {mutation.isError && (
        <Alert
          message={mutation.error.response.data.message}
          type="error"
          className="mb-2 mt-2"
        />
      )}

      {mutation.data && mutation.status === 'success' && (
        <Alert
          message={mutation.data.message}
          type="success"
          className="mb-2 mt-2"
        />
      )}

      <label htmlFor="name" className="mb-2 block">
        <p
          className={clsx('mb-1 text-sm font-normal', {
            'text-red-500': errors.name,
            'text-black': !errors.name,
          })}
        >
          Nome
        </p>

        <Input
          nameRegister="name"
          typeInput="text"
          id="name"
          placeholder="Digite seu nome"
          messageErro={errors.name ? errors.name.message : ''}
          typevalidate={errors.name?.message?.length ? 'error' : 'default'}
          register={register}
        />
      </label>

      <label htmlFor="Email" className="mb-2 block">
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
          id="Email"
          messageErro={errors.email ? errors.email.message : ''}
          typevalidate={errors.email ? 'error' : 'default'}
          placeholder="Digite seu e-mail"
          register={register}
        />
      </label>

      <label htmlFor="password" className="mb-2 block">
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
          placeholder="Digite sua senha"
          register={register}
        />
      </label>

      <label htmlFor="repte_password" className="mb-6 block">
        <p
          className={clsx('mb-1 text-sm font-normal', {
            'text-red-500': errors.repte_password,
            'text-black': !errors.repte_password,
          })}
        >
          Confirmar senha
        </p>

        <Input
          nameRegister="repte_password"
          typeInput="password"
          id="repte_password"
          messageErro={
            errors.repte_password ? errors.repte_password.message : ''
          }
          typevalidate={
            errors.repte_password?.message?.length ? 'error' : 'default'
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
          'Criar conta'
        )}
      </button>
    </form>
  )
}
