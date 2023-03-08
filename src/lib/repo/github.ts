import { fetcher } from '@lib/queryClient'

export const getAllRepos = async () => {
  return await fetcher({
    method: 'GET',
    path: '/',
    body: {},
  })
}
