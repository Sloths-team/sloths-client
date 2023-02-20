import { FC, ReactNode, useEffect, useState } from 'react'

type Props = {
  children: ReactNode
}

const throttle = (cb: any, delay: number) => {
  let timer: number | null

  return (event: Event) => {
    if (timer) return

    timer = setTimeout(
      () => {
        cb(event)
        timer = null
      },
      delay,
      event
    )
  }
}

const NavbarRoot: FC<Props> = ({ children }) => {
  const [hasScrollled, setHasScrolled] = useState(false)

  const handleScroll = throttle(() => {
    const offset = 0
    const { scrollTop } = document.documentElement
    const scrolled = scrollTop > offset

    setHasScrolled(scrolled)
  }, 300)

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return <div>{children}</div>
}

export default NavbarRoot
