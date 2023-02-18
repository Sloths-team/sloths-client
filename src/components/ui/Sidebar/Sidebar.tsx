import {
  MutableRefObject,
  useRef,
  KeyboardEvent,
  FC,
  ReactNode,
  useEffect,
} from 'react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

interface Props {
  children: ReactNode
  onClose: () => void
}
const Sidebar: FC<Props> = ({ children, onClose }) => {
  const sidebarRef = useRef() as MutableRefObject<HTMLDivElement>
  const contentRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.focus()
    }

    const content = contentRef.current

    if (content) {
      disableBodyScroll(content, { reserveScrollBarGap: true })
    }

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [])
  return (
    <div ref={sidebarRef} onKeyDown={handleKeyDown} tabIndex={1}>
      <div className="backdrop">
        <div className="content" ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
