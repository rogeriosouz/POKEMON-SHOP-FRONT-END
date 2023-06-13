'use client'

import { useModalPokemon } from '@/hooks/UseModalPokemon'
import { Circle, Image as ImageIcon, X } from '@phosphor-icons/react'

import clsx from 'clsx'
import Image from 'next/image'
import { type } from 'os'
import { Dispatch, SetStateAction } from 'react'

interface ModalPokemonProps {
  id: string
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

export function ModalPokemon({ id, setOpen, open }: ModalPokemonProps) {
  const { data, purchasePokemon, status, purchasePokemonMutation } =
    useModalPokemon({ id, open })

  return (
    <div
      className={clsx(
        'fixed bottom-0 left-0 right-0 top-0 z-[9999]  bg-zinc-900/60',
        {
          visible: open,
          invisible: !open,
        },
      )}
    >
      <div
        className={clsx(
          'flex h-full w-full animate-animationToast items-center justify-center transition-all',
        )}
      >
        <div className="absolute left-1/2 top-1/2 z-[9999] flex h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 gap-5  rounded  bg-zinc-100 p-6">
          <div className="flex w-full  flex-1 items-center justify-center rounded bg-[url('https://i.pinimg.com/originals/47/b9/14/47b91495e80426f8b2d419a23c80da59.png')] bg-cover bg-no-repeat">
            {status === 'loading' && (
              <ImageIcon className="h-32 w-32 text-zinc-300" />
            )}

            {status === 'success' && data && (
              <Image
                width={320}
                height={320}
                src={data.pokemon.url}
                alt={data.pokemon.title}
                className="object-cover"
              />
            )}
          </div>
          <div className="flex w-full flex-1 flex-col justify-between">
            <div className="flex flex-col">
              <div className="mb-6 flex items-start  justify-between py-2">
                {status === 'loading' && (
                  <div className="flex w-full flex-col gap-2">
                    <div className="h-8 w-[80%] animate-pulse rounded bg-zinc-200"></div>
                    <div className="h-4 w-[30%] animate-pulse rounded bg-zinc-200"></div>
                  </div>
                )}

                {status === 'success' && data && (
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold uppercase text-zinc-900">
                      {data.pokemon.title}
                    </h1>
                    <p className="text-lg font-black  text-red-500">
                      P$ {data.pokemon.price}
                    </p>
                  </div>
                )}

                <button onClick={() => setOpen(false)}>
                  <X className="h-6 w-6 text-zinc-950" weight="bold" />
                </button>
              </div>

              {status === 'loading' && (
                <div className="grid w-full grid-cols-2 gap-2">
                  <div className="h-10 w-full animate-pulse bg-zinc-200"></div>
                  <div className="h-10 w-full animate-pulse bg-zinc-200"></div>
                </div>
              )}

              {status === 'success' && data && (
                <div
                  className={clsx('mb-4 grid grid-cols-2 gap-2', {
                    'grid-cols-2': type.length > 1,
                    'grid-cols-1': type.length === 1,
                  })}
                >
                  {data.pokemon.attributes.map((attribute) => (
                    <div
                      key={attribute.id}
                      className="flex  h-10 w-full items-center justify-center rounded text-xs font-black uppercase text-zinc-900"
                      style={{
                        background: attribute.colorRex,
                      }}
                    >
                      {attribute.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {status === 'loading' && (
              <div className="h-10 w-full animate-pulse rounded bg-zinc-200"></div>
            )}

            {status === 'success' && data && (
              <button
                disabled={
                  purchasePokemonMutation.isLoading || data.pokemon.quant < 1
                }
                onClick={purchasePokemon}
                className={clsx(
                  'flex h-10 w-full items-center justify-center rounded  py-1  uppercase  transition-colors ',
                  {
                    'cursor-not-allowed  bg-zinc-200/30 text-zinc-950':
                      data.pokemon.quant < 1,
                    'bg-red-500 text-zinc-200 disabled:cursor-progress':
                      data.pokemon.quant >= 1,
                  },
                )}
              >
                {purchasePokemonMutation.isLoading ? (
                  <div className="h-8 w-8">
                    <Circle className="h-8 w-8 animate-spin text-zinc-50" />
                  </div>
                ) : (
                  <>
                    {data.pokemon.quant < 1
                      ? 'Pokemon fora do estoque'
                      : 'Comprar pokemon'}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
