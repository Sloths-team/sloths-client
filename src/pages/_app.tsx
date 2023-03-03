import '@assets/main.css'

import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { getClient } from '../lib/queryClient'
import { QueryClientProvider } from 'react-query'

const Noop: FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>{children}</>
)

export default function App({ Component, pageProps }: AppProps) {
  const client = getClient()
  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <Head />
      <QueryClientProvider client={client}>
        <ManagedUIContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ManagedUIContext>
      </QueryClientProvider>
    </>
  )
}
