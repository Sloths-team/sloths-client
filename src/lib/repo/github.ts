import { fetcher, githubFetcher } from '@lib/queryClient'
import { useSession } from '../../components/common/Layout/context'

export const getAllRepos = async (githubNickname: string) => {
  return await githubFetcher({
    method: 'GET',
    path: `/users/${githubNickname}/repos`,
  })
}
