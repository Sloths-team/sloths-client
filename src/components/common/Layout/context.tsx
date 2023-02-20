import React, { FC, ReactNode, useCallback, useMemo } from 'react'

export interface State {
  isLoggedIn: boolean
}

export type ContextValue = State & {
  useLogin: () => void
  useLogout: () => void
  useSignup: () => void
}

const initialState = {
  isLoggedIn: false,
}

type Action =
  | {
      type: 'LOGIN'
    }
  | {
      type: 'LOGOUT'
    }
  | {
      type: 'SIGNUP'
    }

export const SessionContext = React.createContext<State | any>(initialState)

SessionContext.displayName = 'SessionContext'

function sessionReducer(state: State, action: Action) {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        isLoggedIn: true,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLoggedIn: false,
      }
    }
    case 'SIGNUP': {
      return {
        ...state,
        isLoggedIn: true,
      }
    }
  }
}

export const SessionProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = React.useReducer(sessionReducer, initialState)

  const useLogin = useCallback(() => dispatch({ type: 'LOGIN' }), [dispatch])
  const useLogout = useCallback(() => dispatch({ type: 'LOGOUT' }), [dispatch])
  const useSignup = useCallback(() => dispatch({ type: 'SIGNUP' }), [dispatch])

  const value = useMemo(
    () => ({
      ...state,
      useLogin,
      useLogout,
      useSignup,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  )

  return <SessionContext.Provider value={value} {...props} />
}

export const useSession = (): ContextValue => {
  const context = React.useContext(SessionContext)
  if (!context) {
    throw new Error(`useSession must be used within a SessionProvider`)
  }
  return context
}

export const ManagedSessionContext: FC<{ children?: ReactNode }> = ({
  children,
}) => <SessionProvider>{children}</SessionProvider>
