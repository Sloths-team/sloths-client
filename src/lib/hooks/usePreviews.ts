import { ChangeEvent, useState } from 'react'

export const usePreviews = (mode: 'stack' | 'oneOff' = 'oneOff') => {
  const [previews, setPreviews] = useState<(string | ArrayBuffer | null)[]>([])

  const handlePreviews = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ?? []

    Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
          })
      )
    ).then((res: any) => {
      setPreviews((prev) => (mode === 'stack' ? [...prev, ...res] : res))
    })
  }

  const resetPreviews = () => setPreviews([])

  return { previews, handlePreviews, resetPreviews }
}

export const useFixedPreviews = (
  files: File[],
  mode: 'stack' | 'oneOff' = 'oneOff'
) => {
  const [previews, setPreviews] = useState<(string | ArrayBuffer | null)[]>([])

  const handlePreviews = (e: ChangeEvent<HTMLInputElement>) => {
    Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
          })
      )
    ).then((res: any) => {
      setPreviews((prev) => (mode === 'stack' ? [...prev, ...res] : res))
    })
  }

  const resetPreviews = () => setPreviews([])

  return { previews, handlePreviews, resetPreviews }
}
