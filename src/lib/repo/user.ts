import { fetcher } from '@lib/queryClient'
import { ID } from '@lib/types'
import useLocalStorage from '../hooks/useLocalStorage'
import { AUTH_TOKEN_KEY } from '../constants'

export const getUser = async (token: string) => {
  return await fetcher({
    method: 'GET',
    path: '/api/users',
    token,
  })
}

export const getUserById = async (userId: ID) => {
  return await fetcher({
    method: 'GET',
    path: `/api/users/${userId}`,
  })
}
