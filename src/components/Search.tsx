import { MagnifyingGlass } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Search() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  function sendSearch() {
    router.push(`/search/pokemons?search=${search}`, {
      forceOptimisticNavigation: true,
    })
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-1 overflow-hidden rounded-full border-2 border-red-500 bg-red-500">
        <input
          type="text"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Pesquisar"
          className="form-input h-10 w-[200px] rounded border-none bg-transparent text-sm font-medium text-white outline-none placeholder:text-zinc-50 focus:ring-0"
        />

        <button
          onClick={sendSearch}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white"
        >
          <MagnifyingGlass className="h-5 w-5" weight="bold" />
        </button>
      </div>
    </div>
  )
}
