import { QUERY_KEYS } from '@lib/constants'
import { createProject, ProjectBody } from '@lib/repo/project'
import { ID } from '@lib/types'
import { useMutation } from 'react-query'

export const createProjectApi = () => {
  return useMutation(
    [QUERY_KEYS.PROJECT],
    ({ params, body }: { params: { id: ID }; body: ProjectBody }) =>
      createProject(params.id, body)
  )
}
