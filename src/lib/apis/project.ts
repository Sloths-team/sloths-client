import { AUTH_TOKEN_KEY, QUERY_KEYS } from '@lib/constants'
import useLocalStorage from '@lib/hooks/useLocalStorage'
import { createProject, ProjectBody } from '@lib/repo/project'
import { ID } from '@lib/types'
import { useMutation } from 'react-query'

export const createProjectApi = () => {
  const { storage: token } = useLocalStorage(AUTH_TOKEN_KEY)

  return useMutation(
    [QUERY_KEYS.PROJECT, token],
    ({ params, body }: { params: { id: ID }; body: ProjectBody }) =>
      createProject(params.id, body, token)
  )
}
