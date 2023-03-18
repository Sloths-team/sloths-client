import { fetcher, MultipartFormData } from '@lib/queryClient'
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

export const getUserByNickname = async (nickname: string, token: string) => {
  return await fetcher({
    method: 'GET',
    path: `/api/users/${nickname}`,
    token,
  })
}

export const updateProfile = async (
  userId: ID,
  formData: FormData,
  token: string
) => {
  return await fetcher({
    method: 'PUT',
    path: `/api/users/${userId}`,
    body: formData,
    token,
    contentType: 'multipart/form-data',
  })
}
