export const getCookie = (name: string) => {
  const cookie = document.cookie.split(name + '=')[1]
  return cookie
}

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
}
