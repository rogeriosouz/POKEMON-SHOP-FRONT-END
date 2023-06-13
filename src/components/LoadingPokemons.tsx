'use client'
import { Image as ImageIcon } from '@phosphor-icons/react'

export function LoadingPokemons() {
  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="h-[250px] w-full">
        <div className="group relative flex h-[230px] w-full  animate-pulse  cursor-pointer items-center justify-center   rounded-t bg-zinc-200">
          <ImageIcon className="h-20 w-20 text-zinc-100" weight="fill" />
        </div>
      </div>

      <div className="h-[250px] w-full">
        <div className="group relative flex h-[230px] w-full  animate-pulse  cursor-pointer items-center justify-center   rounded-t bg-zinc-200">
          <ImageIcon className="h-20 w-20 text-zinc-100" weight="fill" />
        </div>
      </div>

      <div className="h-[250px] w-full">
        <div className="group relative flex h-[230px] w-full  animate-pulse  cursor-pointer items-center justify-center   rounded-t bg-zinc-200">
          <ImageIcon className="h-20 w-20 text-zinc-100" weight="fill" />
        </div>
      </div>

      <div className="h-[250px] w-full">
        <div className="group relative flex h-[230px] w-full  animate-pulse  cursor-pointer items-center justify-center   rounded-t bg-zinc-200">
          <ImageIcon className="h-20 w-20 text-zinc-100" weight="fill" />
        </div>
      </div>
    </div>
  )
}
