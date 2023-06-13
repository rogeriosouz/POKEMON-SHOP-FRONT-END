import { FormRegister } from '@/components/FormRegister'
import { GithubButtonAuth } from '@/components/GithubButtonAuth'
import { GoogleButtonAuth } from '@/components/GoogleButtonAuth'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../assets/images/logo.webp'

export default function Register() {
  return (
    <main className="z-30 w-[500px] rounded bg-white p-8   shadow-lg shadow-black/20">
      <header className="mb-6 flex w-full flex-col items-center justify-center">
        <Link href={'/'} className="cursor-pointer">
          <Image src={logo} alt="logo" width={140} height={140} />
        </Link>
        <p className="mt-2 text-center text-sm font-medium text-black">
          Bem vindo ao pokemon shop, crie sua conta abaixo
        </p>
      </header>

      <section className="w-full">
        <FormRegister />

        <div className="mt-6 flex w-full items-center gap-1 px-2">
          <div className="h-[1px] w-full bg-black"></div>
          <p className="text-black">ou</p>
          <div className="h-[1px] w-full bg-black"></div>
        </div>

        <div className="mt-4 flex w-full gap-2 ">
          <GoogleButtonAuth />

          <GithubButtonAuth />
        </div>
      </section>

      <footer className="mt-6 text-center">
        <Link href={'/login'} className="text-sm font-bold text-black ">
          Se você já possui conta,{' '}
          <span className="text-yellow-500">Faça login</span>
        </Link>
      </footer>
    </main>
  )
}
