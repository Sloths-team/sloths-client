import React, { FC, TextareaHTMLAttributes, ChangeEvent } from 'react'
import { Control, Controller } from 'react-hook-form'

export type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  control: Control<any>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<Props> = (props) => {
  const { id, value, name, control, onChange = () => {}, ...rest } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <textarea
          autoCorrect="true"
          autoCapitalize="off"
          spellCheck="false"
          {...field}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            onChange(e)
            field.onChange(e.target.value)
          }}
          {...rest}
        />
      )}
    />
  )
}
export default Input
