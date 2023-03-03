import { useState, useEffect, useMemo } from 'react'

const useLocalStorage = (key: string) => {
  const [_value, setValue] = useState()
  const value = useMemo(() => localStorage.getItem(key), [])
  const storage = JSON.stringify(value)

  const saveStorage = (key: string, value: string) => {
    localStorage.setItem(key, value)
  }

  useEffect(() => {
    setValue(JSON.parse(value ?? ''))
  }, [value])
  return { storage, saveStorage }
}

export default useLocalStorage
