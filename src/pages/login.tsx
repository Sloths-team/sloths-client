import { LoginView, Layout } from '@components/auth'
import { withNotLoggedIn } from '../lib/withLoggedIn'

const Login = () => {
  return <LoginView />
}

Login.Layout = Layout

export default withNotLoggedIn(Login)
