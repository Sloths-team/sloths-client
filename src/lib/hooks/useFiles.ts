import { ChangeEvent, useEffect, useState } from 'react'

type Values = { [key: string]: any }

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

  const onDeleteFile = (name: string, index: number) => {
    setFiles((prev) => {
      const files = prev[name]
      const result = files.filter((_, i) => i !== index)

      return { ...prev, [name]: result }
    })
  }

  const updateFiles = (name: string, files: File[] | []) => {
    setFiles((prev) => ({ ...prev, [name]: files }))
  }

  useEffect(() => {
    Object.keys(files).forEach((key) => {
      handlePreviews(files[key] || []).then((res: any) => {
        setPreviews(res)
      })
    })
  }, [files])
  return {
    files,
    previews,
    onChangeFiles,
    onDeleteFile,
    updateFiles,
  }
}

export default useFiles

export const formatFormData = (values: Values = {}) => {
  const formData = new FormData()

  Object.keys(values).forEach((key) => {
    const vals = values[key]

    if (Array.isArray(vals)) {
      vals.forEach((val) => formData.append(key, val))
    } else {
      formData.append(key, vals)
    }
  })

  return formData
}
