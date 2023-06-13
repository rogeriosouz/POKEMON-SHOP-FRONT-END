'use client'

import { GithubLogo } from '@phosphor-icons/react'

export function GithubButtonAuth() {
  return (
    <button className="flex w-full items-center justify-center gap-2  rounded bg-yellow-500 py-1 text-black transition-colors hover:text-zinc-200 hover:opacity-[90%]">
      <GithubLogo className="h-5 w-5" weight="fill" />
      github
    </button>
  )
}
