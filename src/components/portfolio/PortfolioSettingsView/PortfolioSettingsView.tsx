import { FC } from 'react'
import s from './PortfolioSettingsView.module.css'
import { useRouter } from 'next/router'
import { useUI } from '@components/ui/context'
import useSocials from '@lib/shareSocials'

const PortfolioSettingsView: FC<any> = (props) => {
  const { closeModal } = useUI()
  const { shareFacebook, shareTwitter } = useSocials()
  const router = useRouter()

  return (
    <div className={s.modal} {...props.inner}>
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
        <div
          className={s.item}
          onClick={() => {
            router.push('/portfolios/info')
            closeModal()
          }}
        >
          포트폴리오 정보 수정하기
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

export default PortfolioSettingsView
