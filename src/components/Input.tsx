'use client'
import { Eye, EyeSlash, WarningCircle } from '@phosphor-icons/react'
import clsx from 'clsx'
import { InputHTMLAttributes, useState } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputTestProps extends InputHTMLAttributes<HTMLInputElement> {
  typevalidate: 'error' | 'default' | 'disable'
  messageErro?: string
  typeInput: 'password' | 'text' | 'number'
  register?: UseFormRegister<any>
  nameRegister: string
  className?: string
  options?: RegisterOptions
}

export function Input({
  typevalidate,
  messageErro,
  typeInput,
  register,
  nameRegister,
  className,
  options,
  ...rest
}: InputTestProps) {
  const [open, setOpen] = useState(true)

  return (
    <>
      <div
        className={clsx(
          'relative w-full  rounded-md border-[2px]',
          {
            'border-red-500 ': typevalidate === 'error',
            'border-trasparent focus-within:border-yellow-500 ':
              typevalidate === 'default',
            'cursor-not-allowed border-zinc-200/50': typevalidate === 'disable',
          },
          className,
        )}
      >
        {typeInput === 'password' && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 "
          >
            {open ? (
              <Eye weight="bold" className="text-text_primary h-full w-full" />
            ) : (
              <EyeSlash
                weight="bold"
                className="text-text_primary h-full w-full"
              />
            )}
          </button>
        )}

        <input
          className={clsx(
            'bg-secodary form-input h-full w-full rounded-md border-none px-3 py-[10px] font-normal  outline-none focus:ring-0 sm:text-sm',
            {
              'placeholder:text-red-500': typevalidate === 'error',
              'cursor-not-allowed  placeholder:text-zinc-200/50':
                typevalidate === 'disable',
            },
            className,
          )}
          disabled={typevalidate === 'disable'}
          type={
            typeInput === 'password' ? (open ? 'password' : 'text') : typeInput
          }
          {...register?.(nameRegister, options)}
          {...rest}
        />
      </div>
      {typevalidate === 'error' && messageErro && (
        <p className="mt-1 flex items-center gap-1 text-left text-xs font-normal text-red-500">
          <WarningCircle className="h-4 w-4 text-red-500" weight="fill" />
          {messageErro}
        </p>
      )}
    </>
  )
}
