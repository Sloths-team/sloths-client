import { Inter } from '@next/font/google'
import { Layout } from '@components/common'
import { withLoggedIn } from '@lib/withLoggedIn'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return <div>초기 설정</div>
}

Home.Layout = Layout

export default withLoggedIn(Home)
