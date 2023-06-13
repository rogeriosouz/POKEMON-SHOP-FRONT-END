'use client'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { CardPokemons } from './CardPokemon'
import { LoadingPokemons } from './LoadingPokemons'
import { Pagination } from './Pagination'

export type TypePokemon = {
  id: string
  price: number
  quant: number
  amount: number
  title: string
  url: string
}

interface PokemonsProps {
  title: string
}
export function Pokemons({ title }: PokemonsProps) {
  const [page, setPage] = useState(1)
  const [ordemPrice, setOrdemPrice] = useState('desc')

  const { data, status } = useQuery<{
    totalPages: number
    nextPage: boolean
    prevPage: boolean
    pokemons: TypePokemon[]
  }>(
    ['/pokemons', page, ordemPrice],
    async () => {
      const response = await api.get(
        `/pokemons?page=${page}&pageSize=${10}&ordemPrice=${ordemPrice}`,
      )
      const data = await response.data

      return data
    },
    {
      keepPreviousData: true,
    },
  )

  return (
    <>
      {status === 'success' && data && (
        <div className="mb-10 flex w-full items-center justify-between ">
          <h2 className=" text-2xl font-black uppercase text-zinc-950">
            {title}
          </h2>

          <select
            defaultValue={'desc'}
            onChange={(event) => setOrdemPrice(event.target.value)}
            className="form-select h-10 w-36 cursor-pointer rounded border-none bg-zinc-100 px-2 text-zinc-950 focus:border-red-500 focus:ring-0"
          >
            <option value={'asc'} className=" px-2 hover:bg-red-500">
              Mais barato
            </option>
            <option value={'desc'} className="px-2">
              Mais caro
            </option>
          </select>
        </div>
      )}

      {status === 'loading' && <LoadingPokemons />}

      {status === 'success' && data && (
        <div className="grid grid-cols-4 gap-6">
          {data.pokemons.map((pokemon: any) => (
            <CardPokemons
              id={pokemon.id}
              name={pokemon.title}
              price={`P$ ${pokemon.price}`}
              urlImage={pokemon.url}
              key={pokemon.id}
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
    </>
  )
}
