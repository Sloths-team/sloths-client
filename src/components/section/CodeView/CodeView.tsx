import { FC } from 'react'
import s from './CodeView.module.css'
import { IoCloseOutline } from 'react-icons/io5'
import Button from '@components/ui/Button'
import { useUI } from '@components/ui/context'

const CodeView: FC<any> = (props) => {
  const {
    inner: { style },
  } = props

  const { closeModal } = useUI()

  return (
    <div className={s.root} style={style}>
      <div className={s.header}>
        <h2>코드 가져오기</h2>
        <button onClick={closeModal}>
          <IoCloseOutline />
        </button>
      </div>
      <main className={s.main}>
        <div>검색</div>
        <div className={s.container}></div>
        <div className={s.footer}>
          <Button type="button" onClick={() => {}}>
            가져오기
          </Button>
        </div>
      </main>
    </div>
  )
}

export default CodeView
