import { Layout } from '@components/common'
import ProfileView from '@components/profile/ProfileView'
import { withLoggedIn } from '@lib/withLoggedIn'

const Profile = () => {
  return <ProfileView />
}

Profile.Layout = Layout

export default withLoggedIn(Profile)
