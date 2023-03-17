import { QUERY_KEYS } from '@lib/constants'
import { fetcher } from '@lib/queryClient'
import {
  getAllPortfolios,
  getPortfolioById,
  PortfolioBody,
  updatePortfolioById,
  deletePortfolioById,
} from '@lib/repo/portfolio'
import { ID } from '@lib/types'
import { useQuery, useMutation } from 'react-query'

export const getAllPortfoliosApi = () => {
  return useQuery([QUERY_KEYS.PORTFOLIO], getAllPortfolios)
}

export const getPortfolioByIdApi = (portfolioId: ID) => {
  return useQuery([QUERY_KEYS.PORTFOLIO, portfolioId], () =>
    getPortfolioById(portfolioId)
  )
}

export const updatePortfolioByIdApi = () => {
  return useMutation(
    [QUERY_KEYS.PROJECT],
    ({ params, body }: { params: { id: ID }; body: PortfolioBody }) =>
      updatePortfolioById(params.id, body)
  )
}

export const deletePortfolioByIdApi = () => {
  return useMutation([QUERY_KEYS.PROJECT], (portfolioId: ID) =>
    deletePortfolioById(portfolioId)
  )
}
