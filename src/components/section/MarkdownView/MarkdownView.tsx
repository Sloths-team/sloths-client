import { FC } from 'react'
import s from './MarkdownView.module.css'

const MarkDownView: FC = ({}) => {
  return (
    <div className={s.root}>
      <div className={s.section}>마크다운</div>
      <div className={s.section}>미리보기</div>
    </div>
  )
}

export default MarkDownView
