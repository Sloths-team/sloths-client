import { fetcher } from '@lib/queryClient'

export type LoginBody = {
  email: string
  password: string
}

export type SignUpBody = {
  name: string
  email: string
  password: string
}

export const login = async ({ email, password }: LoginBody) => {
  return await fetcher({
    method: 'POST',
    path: '/api/auth/login',
    body: { email, password },
  })
}

export const signUp = async ({ name, email, password }: SignUpBody) => {
  return await fetcher({
    method: 'POST',
    path: '/api/auth/signup',
    body: { name, email, password },
  })
}

export const logout = async () => {
  return await fetcher({
    method: 'POST',
    path: '/api/auth/logout',
  })
}
