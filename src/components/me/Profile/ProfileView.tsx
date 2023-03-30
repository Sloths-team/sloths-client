import RoundButton from '@components/ui/RoundButton'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useEffect, useReducer, useRef, useState } from 'react'
import s from './ProfileView.module.css'
import { BsGithub } from 'react-icons/bs'
import cn from 'clsx'

const useInput = (
  defaultValue: string
): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState(defaultValue)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return [value, onChange]
}

const ToggleInput = ({
  title,
  defaultValue,
  onSubmit,
}: {
  title: string
  defaultValue: string
  onSubmit: () => void
}) => {
  const ref = useRef<HTMLInputElement>(null)
  const [value, onChange] = useInput(defaultValue)
  const [disabled, toggleDisabled] = useReducer((p) => !p, true)

  useEffect(() => {
    ref?.current?.focus()
  }, [ref])

  return (
    <div className={s.toggle}>
      <input ref={ref} value={value} onChange={onChange} disabled={disabled} />
      <div className={s.actions}>
        {disabled && <RoundButton onClick={toggleDisabled}>변경</RoundButton>}
        {!disabled && (
          <>
            <RoundButton onClick={toggleDisabled}>취소</RoundButton>
            <RoundButton onClick={onSubmit} colored>
              인증 {title}보내기
            </RoundButton>
          </>
        )}
      </div>
    </div>
  )
}

const ProfileView: FC = () => {
  const router = useRouter()

  return (
    <div className={s.root}>
      <div className={s.header}>프로필 편집</div>
      <form>
        <div className={s.container}>
          <div className={s.wrapper}>
            <span className={s.label}>닉네임</span>
            <input />
          </div>
          <div className={s.wrapper}>
            <span className={s.label}>소개</span>
            <textarea />
          </div>
        </div>
        <div className={s.actions}>
          <RoundButton>취소하기</RoundButton>
          <RoundButton colored>저장하기</RoundButton>
        </div>
      </form>
    </div>
  )
}

export default ProfileView
