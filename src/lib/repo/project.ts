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

export const createProject = async (
  portfolioId: ID,
  formData: FormData,
  token: string
) => {
  return await fetcher({
    method: 'POST',
    path: `/api/projects`,
    params: { pfid: portfolioId },
    body: formData,
    token,
    contentType: 'multipart/form-data',
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

export const createSection = async (
  projectId: ID,
  formData: FormData,
  token: string
) => {
  return await fetcher({
    method: 'POST',
    path: `/api/sections`,
    params: { pjid: projectId },
    body: formData,
    token,
    contentType: 'multipart/form-data',
  })
}

export const updateSection = async (
  projectId: ID,
  formData: FormData,
  token: string
) => {
  return await fetcher({
    method: 'PUT',
    path: `/api/sections`,
    params: { pjid: projectId },
    body: formData,
    token,
    contentType: 'multipart/form-data',
  })
}

export const deleteSection = async (projectId: ID, token: string) => {
  return await fetcher({
    method: 'DELETE',
    path: `/api/sections`,
    params: { pjid: projectId },
    token,
  })
}
