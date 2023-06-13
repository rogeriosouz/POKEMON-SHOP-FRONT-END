'use client'
import { PlusCircle } from '@phosphor-icons/react'
import Image from 'next/image'
import { useState } from 'react'
import { ModalPokemon } from './ModalPokemon'

interface CardPokemonsProps {
  id: string
  name: string
  urlImage: string
  price: string
}

export function CardPokemons({ id, name, urlImage, price }: CardPokemonsProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && <ModalPokemon setOpen={setOpen} open={open} id={id} />}

      <div className="h-max w-full rounded shadow-2xl">
        <div
          onClick={() => setOpen(true)}
          className="group relative flex h-[200px] w-full  cursor-pointer items-center justify-center rounded-t"
        >
          <Image priority src={urlImage} alt={name} width={180} height={180} />

          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-zinc-900/30 opacity-0 transition-colors group-hover:opacity-100">
            <div className="h-16 w-16 rounded">
              <PlusCircle
                className="h-full w-full text-red-500"
                weight="bold"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between rounded-b  p-5 text-zinc-900">
          <p className="font-black uppercase">{name}</p>

          <p className="font-black uppercase text-red-500">{price}</p>
        </div>
      </div>
    </>
  )
}
