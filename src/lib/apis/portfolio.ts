import { QUERY_KEYS } from '@lib/constants'
import { fetcher } from '@lib/queryClient'
import {
  getAllPortfolios,
  getPortfolioById,
  PortfolioBody,
  updatePortfolioById,
} from '@lib/repo/portfolio'
import { ID } from '@lib/types'
import { useQuery, useMutation } from 'react-query'

export const getAllPortfoliosApi = async () => {
  return useQuery([QUERY_KEYS.PORTFOLIO], getAllPortfolios)
}

export const getPortfolioByIdApi = async (portfolioId: ID) => {
  return useQuery([QUERY_KEYS.PORTFOLIO, portfolioId], () =>
    getPortfolioById(portfolioId)
  )
}

export const updatePortfolioByIdApi = async () => {
  return useMutation(
    [QUERY_KEYS.PROJECT],
    ({ params, body }: { params: ID; body: PortfolioBody }) =>
      updatePortfolioById(params, body)
  )
}

export const deletePortfolioById = async (portfolioId: ID) => {
  return await fetcher({
    method: 'DELETE',
    path: `/api/portfolios/${portfolioId}`,
  })
}
