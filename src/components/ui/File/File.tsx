import React, {
  FC,
  InputHTMLAttributes,
  ChangeEvent,
  forwardRef,
  LegacyRef,
} from 'react'

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  ref?: any
}

const File: FC<Props> = forwardRef(
  (props, inputRef: LegacyRef<HTMLInputElement> | undefined) => {
    const { name, onChange = () => {}, ...rest } = props

    return (
      <input
        ref={inputRef}
        type="file"
        name={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e)
        }}
        {...rest}
      />
    )
  }
)
export default File
