import { fetcher } from '@lib/queryClient'
import { ID } from '@lib/types'

export const getLoggedInUser = async (token: string) => {
  return await fetcher({
    method: 'GET',
    path: '/api/users/me',
    token,
  })
}

export const getUser = async (token: string) => {
  return await fetcher({
    method: 'GET',
    path: '/api/users',
    token,
  })
}

export const getUserById = async (userId: ID, token: string) => {
  return await fetcher({
    method: 'GET',
    path: `/api/users/${userId}`,
    token,
  })
}
