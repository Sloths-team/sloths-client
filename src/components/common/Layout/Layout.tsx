import { FC, ReactNode } from 'react'
import { SignUpView, ForgotPasswordView, LoginView } from '@components/auth'
import { useUI } from '@components/ui/context'
import Modal from '../Modal'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Sidebar } from '@components/ui'
import type { Link as LinkProps } from '../UserNav/MenuSidebar'

const ModalView: FC<{ modalView: string; onCloseModal: () => void }> = ({
  modalView,
  onCloseModal,
}) => {
  const kindsOfModal: { [key: string]: FC } = {
    LOGIN_VIEW: LoginView,
    SIGNUP_VIEW: SignUpView,
    FORGOT_VIEW: ForgotPasswordView,
  }

  const Content = kindsOfModal[modalView]

  return (
    <Modal onClose={onCloseModal}>
      <Content />
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
  const kindsOfView: { [key: string]: FC } = {
    //   CART_VIEW: CartSidebarView,
    //   SHIPPING_VIEW: ShippingView,
    //   PAYMENT_VIEW: PaymentMethodView,
    //   CHECKOUT_VIEW: CheckoutSidebarView,
    //   MOBILE_MENU_VIEW: () => <MenuSidebarView links={links} />,
  }

  const Content = kindsOfView[sidebarView]

  return (
    <Sidebar onClose={onCloseSidebar}>
      <Content />
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
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ModalUI />
    </div>
  )
}

export default Layout
