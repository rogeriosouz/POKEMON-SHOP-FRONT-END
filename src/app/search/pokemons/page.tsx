'use client'

import { CardPokemons } from '@/components/CardPokemon'
import { LoadingPokemons } from '@/components/LoadingPokemons'
import { Pagination } from '@/components/Pagination'
import { TypePokemon } from '@/components/Pokemons'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

type ResponseSearchPokemon = {
  totalPages: number
  nextPage: boolean
  prevPage: boolean
  pokemons: TypePokemon[]
}

export default function SearchPokemon() {
  const [page, setPage] = useState(1)
  const { get } = useSearchParams()
  const search = get('search')

  const { data, status } = useQuery<ResponseSearchPokemon>(
    ['search/pokemons', page],
    async () => {
      const response = await api.post(
        `/pokemons/search?page=${page}&pageSize=${10}&ordemPrice=${'asc'}`,
        {
          search,
        },
      )

      return response.data
    },
    {
      keepPreviousData: true,
    },
  )

  return (
    <main className="mx-auto mt-28 max-w-[1450px]">
      <div className="mb-10 w-full">
        <h1 className="text-lg font-semibold text-zinc-950">
          Procurando por: <strong>{search}</strong>
        </h1>
      </div>

      {status === 'loading' && <LoadingPokemons />}

      {status === 'success' && (
        <div className="grid w-full grid-cols-4 gap-8">
          {data.pokemons.map((item) => (
            <CardPokemons
              id={item.id}
              name={item.title}
              price={`P$ ${item.price}`}
              urlImage={item.url}
              key={item.id}
            />
          ))}
        </div>
      )}

      {status === 'success' && data && data.totalPages > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          nextPage={data?.nextPage}
          totalPages={data?.totalPages}
          prevPage={data?.prevPage}
        />
      )}
    </main>
  )
}
