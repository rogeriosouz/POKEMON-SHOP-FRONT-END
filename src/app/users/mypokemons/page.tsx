'use client'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

export default function MyPokemons() {
  const { data, status } = useQuery(['myPokemons'], async () => {
    const response = await api.get('/user/pokemons')

    return response.data
  })

  return (
    <main className="mx-auto mt-28 max-w-[1450px]">
      <div className="mb-10 w-full">
        <h1 className="text-2xl font-black uppercase text-zinc-950">
          Meus pokemons
        </h1>
      </div>
      {status === 'success' && (
        <div className="grid w-full grid-cols-4 gap-8 rounded">
          {data.pokemons.map((item: any) => (
            <div
              className="flex w-full flex-col items-center justify-center overflow-hidden rounded bg-zinc-100 pt-4 shadow-2xl"
              key={item.id}
            >
              <Image
                width={150}
                height={150}
                src={item.url}
                alt={item.title}
                className="object-cover"
              />

              <div className="mt-4 w-full  py-4">
                <h2 className="text-center text-base font-medium uppercase text-zinc-900">
                  {item.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
