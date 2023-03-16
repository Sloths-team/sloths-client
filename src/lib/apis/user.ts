import { QUERY_KEYS } from '@lib/constants'
import {
  getLoggedInUser,
  getUser,
  getUserById,
  getUserByNickname,
} from '@lib/repo/user'
import { useQuery } from 'react-query'
import { ID } from '@lib/types'
import useLocalStorage from '../hooks/useLocalStorage'
import { AUTH_TOKEN_KEY } from '../constants'

export const getLoggedInUserApi = () => {
  const { storage: token } = useLocalStorage(AUTH_TOKEN_KEY)

  return useQuery([QUERY_KEYS.LOGGEDIN_USER, token], () =>
    token ? getLoggedInUser(token) : null
  )
}
export const getUserApi = () => {
  const { storage: token } = useLocalStorage(AUTH_TOKEN_KEY)

  return useQuery([QUERY_KEYS.USER, token], () =>
    token ? getUser(token) : null
  )
}

export const getUserByIdApi = (id: ID) => {
  const { storage: token } = useLocalStorage(AUTH_TOKEN_KEY)

  return useQuery([QUERY_KEYS.USER, id], () => getUserById(id, token))
}
