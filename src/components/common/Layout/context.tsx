import React, {
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from 'react'
import { LoginBody, SignUpBody } from '@lib/repo/auth'
import { loginApi, signUpApi } from '../../../lib/apis/auth'
import { UseMutationResult } from 'react-query'
import useLocalStorage from '@lib/hooks/useLocalStorage'
import { getCookie, deleteCookie } from '../../../lib/cookie'

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
      type: 'SET'
    }
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
    case 'SET': {
      return {
        ...state,
        isUserLoggedIn: true,
      }
    }
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
  const { storage, saveStorage } = useLocalStorage('authorization')
  const login = useCallback((): UseMutationResult<
    any,
    unknown,
    LoginBody,
    unknown
  > => {
    return loginApi()
  }, [dispatch])

  const signup = useCallback((): UseMutationResult<
    any,
    unknown,
    SignUpBody,
    unknown
  > => {
    return signUpApi()
  }, [dispatch])

  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), [dispatch])
  const set = useCallback(() => dispatch({ type: 'SET' }), [dispatch])

  const value: ContextValue = useMemo(
    () => ({
      ...state,
      login,
      logout,
      signup,
    }),
    [state]
  )

  useEffect(() => {
    if (storage) {
      set()
    } else if (document.cookie) {
      const cookie = getCookie('authorization')
      saveStorage(cookie)
      set()

      deleteCookie('authorization')
    }
  }, [storage])

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
