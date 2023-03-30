import RoundButton from '@components/ui/RoundButton'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useEffect, useReducer, useRef, useState } from 'react'
import s from './SettingsView.module.css'
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

const SettingsView: FC = () => {
  const router = useRouter()

  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <span className={s.label}>계정</span>
        <div className={s.flex_box}>
          <div className={cn(s.left, { [s.github]: true })}>
            <div className={s.icon}>
              <BsGithub />
            </div>
            <p>https://github.com/rovxxmjxx</p>
          </div>
          <div className={s.right}>
            <RoundButton onClick={() => router.push('/me/profile')}>
              깃헙계정 관리
            </RoundButton>
          </div>
        </div>
      </div>
      <div className={s.wrapper}>
        <span className={s.label}>프로필</span>
        <div className={s.flex_box}>
          <div className={s.left}>
            <h3>박미주</h3>
            <p>박미주의 포트폴리오입니다.</p>
          </div>
          <div className={s.right}>
            <div></div>
            <RoundButton colored onClick={() => router.push('/me/profile')}>
              프로필 편집
            </RoundButton>
          </div>
        </div>
      </div>
      <div className={s.wrapper}>
        <span className={s.label}>이메일</span>
        <div className={s.box}>
          <form>
            <ToggleInput
              title="이메일"
              defaultValue="miju3545@gmail.com"
              onSubmit={() => {}}
            />
          </form>
        </div>
      </div>
      <div className={s.wrapper}>
        <span className={s.label}>연락처</span>
        <div className={s.box}>
          <form>
            <ToggleInput
              title="문자"
              defaultValue="010-1234-5678"
              onSubmit={() => {}}
            />
          </form>
        </div>
      </div>
      <span id={s.secession} onClick={() => {}}>
        탈퇴하기
      </span>
    </div>
  )
}

export default SettingsView
