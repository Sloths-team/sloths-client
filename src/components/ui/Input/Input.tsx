import React, { FC, InputHTMLAttributes, ChangeEvent } from 'react'
import { Control, Controller } from 'react-hook-form'

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  type?: 'email' | 'password' | 'number' | 'text'
  name: string
  control: Control<any>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<Props> = (props) => {
  const {
    id,
    type = 'text',
    value,
    name,
    control,
    onChange = () => {},
    ...rest
  } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          type={type}
          autoCorrect="true"
          autoCapitalize="off"
          spellCheck="false"
          {...field}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
