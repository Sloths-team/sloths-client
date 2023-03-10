import { fetcher } from '@lib/queryClient'

export type SignUpBody = {
  nickname: string
  email: string
  password: string
}
export type LoginBody = Pick<SignUpBody, 'email' | 'password'>

export const signUp = async ({ nickname, email, password }: SignUpBody) => {
  return await fetcher({
    method: 'POST',
    path: '/api/auth/signup',
    body: { nickname, email, password },
  })
}

export const login = async ({ email, password }: LoginBody) => {
  return await fetcher({
    method: 'POST',
    path: '/api/auth/login',
    body: { email, password },
  })
}

export const logout = async () => {
  return await fetcher({
    method: 'POST',
    path: '/api/auth/logout',
  })
}
