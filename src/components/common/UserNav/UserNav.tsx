import { FC } from 'react'
import { useSession } from '../Layout/context'
import { useUI } from '@components/ui/context'

const UserNav: FC = () => {
  const { isUserLoggedIn } = useSession()
  const { openModal, setModalView, closeModal } = useUI()

  return <div onClick={() => (isUserLoggedIn ? null : openModal())}>유저</div>
}

export default UserNav
