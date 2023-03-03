import { Inter } from '@next/font/google'
import { Layout } from '@components/common'
import { withLoggedIn } from '@lib/withLoggedIn'

const Home = () => {
  return <div>여긴 홈일세... 로그인한 사용자만 들어올 수 있음.</div>
}

Home.Layout = Layout

export default withLoggedIn(Home)
