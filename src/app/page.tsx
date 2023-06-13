import { Pokemons } from '@/components/Pokemons'

export const metadata = {
  title: 'Home',
}

export default async function Home() {
  return (
    <main className="">
      <section className="mx-auto my-28 max-w-[1450px]">
        <Pokemons title="Todos os pokemons" />
      </section>
    </main>
  )
}
