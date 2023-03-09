import { QUERY_KEYS } from '@lib/constants'
import { getUser, getUserById } from '@lib/repo/user'
import { useQuery } from 'react-query'
import { ID } from '@lib/types'
import useLocalStorage from '../hooks/useLocalStorage'
import { AUTH_TOKEN_KEY } from '../constants'

export const getUserApi = () => {
  const {storage: token} = useLocalStorage(AUTH_TOKEN_KEY)

  return useQuery([QUERY_KEYS.USER, token], () => (token ? getUser(token) : null))
}

export const getUserByIdApi = (id: ID) => {
  return useQuery([QUERY_KEYS.USER, id], () => getUserById(id))
}
