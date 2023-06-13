import { ReactNode } from 'react'

export const metadata = {
  title: {
    default: 'Auth',
    template: 'Auth | %s',
  },
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed  bottom-0 left-0 right-0 top-0 z-[999999999999] flex   items-center justify-center overflow-auto bg-zinc-100 bg-center bg-no-repeat">
      <div className="absolute left-0 right-0 top-0 z-[-9] h-[50vh] bg-red-500 "></div>
      {children}
    </div>
  )
}
