import { FC } from 'react'
import s from './UserMenuView.module.css'
import { useSession } from '../../Layout/context'
import { useRouter } from 'next/router'
import { useUI } from '@components/ui/context'

const UserMenuView: FC<any> = (props) => {
  const { inner } = props
  const { isUserLoggedIn, logout, user } = useSession()

  const { closeModal, setModalView, openModal } = useUI()
  const router = useRouter()

  if (!user) return <div>로딩중...</div>

  return (
    <div className={s.modal} {...inner}>
      <ul>
        {isUserLoggedIn && (
          <>
            <li
              className={s.item}
              onClick={() => {
                router.push('/porfolios')
                closeModal()
              }}
            >
              내 포트폴리오
            </li>
            {isUserLoggedIn && (
              <li
                className={s.item}
                onClick={() => {
                  router.push(`/profile`)
                  closeModal()
                }}
              >
                내 프로필
              </li>
            )}
            <li
              className={s.item}
              onClick={() => {
                router.push('/projects')
                closeModal()
              }}
            >
              프로젝트 관리하기
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
