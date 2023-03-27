import { AUTH_TOKEN_KEY, QUERY_KEYS } from '@lib/constants'
import useLocalStorage from '@lib/hooks/useLocalStorage'
import {
  createProject,
  getProjectById,
  createSection,
  getAllProjects,
} from '@lib/repo/project'
import { ID } from '@lib/types'
import { useMutation, useQuery } from 'react-query'

export const createProjectApi = () => {
  const { storage: token } = useLocalStorage(AUTH_TOKEN_KEY)

  return useMutation(
    [QUERY_KEYS.PROJECT, token],
    ({ params, formData }: { params: { id: ID }; formData: FormData }) =>
      createProject(params.id, formData, token)
  )
}

export const getAllProjectsApi = (portfolioId: string | number) => {
  return useQuery([QUERY_KEYS.PROJECT, portfolioId], () => {
    getAllProjects(portfolioId)
  })
}

export const getProjectByIdApi = (id: string | number) => {
  return useQuery([QUERY_KEYS.PROJECT, id], () => {
    getProjectById(id)
  })
}

export const createSectionApi = () => {
  const { storage: token } = useLocalStorage(AUTH_TOKEN_KEY)

  return useMutation(
    [QUERY_KEYS.PROJECT, token],
    ({ params, formData }: { params: { id: ID }; formData: FormData }) =>
      createSection(params.id, formData, token)
  )
}
