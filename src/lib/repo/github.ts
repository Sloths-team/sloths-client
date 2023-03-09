import { fetcher } from '@lib/queryClient'
import { useSession } from '../../components/common/Layout/context'

export const getAllRepos = async () => {
  const { user } = useSession()

  return await fetcher({
    method: 'GET',
    path: `/users/${user?.github_nickname}/repos`,
  })
}
