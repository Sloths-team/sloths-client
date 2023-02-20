import { FC } from 'react'
import Link from 'next/link'
import NavbarRoot from './NavbarRoot'
import UserNav from '../UserNav'

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
      <div>
        {links.map((l) => (
          <Link href={l.href} key={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
      <div>
        <UserNav />
      </div>
    </NavbarRoot>
  )
}

export default Navbar
