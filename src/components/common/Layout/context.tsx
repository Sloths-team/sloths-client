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
import { UseMutationResult } from 'react-query'

export type State = {
  isUserLoggedIn: boolean
}

export type ContextValue = State & {
  login: () => UseMutationResult<any, unknown, LoginBody, unknown>
  signup: () => UseMutationResult<any, unknown, SignUpBody, unknown>
  logout: () => void
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

  const login = useCallback((): UseMutationResult<
    any,
    unknown,
    LoginBody,
    unknown
  > => {
    // dispatch({ type: 'LOGIN' })
    return loginApi()
  }, [dispatch])

  const signup = useCallback((): UseMutationResult<
    any,
    unknown,
    SignUpBody,
    unknown
  > => {
    // dispatch({ type: 'SIGNUP' })
    return signUpApi()
  }, [dispatch])

  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), [dispatch])

  const value: ContextValue = useMemo(
    () => ({
      ...state,
      login,
      logout,
      signup,
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
