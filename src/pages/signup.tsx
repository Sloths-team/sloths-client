import { withNotLoggedIn } from '../lib/withLoggedIn'
import { Layout, SignUpView } from '@components/auth'

const SignUp = () => {
  return <SignUpView />
}

SignUp.Layout = Layout

export default withNotLoggedIn(SignUp)
