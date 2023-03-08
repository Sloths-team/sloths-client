import { FC } from 'react'
import s from './UserNav.module.css'
import { useSession } from '../Layout/context'
import { useRouter } from 'next/router'
import { useUI } from '@components/ui/context'

const UserMenuView: FC<any> = (props) => {
  const { inner } = props
  const { isUserLoggedIn, logout } = useSession()
  const { closeModal, setModalView, openModal } = useUI()
  const router = useRouter()

  return (
    <div className={s.user_menu_modal} {...inner}>
      <ul>
        {isUserLoggedIn && (
          <>
            <li
              className={s.item}
              onClick={() => {
                router.push('/username')
                closeModal()
              }}
            >
              프로필
            </li>
            <li
              className={s.item}
              onClick={() => {
                router.push('/projects/new')
                closeModal()
              }}
            >
              프로젝트 기록하기
            </li>
            <li
              className={s.item}
              onClick={() => {
                logout()
                setModalView('LOGOUT_ANNOUNCE_VIEW')
                openModal()
              }}
            >
              로그아웃
            </li>
          </>
        )}
        {!isUserLoggedIn && (
          <>
            <li
              className={s.item}
              onClick={() => {
                router.push('/login')
                closeModal()
              }}
            >
              로그인
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default UserMenuView
