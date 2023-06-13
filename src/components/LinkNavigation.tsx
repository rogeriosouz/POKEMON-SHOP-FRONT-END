'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LinkNavigationProps {
  href: string
  title: string
}

export function LinkNavigation({ href, title }: LinkNavigationProps) {
  const router = usePathname()

  return (
    <Link
      href={href}
      className={clsx(
        'border-b-[3px] px-1 py-2 text-base  font-normal text-zinc-50 transition-colors hover:border-red-500 hover:text-red-500',
        {
          'border-red-500 ': router === href,
          'border-transparent': router !== href,
          'text-zinc-50': router !== '/',
        },
      )}
    >
      {title}
    </Link>
  )
}
