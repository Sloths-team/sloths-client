import '@assets/main.css'

import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { getClient } from '../lib/queryClient'
import { QueryClientProvider } from 'react-query'
import { SessionProvider } from '@components/common/Layout/context'
import { ProjectProvider } from '@components/project/context'
import { SectionsProvider } from '@components/section/context'

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
        <SessionProvider>
          <ManagedUIContext>
            <ProjectProvider>
              <SectionsProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </SectionsProvider>
            </ProjectProvider>
          </ManagedUIContext>
        </SessionProvider>
      </QueryClientProvider>
    </>
  )
}
