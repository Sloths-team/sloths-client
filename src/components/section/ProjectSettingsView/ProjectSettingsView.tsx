import { FC } from 'react'
import s from './ProjectSettingsView.module.css'
import { useUI } from '@components/ui/context'
import useSocials from '@lib/shareSocials'

const ProjectSettingsView: FC<any> = (props) => {
  const {
    inner: { style },
  } = props

  const { closeModal } = useUI()
  const { shareFacebook, shareTwitter } = useSocials()

  return (
    <div className={s.modal} style={style}>
      <div className={s.wrapper}>
        <span className={s.wrapper__title}>프로젝트 설정</span>
        <div
          className={s.item}
          onClick={() => {
            closeModal()
          }}
        >
          상세보기
        </div>
        <div
          className={s.item}
          onClick={() => {
            shareFacebook()
            closeModal()
          }}
        >
          삭제하기
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

export default ProjectSettingsView
