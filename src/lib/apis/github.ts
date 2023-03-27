import { useSession } from '@components/common/Layout/context'
import { QUERY_KEYS } from '@lib/constants'
import { getAllRepos, getAllRepoContents } from '@lib/repo/github'
import { useQuery } from 'react-query'

export const getAllGithubReposApi = () => {
  const { user } = useSession()

  return useQuery([QUERY_KEYS.GITHUB, user?.github_nickname], () =>
    user?.github_nickname ? getAllRepos(user?.github_nickname) : null
  )
}

export const getRepoAllContentsApi = ({
  repo,
  path,
  branchName,
}: {
  repo: string
  path: string
  branchName: string
}) => {
  const { user } = useSession()

  return useQuery([QUERY_KEYS.GITHUB, user?.github_nickname], () =>
    user?.github_nickname
      ? getAllRepoContents(user?.github_nickname, repo, path, branchName)
      : null
  )
}
