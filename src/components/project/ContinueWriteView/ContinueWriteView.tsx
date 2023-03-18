import Link from 'next/link'
import { FC } from 'react'
import s from './ContinueWriteView.module.css'
import { useUI } from '@components/ui/context'
import Button from '@components/ui/Button'

const ContinueView: FC<any> = (props) => {
  const { inner } = props
  const { closeModal } = useUI()

  return (
    <div className={s.modal} {...inner}>
      <div className={s.content}>
        <div>
          <h1>작성 중인 글이 있어요.</h1>
          <p>글을 이어서 쓰시겠어요?</p>
        </div>
        <div>
          <Button type="button">이어서 쓰기</Button>
          <Button type="button">새로 쓰기</Button>
        </div>
      </div>
    </div>
  )
}

export default ContinueView
