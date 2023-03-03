import { useState, useEffect } from 'react'

const useLocalStorage = (key: string) => {
  const [_value, setValue] = useState()
  const storage = JSON.stringify(_value)

  const saveStorage = (key: string, value: string) => {
    localStorage.setItem(key, value)
  }

  useEffect(() => {
    const data = localStorage.getItem(key) ?? ''
    setValue(JSON.parse(data))
  }, [])
  return { storage, saveStorage }
}

export default useLocalStorage
