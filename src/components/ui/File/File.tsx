import React, { FC, InputHTMLAttributes, ChangeEvent } from 'react'
import { Control, Controller } from 'react-hook-form'

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const FileInput: FC<Props> = (props) => {
  const { name, onChange = () => {}, ...rest } = props

  return (
    <input
      type="file"
      name={name}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChange(e)
      }}
      {...rest}
    />
  )
}
export default FileInput
