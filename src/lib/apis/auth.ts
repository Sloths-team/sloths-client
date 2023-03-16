import { login, LoginBody, signUp, SignUpBody, logout } from '@lib/repo/auth'
import { useMutation } from 'react-query'
import { QUERY_KEYS } from '../constants'

export const loginApi = () => {
  return useMutation([QUERY_KEYS.LOGIN], (body: LoginBody) => login(body))
}

export const signUpApi = () => {
  return useMutation([QUERY_KEYS.SIGNUP], (body: SignUpBody) => signUp(body))
}

export const logoutApi = () => {
  return useMutation([QUERY_KEYS.LOGOUT], logout)
}
