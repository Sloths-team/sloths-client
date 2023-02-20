import { FC, ReactNode, RefObject, useRef, useEffect } from 'react'
import { tabbable } from 'tabbable'

interface Props {
  children: ReactNode
  focusFirst?: boolean
}
const FocusTrap: FC<Props> = ({ children, focusFirst = false }) => {
  const root: RefObject<any> = useRef()
  const anchor: RefObject<any> = useRef()

  const returnFocus = () => {
    if (anchor) anchor.current.focus()
  }

  const trapFocus = () => {
    if (root.current) {
      root.current.focus()

      if (focusFirst) {
        selectFirstFocusableEl()
      }
    }
  }

  const selectFirstFocusableEl = () => {
    // let match = false
    // let start = 0
    // let end = 60

    // const intv = setInterval(() => {
    //   if (!match !== start > end) {
    //     match = !!tabbable(root.current).length

    //     if (match) {
    //       tabbable(root.current)[0].focus()
    //     }

    //     start++
    //   } else {
    //     clearInterval(intv)
    //   }
    // }, 100)
    tabbable(root.current)[0]?.focus()
  }

  useEffect(() => {
    trapFocus()
    // setTimeout(trapFocus, 0)

    // return returnFocus
  }, [root, children])

  return (
    <div ref={root} tabIndex={-1}>
      {children}
    </div>
  )
}

export default FocusTrap
