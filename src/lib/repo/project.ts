import { fetcher, multerFetcher } from '@lib/queryClient'
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
    path: `/api/projects`,
    params: { pfid: portfolioId },
  })
}

export const getProjectById = async (id: ID) => {
  return await fetcher({
    method: 'GET',
    path: `/api/projects/${id}`,
  })
}

export const createProject = async (
  portfolioId: ID,
  formData: FormData,
  token: string
) => {
  return await multerFetcher({
    method: 'POST',
    path: `/api/projects`,
    params: { pfid: portfolioId },
    body: formData,
    token,
  })
}

export const updateProject = async (
  portfolioId: ID,
  projectId: ID,
  formData: FormData,
  token: string
) => {
  return await multerFetcher({
    method: 'PUT',
    path: `/api/projects/${projectId}`,
    params: { pfid: portfolioId },
    body: formData,
    token,
  })
}

export const deleteProject = async (
  portfolioId: ID,
  projectId: ID,
  token: string
) => {
  return await multerFetcher({
    method: 'DELETE',
    path: `/api/projects/${projectId}`,
    params: { pfid: portfolioId },
    token,
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
  return await multerFetcher({
    method: 'POST',
    path: `/api/sections`,
    params: { pjid: projectId },
    body: formData,
    token,
  })
}

export const updateSection = async (
  projectId: ID,
  formData: FormData,
  token: string
) => {
  return await multerFetcher({
    method: 'PUT',
    path: `/api/sections`,
    params: { pjid: projectId },
    body: formData,
    token,
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
