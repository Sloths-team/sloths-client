import { FC } from 'react'
import Link from 'next/link'
import NavbarRoot from './NavbarRoot'
import UserNav from '../UserNav'
import s from './Navbar.module.css'
import { RiMenu2Line } from 'react-icons/ri'
import { BiSearch } from 'react-icons/bi'
import { useUI } from '@components/ui/context'

type Link = {
  href: string
  label: string
}
type Props = {
  links?: Link[]
}

const Navbar: FC<Props> = ({ links }) => {
  const { openSidebar, setSidebarView } = useUI()

  return (
    <NavbarRoot>
      <div className={s.root}>
        <div className={s.section}>
          <h1 className={s.logo}>
            <RiMenu2Line
              className={s.menu}
              onClick={() => {
                setSidebarView('SIDE_USER_NAV')
                openSidebar()
              }}
            />
            <Link href={'/'}>개발자_포트폴리오_프로젝트</Link>
          </h1>
          {links && (
            <ul className={s.ul}>
              {links?.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} key={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={s.section}>
          <BiSearch className={s.search} />
          <UserNav />
        </div>
      </div>
    </NavbarRoot>
  )
}

export default Navbar
