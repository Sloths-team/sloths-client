import { login, LoginBody, signUp, SignUpBody, logout } from '@lib/repo/auth'
import { useMutation } from 'react-query'
import { QUERY_KEYS } from '../constants'

export const loginApi = () => {
  return useMutation([QUERY_KEYS.LOGIN], ({ email, password }: LoginBody) =>
    login({ email, password })
  )
}

export const signUpApi = () => {
  return useMutation(
    [QUERY_KEYS.SIGNUP],
    ({ nickname, email, password }: SignUpBody) =>
      signUp({ nickname, email, password })
  )
}

export const logoutApi = () => {
  return useMutation([QUERY_KEYS.LOGOUT], () => logout())
}
