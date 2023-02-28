import { FC, ReactNode } from 'react'
import s from './Layout.module.css'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <main className={s.main}>{children}</main>
      </div>
    </div>
  )
}

export default Layout
