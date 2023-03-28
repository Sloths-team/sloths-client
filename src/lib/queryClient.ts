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
  body?: BodyInit & any
}

export type MultipartFormData = 'multipart/form-data'
export type ContentType = 'multipart/form-data' | 'application/json'

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
    },
  }

  if (token) options.headers.Authorization = `Bearer ${token}`

  if (params) {
    const searchParams = new URLSearchParams(params)
    url += '?' + searchParams.toString()
  }

  if (body) options.body = body

  try {
    const res = await fetch(url, options)
    const json = await res.json()
    return json
  } catch (error) {
    console.error('🚨', error)
  }
}

export const multerFetcher = async ({
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
    headers: {},
  }

  if (token) options.headers.Authorization = `Bearer ${token}`

  if (params) {
    const searchParams = new URLSearchParams(params)
    url += '?' + searchParams.toString()
  }

  if (body) options.body = body

  try {
    const res = await fetch(url, options)
    const json = await res.json()
    return json
  } catch (error) {
    console.error('🚨', error)
  }
}

export const githubFetcher = async ({
  method,
  path,
  params,
}: {
  method: 'GET'
  path?: string
  params?: AnyOBJ
}) => {
  let url = `${GITHUB_BASE_API_URL}${path}`

  const options: RequestInit = {
    method,
  }

  if (params) {
    const searchParams = new URLSearchParams(params)
    url += '?' + searchParams.toString()
  }

  try {
    const res = await fetch(url, options)
    const json = await res.json()
    return json
  } catch (error) {
    console.error('🚨', error)
    return error
  }
}
