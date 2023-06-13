import { CheckCircle, WarningCircle } from '@phosphor-icons/react'
import clsx from 'clsx'

interface AlertProps {
  type: 'success' | 'error'
  message: string
  className?: string
}

export function Alert({ message, type, className }: AlertProps) {
  return (
    <div
      className={clsx(
        'flex w-full items-center gap-2 rounded px-2 py-2',
        {
          'bg-red-500/50': type === 'error',
          'bg-green-500/50': type === 'success',
        },
        className,
      )}
    >
      {type === 'success' && (
        <div className="h-6 w-6">
          <CheckCircle className="h-6 w-6 text-green-500" weight="fill" />
        </div>
      )}

      {type === 'error' && (
        <div className="h-6 w-6">
          <WarningCircle className="h-6 w-6 text-[#F60909]" weight="fill" />
        </div>
      )}

      <p className={clsx('text-sm font-normal text-zinc-950')}>{message}</p>
    </div>
  )
}
