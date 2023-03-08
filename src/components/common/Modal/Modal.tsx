import {
  FC,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import FocusTrap from './FocusTrap'
import s from './Modal.module.css'
import { useUI } from '@components/ui/context'

interface Props {
  className?: string
  children?: ReactNode
  onClose: () => void
}
const Modal: FC<Props> = ({ children, onClose }) => {
  const { props } = useUI()
  const ref = useRef() as MutableRefObject<HTMLDivElement>

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      return onClose()
    }
  }, [])

  useEffect(() => {
    const modal = ref.current

    window.addEventListener('keydown', handleKey)
    disableBodyScroll(modal, { reserveScrollBarGap: true })

    return () => {
      clearAllBodyScrollLocks()
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  return (
    <div className={s.root} onClick={onClose} {...props.outer}>
      <div ref={ref} onClick={(e) => e.stopPropagation()}>
        <FocusTrap focusFirst>{children}</FocusTrap>
      </div>
    </div>
  )
}

export default Modal
