import Link from 'next/link'
import { FC } from 'react'
import s from './LogoutAnnounceView.module.css'
import { useUI } from '@components/ui/context'

const LogoutAnnounceView: FC<any> = (props) => {
  const { inner } = props
  const { closeModal } = useUI()
  return (
    <div className={s.modal} {...inner}>
      <div className={s.content}>
        <h1>로그아웃이 완료되었습니다.</h1>
        <div className={s.login}>
          <Link href={'/login'} onClick={closeModal}>
            로그인으로 이동하기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LogoutAnnounceView
