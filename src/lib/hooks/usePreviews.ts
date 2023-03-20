import { ChangeEvent, useCallback, useState } from 'react'

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
      if (mode === 'stack') {
        setPreviews((prev) => [...prev, ...res])
      } else {
        setPreviews(res)
      }
    })
  }

  return { previews, handlePreviews }
}
