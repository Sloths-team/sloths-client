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

const ProfileView: FC = () => {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [bio, setBio] = useState('')

  return (
    <div className={s.root}>
      <div className={s.header}>프로필 편집</div>
      <form>
        <div className={s.container}>
          <div className={s.wrapper}>
            <span className={s.label}>닉네임</span>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className={s.wrapper}>
            <span className={s.label}>소개</span>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
        </div>
        <div className={s.actions}>
          <RoundButton
            type="button"
            onClick={() => router.push('/me/settings')}
          >
            취소하기
          </RoundButton>
          <RoundButton type="button" onClick={() => {}} colored>
            저장하기
          </RoundButton>
        </div>
      </form>
    </div>
  )
}

export default ProfileView
