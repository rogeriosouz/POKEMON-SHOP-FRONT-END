import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'
import { queryClient } from '@/lib/queryClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

type PokemonType = {
  pokemon: {
    id: string
    title: string
    price: number
    url: string
    quant: number
    attributes: [
      {
        id: string
        name: string
        colorRex: string
      },
    ]
  }
}

type ResponsePurchasePokemon = {
  message: string
}

export function useModalPokemon({ id, open }: { id: string; open: boolean }) {
  const router = useRouter()
  const { isAuthenticated, recoveryUser } = useAuth()

  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [open])

  const { data, status } = useQuery<PokemonType>(
    ['pokemon', id],
    async () => {
      const response = await api.get(`/pokemons/${id}`)

      return response.data
    },
    {
      refetchOnWindowFocus: false,
      // staleTime: 5 * 60 * 1000,
    },
  )

  const purchasePokemonMutation = useMutation<
    ResponsePurchasePokemon,
    any,
    { pokemonId: string }
  >(
    async ({ pokemonId }) => {
      const response = await api.post('/pokemons/purchase', {
        pokemonId,
      })

      return response.data
    },
    {
      onSuccess: (data) => {
        toast.success(data.message, {
          style: {
            color: '#000',
          },
        })
        recoveryUser()
        queryClient.invalidateQueries(['pokemon', id])
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          style: {
            color: '#000',
          },
        })
      },
    },
  )

  function purchasePokemon() {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    purchasePokemonMutation.mutate({ pokemonId: data?.pokemon.id as string })
  }

  return {
    purchasePokemon,
    data,
    status,
    isAuthenticated,
    recoveryUser,
    purchasePokemonMutation,
  }
}
