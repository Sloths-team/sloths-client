import { FC, ReactNode } from 'react'
import { SignUpView, ForgotPasswordView, LoginView } from '@components/auth'
import { useUI } from '@components/ui/context'
import Modal from '../Modal'
import Navbar from '../Navbar'
import { Sidebar } from '@components/ui'
import type { Link as LinkProps } from '../UserNav/MenuSidebar'
import s from './Layout.module.css'
import UserMenuView from '../UserNav/UserMenuView/UserMenuView'
import LogoutAnnounceView from '../UserNav/LogoutAnnounceView/LogoutAnnounceView'
import FindRepoView from '@components/project/FindRepoView'

const ModalView: FC<{ modalView: string; onCloseModal: () => void }> = ({
  modalView,
  onCloseModal,
}) => {
  const { props } = useUI()
  const kindsOfModal: { [key: string]: FC } = {
    USER_MENU_VIEW: UserMenuView,
    LOGOUT_ANNOUNCE_VIEW: LogoutAnnounceView,
    FIND_REPO_VIEW: FindRepoView,
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

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
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
      <main className={s.main}>{children}</main>
      <ModalUI />
      <SidebarUI links={navBarlinks} />
    </div>
  )
}

export default Layout
