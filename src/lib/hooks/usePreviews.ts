import { ChangeEvent, useCallback, useState } from 'react'

export const usePreviews = () => {
  const [previews, setPreviews] = useState<(string | ArrayBuffer | null)[]>([])

  const handlePreviews = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const files = e.target.files ?? []

    Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise((resolve, reject) => {
            reader.readAsDataURL(file)
            reader.onload = () => setPreviews([reader.result])
          })
      )
    )
  }

  return { previews, handlePreviews }
}
