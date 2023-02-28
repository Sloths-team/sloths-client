import React, {
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
  createContext,
  useContext,
} from 'react'

export interface State {
  isUserLoggedIn: boolean
}

export type ContextValue = State & {
  useLogin: () => void
  useLogout: () => void
  useSignup: () => void
}

const initialState: State = {
  isUserLoggedIn: false,
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

export const SessionContext = createContext<State>(initialState)

SessionContext.displayName = 'SessionContext'

function sessionReducer(state: State, action: Action) {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        isUserLoggedIn: true,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isUserLoggedIn: false,
      }
    }
    case 'SIGNUP': {
      return {
        ...state,
        isUserLoggedIn: true,
      }
    }
  }
}

export const SessionProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState)

  const useLogin = useCallback(() => dispatch({ type: 'LOGIN' }), [dispatch])
  const useLogout = useCallback(() => dispatch({ type: 'LOGOUT' }), [dispatch])
  const useSignup = useCallback(() => dispatch({ type: 'SIGNUP' }), [dispatch])

  const value: ContextValue = useMemo(
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
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error(`useSession must be used within a SessionProvider`)
  }
  return context
}

export const ManagedSessionContext: FC<{ children?: ReactNode }> = ({
  children,
}) => <SessionProvider>{children}</SessionProvider>
