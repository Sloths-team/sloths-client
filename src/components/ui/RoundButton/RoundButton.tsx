import {
  ButtonHTMLAttributes,
  FC,
  JSXElementConstructor,
  forwardRef,
  useRef,
} from 'react'
import { mergeRefs } from 'react-merge-refs'
import s from './RoundButton.module.css'
import cn from 'clsx'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  colored?: boolean
  variant?: 'flat' | 'slim' | 'ghost' | 'naked'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
}

const Button: FC<Props> = forwardRef((props, buttonRef) => {
  const ref = useRef<typeof Component>(null)
  const {
    className,
    variant = 'flat',
    colored = false,
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props

  return (
    <Component
      className={cn(s.root, { [s.colored]: colored })}
      aria-pressed={active}
      ref={mergeRefs([ref, buttonRef])}
      disabled={disabled}
      style={{ width, ...style }}
      {...rest}
    >
      {children}
      {loading && <div>...</div>}
    </Component>
  )
})

export default Button
