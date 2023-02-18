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
interface Props {
  className?: string
  children?: ReactNode
  onClose: () => void
}
const Modal: FC<Props> = ({ children, onClose }) => {
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
    <div>
      <div ref={ref}>
        <button onClick={() => onClose()}>x</button>
        <FocusTrap focusFirst>{children}</FocusTrap>
      </div>
    </div>
  )
}

export default Modal
