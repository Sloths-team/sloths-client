import { ChangeEvent, useState } from 'react'

type Values = { [key: string]: FileList | null }

const useFiles = () => {
  const [values, setValues] = useState<Values>({})
  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.files }))
  }

  const formatFormData = () => {
    const formData = new FormData()

    Object.keys(values).forEach((key) => {
      const files = values[key] || []
      Array.from(files).forEach((file) => formData.append(key, file))
    })

    return formData
  }

  return { files: values, onChangeFiles, formatFormData }
}

export default useFiles
