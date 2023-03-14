import { useSession } from '@components/common/Layout/context'
import { QUERY_KEYS } from '@lib/constants'
import { getAllRepos } from '@lib/repo/github'
import { useQuery } from 'react-query'

export const getAllReposApi = () => {
  const { user } = useSession()

  return useQuery([QUERY_KEYS.GITHUB, user?.github_nickname], () =>
    user?.github_nickname ? getAllRepos(user?.github_nickname) : null
  )
}
