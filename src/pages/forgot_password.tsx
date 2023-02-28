import { Layout, ForgotPasswordView } from '@components/auth'
import { withNotLoggedIn } from '@lib/withLoggedIn'

const ForgotPassword = () => {
  return <ForgotPasswordView />
}

ForgotPassword.Layout = Layout

export default withNotLoggedIn(ForgotPassword)
