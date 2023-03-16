import { QUERY_KEYS } from '@lib/constants'
import { createProject, ProjectBody } from '@lib/repo/project'
import { ID } from '@lib/types'
import { useMutation } from 'react-query'

export const createProjectApi = () => {
  return useMutation(
    [QUERY_KEYS.PROJECT],
    ({ params: portfolioId, body }: { params: ID; body: ProjectBody }) =>
      createProject(portfolioId, body)
  )
}
