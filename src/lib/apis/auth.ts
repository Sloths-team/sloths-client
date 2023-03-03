import { login, LoginBody, signUp, SignUpBody } from '@lib/repo/auth'
import { useMutation } from 'react-query'
import { QueryKeys } from '../queryClient'

export const loginApi = ({ email, password }: LoginBody) => {
  return useMutation([QueryKeys.LOGIN], ({ email, password }: LoginBody) =>
    login({ email, password })
  )
}

export const signUpApi = ({ name, email, password }: SignUpBody) => {
  return useMutation(
    [QueryKeys.SIGNUP],
    ({ name, email, password }: SignUpBody) => signUp({ name, email, password })
  )
}
