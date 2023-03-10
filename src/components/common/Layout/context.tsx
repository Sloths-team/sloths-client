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
import { AUTH_TOKEN_KEY } from '../../../lib/constants'
import { getLoggedInUserApi, getUserApi } from '../../../lib/apis/user'

type User = {
  id: number
  email: string
  nickname: string
  github_nickname: string
}

export type State = {
  isUserLoggedIn: boolean
  user: User | null
}

export type ContextValue = State & {
  login: () => UseMutationResult<any, unknown, LoginBody, unknown>
  signup: () => UseMutationResult<any, unknown, SignUpBody, unknown>
  logout: () => void
}

const initialState: State = {
  isUserLoggedIn: false,
  user: null,
}

type Action =
  | {
      type: 'SET'
      user: User
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
        user: action.user,
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
        user: null,
      }
    }
    default: {
      return { ...state }
    }
  }
}

export const SessionProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState)
  const { storage, saveStorage, destroyStorage } =
    useLocalStorage(AUTH_TOKEN_KEY)

  const { data } = getUserApi()

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

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
    destroyStorage()
  }, [dispatch])

  const set = useCallback(
    (user: User) => dispatch({ type: 'SET', user }),
    [dispatch]
  )

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
    if (document.cookie) {
      const cookie = getCookie(AUTH_TOKEN_KEY)
      saveStorage(cookie)
      deleteCookie(AUTH_TOKEN_KEY)
    }
  }, [])

  // useEffect(() => {
  //   if (storage) set(data?.result)
  // }, [storage])

  useEffect(() => {
    if (data?.result) {
      set(data.result)
    }

    if (storage) set(data?.result)
  }, [data])

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
