import { fetcher, githubFetcher } from '@lib/queryClient'
import { useSession } from '../../components/common/Layout/context'

export const getAllRepos = async (githubNickname: string) => {
  return await githubFetcher({
    method: 'GET',
    path: `/users/${githubNickname}/repos`,
  })
}

export const getAllRepoContents = async (
  username: string,
  repo: string,
  path: string,
  branchName: string
) => {
  return await githubFetcher({
    method: 'GET',
    path: `repos/${username}/${repo}/contents/${path}?ref=${branchName}`,
  })
}
