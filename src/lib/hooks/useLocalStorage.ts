import { useState, useEffect, useMemo } from 'react'

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState('')

  const saveStorage = (value: string) => {
    localStorage.setItem(key, value)
  }

  useEffect(() => {
    const data = localStorage.getItem(key)
    if (data) setValue(data)
  }, [saveStorage])

  return { storage: value, saveStorage }
}

export default useLocalStorage
