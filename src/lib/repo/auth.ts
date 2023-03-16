import { fetcher } from '@lib/queryClient'

export type SignUpBody = {
  nickname: string
  email: string
  password: string
}
export type LoginBody = Pick<SignUpBody, 'email' | 'password'>

export const signUp = async (body: SignUpBody) => {
  return await fetcher({
    method: 'POST',
    path: '/api/auth/signup',
    body,
  })
}

export const login = async (body: LoginBody) => {
  return await fetcher({
    method: 'POST',
    path: '/api/auth/login',
    body: body,
  })
}

export const logout = async () => {
  return await fetcher({
    method: 'POST',
    path: '/api/auth/logout',
  })
}
