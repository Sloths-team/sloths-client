import {
  MutableRefObject,
  useRef,
  KeyboardEvent,
  FC,
  ReactNode,
  useEffect,
} from 'react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import s from './Sidebar.module.css'

interface Props {
  children: ReactNode
  onClose: () => void
}

const Sidebar: FC<Props> = ({ children, onClose }) => {
  const sidebarRef = useRef() as MutableRefObject<HTMLDivElement>
  const contentRef = useRef() as MutableRefObject<HTMLDivElement>

  // const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
  //   if (e.key === 'Escape') {
  //     onClose()
  //   }
  // }

  // useEffect(() => {
  //   if (sidebarRef.current) {
  //     sidebarRef.current.focus()
  //   }

  //   const content = contentRef.current

  //   if (content) {
  //     disableBodyScroll(content, { reserveScrollBarGap: true })
  //   }

  //   return () => {
  //     clearAllBodyScrollLocks()
  //   }
  // }, [])

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}

export default Sidebar
