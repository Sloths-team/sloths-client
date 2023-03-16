import { Layout } from '@components/common'
import MyProfileView from '@components/profile/MyProfileView'
import { withLoggedIn } from '@lib/withLoggedIn'

const MyProfile = () => {
  return <MyProfileView />
}

MyProfile.Layout = Layout

export default withLoggedIn(MyProfile)
