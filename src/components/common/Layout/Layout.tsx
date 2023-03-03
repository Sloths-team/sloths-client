import { FC, ReactNode } from 'react'
import { SignUpView, ForgotPasswordView, LoginView } from '@components/auth'
import { useUI } from '@components/ui/context'
import Modal from '../Modal'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Sidebar } from '@components/ui'
import type { Link as LinkProps } from '../UserNav/MenuSidebar'
import { SessionProvider } from './context'

const ModalView: FC<{ modalView: string; onCloseModal: () => void }> = ({
  modalView,
  onCloseModal,
}) => {
  const kindsOfModal: { [key: string]: FC } = {
    LOGIN_VIEW: LoginView,
    SIGNUP_VIEW: SignUpView,
    FORGOT_VIEW: ForgotPasswordView,
  }

  const SelectedModalView = kindsOfModal[modalView]

  return (
    <Modal onClose={onCloseModal}>
      <SelectedModalView />
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
  const navBarlinks = [{ name: 'test', slug: 'test' }].map((c) => ({
    label: c.name,
    href: `/search/${c.slug}`,
  }))

  return (
    <div style={{ height: '1000px' }}>
      {/* <Navbar links={navBarlinks} /> */}
      <main>{children}</main>
      {/* <Footer /> */}
      <ModalUI />
      <SidebarUI links={navBarlinks} />
    </div>
  )
}

export default Layout
