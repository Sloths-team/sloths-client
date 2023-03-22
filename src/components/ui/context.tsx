import React, {
  FC,
  ReactNode,
  useCallback,
  useMemo,
  createContext,
  useReducer,
} from 'react'

export interface State {
  displaySidebar: boolean
  displayDropdown: boolean
  displayModal: boolean
  sidebarView: string
  modalView: string
  userAvatar: string
  props: any
}

export type ContextValue = State & {
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
  closeSidebarIfPresent: () => void
  openDropdown: () => void
  closeDropdown: () => void
  openModal: () => void
  closeModal: () => void
  setModalView: (view: MODAL_VIEWS, props?: {}) => void
  setSidebarView: (view: SIDEBAR_VIEWS, props?: {}) => void
  setUserAvatar: (view: string) => void
}

const MODAL_STYLE = {
  USER_MENU_VIEW: {
    outer: {},
    inner: {
      style: { position: 'absolute', top: '60px', right: '30px' },
    },
  },
  LOGOUT_ANNOUNCE_VIEW: {
    outer: {
      style: { backgroundColor: 'rgba(0,0,0,0.7)' },
    },
    inner: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
  FIND_REPO_VIEW: {
    outer: {
      style: { backgroundColor: 'rgba(255,255,255,0.7)' },
    },
    inner: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
  CONTINUE_VIEW: {
    outer: {
      style: { backgroundColor: 'rgba(0,0,0,0.7)' },
    },
    inner: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
  PORTFOLIO_SETTINGS_VIEW: {
    outer: {
      style: { backgroundColor: 'rgba(255,255,255,0.7)' },
    },
    inner: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
  MYPROJECT_SETTINGS_VIEW: {
    outer: {
      style: { backgroundColor: 'rgba(255,255,255,0.7)' },
    },
    inner: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
  CONTINUE_WRITE_VIEW: {
    outer: {
      style: { backgroundColor: 'rgba(255,255,255,0.7)' },
    },
    inner: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
  SECTION_PROJECT_SETTINGS_VIEW: {
    outer: {
      style: { backgroundColor: 'rgba(255,255,255,0.7)' },
    },
    inner: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
  DRAG_DROP_SECTION_VIEW: {
    outer: {
      style: { backgroundColor: 'rgba(0,0,0,0.7)' },
      closeavailable: false,
    },
    inner: {
      style: {},
    },
  },
  DRAG_DROP_IMAGE_VIEW: {
    outer: {
      style: { backgroundColor: 'rgba(0,0,0,0.7)' },
      closeavailable: false,
    },
    inner: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
  IMAGE_ZOOM_VIEW: {
    outer: {
      style: { backgroundColor: 'rgba(0,0,0,0.8)' },
      closeAvailable: false,
    },
    inner: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
}

const initialState = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: 'USER_MENU_VIEW',
  sidebarView: 'CART_VIEW',
  userAvatar: '',
  props: {
    ...MODAL_STYLE['USER_MENU_VIEW'],
  },
}

type Action =
  | {
      type: 'OPEN_SIDEBAR'
    }
  | {
      type: 'CLOSE_SIDEBAR'
    }
  | {
      type: 'OPEN_DROPDOWN'
    }
  | {
      type: 'CLOSE_DROPDOWN'
    }
  | {
      type: 'OPEN_MODAL'
    }
  | {
      type: 'CLOSE_MODAL'
    }
  | {
      type: 'SET_MODAL_VIEW'
      view: MODAL_VIEWS
      props: {}
    }
  | {
      type: 'SET_SIDEBAR_VIEW'
      view: SIDEBAR_VIEWS
      props: {}
    }
  | {
      type: 'SET_USER_AVATAR'
      value: string
    }

type MODAL_VIEWS =
  | 'USER_MENU_VIEW'
  | 'LOGOUT_ANNOUNCE_VIEW'
  | 'FIND_REPO_VIEW'
  | 'CONTINUE_VIEW'
  | 'PORTFOLIO_SETTINGS_VIEW'
  | 'MYPROJECT_SETTINGS_VIEW'
  | 'CONTINUE_WRITE_VIEW'
  | 'SECTION_PROJECT_SETTINGS_VIEW'
  | 'DRAG_DROP_SECTION_VIEW'
  | 'DRAG_DROP_IMAGE_VIEW'
  | 'IMAGE_ZOOM_VIEW'

type SIDEBAR_VIEWS = 'CART_VIEW' | 'CHECKOUT_VIEW' | 'PAYMENT_METHOD_VIEW'

export const UIContext = createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      }
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      }
    }
    case 'OPEN_DROPDOWN': {
      return {
        ...state,
        displayDropdown: true,
      }
    }
    case 'CLOSE_DROPDOWN': {
      return {
        ...state,
        displayDropdown: false,
      }
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      }
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
        props: {
          ...MODAL_STYLE[action.view],
          inner: { ...MODAL_STYLE[action.view].inner, ...action.props },
        },
      }
    }
    case 'SET_SIDEBAR_VIEW': {
      return {
        ...state,
        sidebarView: action.view,
        props: action.props,
      }
    }
    case 'SET_USER_AVATAR': {
      return {
        ...state,
        userAvatar: action.value,
      }
    }
  }
}

export const UIProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState)

  const openSidebar = useCallback(
    () => dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch]
  )
  const closeSidebar = useCallback(
    () => dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch]
  )
  const toggleSidebar = useCallback(
    () =>
      state.displaySidebar
        ? dispatch({ type: 'CLOSE_SIDEBAR' })
        : dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch, state.displaySidebar]
  )
  const closeSidebarIfPresent = useCallback(
    () => state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch, state.displaySidebar]
  )

  const openDropdown = useCallback(
    () => dispatch({ type: 'OPEN_DROPDOWN' }),
    [dispatch]
  )
  const closeDropdown = useCallback(
    () => dispatch({ type: 'CLOSE_DROPDOWN' }),
    [dispatch]
  )

  const openModal = useCallback(
    () => dispatch({ type: 'OPEN_MODAL' }),
    [dispatch]
  )
  const closeModal = useCallback(
    () => dispatch({ type: 'CLOSE_MODAL' }),
    [dispatch]
  )

  const setUserAvatar = useCallback(
    (value: string) => dispatch({ type: 'SET_USER_AVATAR', value }),
    [dispatch]
  )

  const setModalView = useCallback(
    (view: MODAL_VIEWS, props: {} = {}) =>
      dispatch({ type: 'SET_MODAL_VIEW', view, props }),
    [dispatch]
  )

  const setSidebarView = useCallback(
    (view: SIDEBAR_VIEWS, props: {} = {}) =>
      dispatch({ type: 'SET_SIDEBAR_VIEW', view, props }),
    [dispatch]
  )

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      setSidebarView,
      setUserAvatar,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = (): ContextValue => {
  const context = React.useContext(UIContext)
  if (!context) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext: FC<{ children?: ReactNode }> = ({
  children,
}) => (
  <UIProvider>
    {children}
    {/* <ThemeProvider>{children}</ThemeProvider> */}
  </UIProvider>
)
