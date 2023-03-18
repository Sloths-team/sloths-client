import { FC, ReactNode } from 'react'
import { useUI } from '@components/ui/context'
import Modal from '../Modal'
import Navbar from '../Navbar'
import { Sidebar } from '@components/ui'
import type { Link as LinkProps } from '../UserNav/MenuSidebar'
import s from './Layout.module.css'
import UserMenuView from '../UserNav/UserMenuView/UserMenuView'
import LogoutAnnounceView from '../UserNav/LogoutAnnounceView/LogoutAnnounceView'
import FindRepoView from '@components/project/FindRepoView'
import ContinueView from '@components/project/ContinueWriteView'
import PortfolioSettingsView from '@components/portfolio/PortfolioSettingsView'
import MyProjectSettingsView from '@components/project/MyProjectSettingsView'
import cn from 'clsx'
import ContinueWriteView from '@components/project/ContinueWriteView'

const ModalView: FC<{ modalView: string; onCloseModal: () => void }> = ({
  modalView,
  onCloseModal,
}) => {
  const { props } = useUI()
  const kindsOfModal: { [key: string]: FC } = {
    USER_MENU_VIEW: UserMenuView,
    LOGOUT_ANNOUNCE_VIEW: LogoutAnnounceView,
    FIND_REPO_VIEW: FindRepoView,
    CONTINUE_VIEW: ContinueView,
    PORTFOLIO_SETTINGS_VIEW: PortfolioSettingsView,
    MYPROJECT_SETTINGS_VIEW: MyProjectSettingsView,
    CONTINUE_WRITE_VIEW: ContinueWriteView,
  }

  const SelectedModalView = kindsOfModal[modalView]

  return (
    <Modal onClose={onCloseModal}>
      <SelectedModalView {...props} />
    </Modal>
  )
}

const ModalUI: FC = () => {
  const { displayModal, closeModal, modalView } = useUI()

  return displayModal ? (
    <ModalView modalView={modalView} onCloseModal={closeModal} />
  ) : null
}

const SidebarView: FC<{
  links: LinkProps[]
  sidebarView: string
  onCloseSidebar: () => void
}> = ({ sidebarView, onCloseSidebar }) => {
  const kindsOfView: { [key: string]: FC } = {}

  const SelectedSidebarView = kindsOfView[sidebarView]

  return (
    <Sidebar onClose={onCloseSidebar}>
      <SelectedSidebarView />
    </Sidebar>
  )
}

const SidebarUI: FC<{ links: LinkProps[] }> = ({ links }) => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI()

  return displaySidebar ? (
    <SidebarView
      links={links}
      sidebarView={sidebarView}
      onCloseSidebar={closeSidebar}
    />
  ) : null
}

const Layout: FC<{ full: boolean | undefined; children: ReactNode }> = ({
  full,
  children,
}) => {
  const navBarlinks = [
    { name: '메뉴 A', slug: 'menu_A' },
    { name: '메뉴 B', slug: 'menu_B' },
  ].map((c) => ({
    label: c.name,
    href: `/search/${c.slug}`,
  }))

  return (
    <div>
      <Navbar links={navBarlinks} />
      <main className={cn(s.main, { [s.full]: full })}>{children}</main>
      <ModalUI />
      <SidebarUI links={navBarlinks} />
    </div>
  )
}

export default Layout
