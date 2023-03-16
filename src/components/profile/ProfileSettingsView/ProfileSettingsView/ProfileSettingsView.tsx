import { FC } from 'react'
import s from './ProfileSettingsView.module.css'
import { useRouter } from 'next/router'
import { useUI } from '@components/ui/context'
import useSocials from '@lib/shareSocials'

const ProfileSettingsView: FC<any> = (props) => {
  const { inner } = props
  const { closeModal } = useUI()
  const { shareFacebook, shareTwitter } = useSocials()
  const router = useRouter()

  return (
    <div className={s.modal} {...inner}>
      <div className={s.wrapper}>
        <span className={s.wrapper__title}>설정</span>
        <div
          className={s.item}
          onClick={() => {
            router.push('/profile')
            closeModal()
          }}
        >
          프로필 수정하기
        </div>
      </div>
      <div className={s.wrapper}>
        <span className={s.wrapper__title}>공유하기</span>
        <div
          className={s.item}
          onClick={() => {
            closeModal()
          }}
        >
          카카오
        </div>
        <div
          className={s.item}
          onClick={() => {
            shareFacebook()
            closeModal()
          }}
        >
          페이스북
        </div>
        <div
          className={s.item}
          onClick={() => {
            shareTwitter()
            closeModal()
          }}
        >
          트위터
        </div>
      </div>
    </div>
  )
}

export default ProfileSettingsView
