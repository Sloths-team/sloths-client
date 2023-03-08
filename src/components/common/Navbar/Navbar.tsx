import { FC } from 'react'
import Link from 'next/link'
import NavbarRoot from './NavbarRoot'
import UserNav from '../UserNav'
import s from './Navbar.module.css'

type Link = {
  href: string
  label: string
}
type Props = {
  links: Link[]
}

const Navbar: FC<Props> = ({ links }) => {
  return (
    <NavbarRoot>
      <div className={s.root}>
        <div className={s.left}>
          <h1 className={s.logo}>로고</h1>
          <ul className={s.nav_items}>
            {links.map((l) => (
              <li key={l.href} className={s.nav_item}>
                <Link href={l.href} key={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <UserNav />
        </div>
      </div>
    </NavbarRoot>
  )
}

export default Navbar
