'use client'
import { Header } from '@/components/Header'
import PrivateRoute from '@/components/PrivateRoute'
import { AuthContextProvider } from '@/context/AuthContext'
import { queryClient } from '@/lib/queryClient'
import { privateRouter } from '@/utils/isRouterPrivate'
import { QueryClientProvider } from '@tanstack/react-query'
import 'animate.css'
import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '500', '600', '700', '900'],
})

// export const metadata = {
//   title: {
//     default: 'Pokemon-shop',
//     template: '%s | Pokemon-shop',
//   },
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = usePathname()
  const isPrivateRouter = privateRouter(router)

  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-zinc-50`}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              pauseOnFocusLoss={false}
              closeOnClick
              rtl={false}
              draggable
              pauseOnHover={false}
              theme="light"
              style={{ zIndex: 999999, width: '450px' }}
            />

            <Header />

            {!isPrivateRouter && children}
            {isPrivateRouter && <PrivateRoute>{children}</PrivateRoute>}
          </AuthContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
