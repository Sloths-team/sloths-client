import { fetcher } from '@lib/queryClient'

export const getUser = async () => {
  return await fetcher({
    method: 'GET',
    path: '/api/user',
  })
}
