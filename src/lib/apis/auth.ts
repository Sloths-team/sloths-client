import { login, LoginBody, signUp, SignUpBody } from '@lib/repo/auth'
import { useMutation } from 'react-query'
import { QueryKeys } from '../queryClient'

export const loginApi = () => {
  return useMutation([QueryKeys.LOGIN], ({ email, password }: LoginBody) =>
    login({ email, password })
  )
}

export const signUpApi = () => {
  return useMutation(
    [QueryKeys.SIGNUP],
    ({ name, email, password }: SignUpBody) => signUp({ name, email, password })
  )
}
