import { ChangeEvent, useEffect, useState } from 'react'

type Values = { [key: string]: File[] }

const useFiles = (mode: 'stack' | 'oneOff' = 'oneOff') => {
  const [files, setFiles] = useState<Values>({})
  const [previews, setPreviews] = useState<(string | ArrayBuffer | null)[]>([])

  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles((prev) => {
      return {
        ...prev,
        [e.target.name]: [
          ...(prev[e.target.name] || []),
          ...Array.from(e.target.files || []),
        ],
      }
    })
  }

  const handlePreviews = (files: FileList | File[] | []) => {
    return Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
          })
      )
    )
  }

  const formatFormData = () => {
    const formData = new FormData()

    Object.keys(files).forEach((key) => {
      const _files = files[key] || []
      Array.from(_files).forEach((file) => formData.append(key, file))
    })

    return formData
  }

  const onDeleteFile = (name: string, index: number) => {
    let result

    setFiles((prev) => {
      const files = prev[name]
      result = files.filter((_, i) => i !== index)

      return { ...prev, [name]: result }
    })
  }

  useEffect(() => {
    Object.keys(files).forEach((key) => {
      handlePreviews(files[key] || []).then((res: any) => {
        setPreviews(res)
      })
    })
  }, [files])
  return { files, previews, onChangeFiles, formatFormData, onDeleteFile }
}

export default useFiles

export const formatFormData = (values: Values = {}) => {
  const formData = new FormData()

  Object.keys(values).forEach((key) => {
    const files = values[key] || []
    Array.from(files).forEach((file) => formData.append(key, file))
  })

  return formData
}
