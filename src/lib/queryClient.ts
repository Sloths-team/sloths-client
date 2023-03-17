import { QueryClient } from 'react-query'
import { AnyOBJ } from './types'
import { BASE_API_URL, GITHUB_BASE_API_URL } from './constants'

export const getClient = (() => {
  let client: QueryClient | null = null

  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            // refetchOnMount: false,
            // refetchOnReconnect: false,
            // refetchOnWindowFocus: false,
          },
        },
      })

    return client
  }
})()

type Options = RequestInit & {
  headers: HeadersInit & {
    Authorization?: string
  }
}

export const fetcher = async ({
  method,
  path,
  body,
  params,
  token,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path?: string
  body?: AnyOBJ
  params?: AnyOBJ
  token?: string
}) => {
  let url = `${BASE_API_URL}${path}`

  const options: Options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': BASE_API_URL,
    },
  }

  if (token) options.headers.Authorization = `Bearer ${token}`

  if (params) {
    const searchParams = new URLSearchParams(params)
    url += '?' + searchParams.toString()
  }

  if (body) options.body = JSON.stringify(body)

  try {
    const res = await fetch(url, options)
    const json = await res.json()
    return json
  } catch (error) {
    console.error(error)
  }
}

export const githubFetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: 'GET'
  path?: string
  body?: AnyOBJ
  params?: AnyOBJ
}) => {
  let url = `${GITHUB_BASE_API_URL}${path}`

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (params) {
    const searchParams = new URLSearchParams(params)
    url += '?' + searchParams.toString()
  }

  if (body) options.body = JSON.stringify(body)

  try {
    const res = await fetch(url, options)
    const json = await res.json()
    return json
  } catch (error) {
    console.error(error)
    return error
  }
}
