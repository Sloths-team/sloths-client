import { FC } from 'react'
import { useUI } from '@components/ui/context'
import s from './UserNav.module.css'
import { FaUserCircle } from 'react-icons/fa'

const UserNav: FC = () => {
  const { openModal, setModalView } = useUI()

  return (
    <div
      className={s.root}
      onClick={() => {
        setModalView('USER_MENU_VIEW')
        openModal()
      }}
    >
      <FaUserCircle />
    </div>
  )
}

export default UserNav
