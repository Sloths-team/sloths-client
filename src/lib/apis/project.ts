import { QUERY_KEYS } from '@lib/constants'
import { createProject, ProjectBody } from '@lib/repo/project'
import { ID } from '@lib/types'
import { useMutation } from 'react-query'

export const createProjectApi = (portfolioId: ID) => {
  return useMutation(
    [QUERY_KEYS.PROJECT, portfolioId],
    ({ title, description, mediaUrl, repoUrl, root }: ProjectBody) =>
      createProject(portfolioId, {
        title,
        description,
        mediaUrl,
        repoUrl,
        root,
      })
  )
}
