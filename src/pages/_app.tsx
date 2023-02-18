import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'

const Noop: FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>{children}</>
)

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
