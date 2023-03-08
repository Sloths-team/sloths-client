import { useState, useEffect } from 'react'

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState('')

  const saveStorage = (value: string) => {
    localStorage.setItem(key, value)
  }

  const destroyStorage = () => {
    localStorage.removeItem(key)
  }

  useEffect(() => {
    const data = localStorage.getItem(key)
    if (data) setValue(data)
  }, [saveStorage])

  return { storage: value, saveStorage, destroyStorage }
}

export default useLocalStorage
