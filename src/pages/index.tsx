import { Inter } from '@next/font/google'
import { Layout } from '@components/common'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <div>초기 설정</div>
}

Home.Layout = Layout
