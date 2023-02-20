import { FC } from 'react'
import { useSession } from '../Layout/context'
import { useUI } from '@components/ui/context'

const UserNav: FC = () => {
  const { isLoggedIn } = useSession()
  const { openModal, setModalView, closeModal } = useUI()

  return <div onClick={() => (isLoggedIn ? null : openModal())}>유저</div>
}

export default UserNav
