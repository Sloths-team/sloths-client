import React, {
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
  createContext,
  useContext,
} from 'react'
import { LoginBody, SignUpBody } from '@lib/repo/auth'
import { loginApi, signUpApi } from '../../../lib/apis/auth'

export type State = {
  isUserLoggedIn: boolean
}

export type ContextValue = State & {
  useLogin: ({ email, password }: LoginBody) => void
  useSignup: ({ name, email, password }: SignUpBody) => void
  useLogout: () => void
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

export const SessionContext = createContext<ContextValue | null>(null)

SessionContext.displayName = 'SessionContext'

function sessionReducer(state: State, action: Action) {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        isUserLoggedIn: true,
      }
    }
    case 'SIGNUP': {
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
    default: {
      return { ...state }
    }
  }
}

export const SessionProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState)

  const useLogin = useCallback(
    ({ email, password }: LoginBody) => {
      dispatch({ type: 'LOGIN' })
      return loginApi({ email, password })
    },
    [dispatch, loginApi]
  )

  const useSignup = useCallback(
    ({ name, email, password }: SignUpBody) => {
      dispatch({ type: 'SIGNUP' })
      return signUpApi({ name, email, password })
    },
    [dispatch, signUpApi]
  )

  const useLogout = useCallback(() => dispatch({ type: 'LOGOUT' }), [dispatch])

  const value: ContextValue = useMemo(
    () => ({
      ...state,
      useLogin,
      useLogout,
      useSignup,
    }),
    [state]
  )

  return <SessionContext.Provider value={value} {...props} />
}

export const useSession = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error(`useSession must be used within a SessionProvider`)
  }

  return context
}

export const ManagedSessionContext: FC<{ children?: ReactNode }> = ({
  children,
}) => <SessionProvider>{children}</SessionProvider>
