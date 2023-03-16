import { fetcher } from '@lib/queryClient'
import { ID } from '@lib/types'

export type PortfolioBody = {
  title: string
  description: string
}

export const getAllPortfolios = async () => {
  return await fetcher({
    method: 'GET',
    path: `/api/portfolios`,
  })
}

export const getPortfolioById = async (portfolioId: ID) => {
  return await fetcher({
    method: 'GET',
    path: `/api/portfolios/${portfolioId}`,
  })
}

export const updatePortfolioById = async (
  portfolioId: ID,
  body: PortfolioBody
) => {
  return await fetcher({
    method: 'PUT',
    path: `/api/portfolios/${portfolioId}`,
    body,
  })
}

export const deletePortfolioById = async (portfolioId: ID) => {
  return await fetcher({
    method: 'DELETE',
    path: `/api/portfolios/${portfolioId}`,
  })
}
