import { ChangeEvent, useState } from 'react'

type Values = { [key: string]: File[] }

const useFiles = () => {
  const [_values, setValues] = useState<Values>({})
  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => {
      const exist = prev[e.target.name]
      return {
        ...prev,
        [e.target.name]: [
          ...(prev[e.target.name] || []),
          ...Array.from(e.target.files || []),
        ],
      }
    })
  }

  return { files: _values, onChangeFiles }
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
