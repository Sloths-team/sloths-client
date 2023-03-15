import { fetcher } from '@lib/queryClient'
import { ID } from '@lib/types'

export type ProjectBody = {
  title: string
  description: string
  mediaUrl: string
  repoUrl: string
  root: number | null
}

export const getAllProjects = async (portfolioId: ID) => {
  return await fetcher({
    method: 'GET',
    path: `/api/portfolios/${portfolioId}/projects`,
  })
}

export const getProjectById = async (portfolioId: ID, projectId: ID) => {
  return await fetcher({
    method: 'GET',
    path: `/api/portfolios/${portfolioId}/projects/${projectId}`,
  })
}

export const createProject = async (portfolioId: ID, body: ProjectBody) => {
  return await fetcher({
    method: 'POST',
    path: `/api/portfolios/${portfolioId}/projects`,
    body,
  })
}

export const updateProject = async (
  portfolioId: ID,
  projectId: ID,
  body: ProjectBody
) => {
  return await fetcher({
    method: 'POST',
    path: `/api/portfolios/${portfolioId}/projects/${projectId}`,
    body,
  })
}

export const deleteProject = async (portfolioId: ID, projectId: ID) => {
  return await fetcher({
    method: 'DELETE',
    path: `/api/portfolios/${portfolioId}/projects/${projectId}`,
  })
}

export const getAllSections = async (portfolioId: ID, projectId: ID) => {
  return await fetcher({
    method: 'DELETE',
    path: `/api/portfolios/${portfolioId}/projects/${projectId}`,
  })
}
