import { useState, useEffect, useMemo } from 'react'

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState()
  const storage = JSON.stringify(value)

  const saveStorage = (value: string) => {
    localStorage.setItem(key, value)
  }

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem(key) ?? ''))
  }, [value])

  return { storage, saveStorage }
}

export default useLocalStorage
