import { useState, useEffect } from 'react'

const useLocalStorage = (
  key: string,
  defaultValue: string | undefined = ''
) => {
  const [value, setValue] = useState('')

  const saveStorage = (value: string) => {
    localStorage.setItem(key, value)
  }

  const destroyStorage = () => {
    localStorage.removeItem(key)
  }

  useEffect(() => {
    const data = localStorage.getItem(key)
    setValue(data || defaultValue)
  }, [saveStorage])

  return { storage: value, saveStorage, destroyStorage }
}

export default useLocalStorage
