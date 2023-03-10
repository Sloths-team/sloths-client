import { FC, useEffect, useRef, useState } from 'react'
import Input from '@components/ui/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import s from './ProfileView.module.css'
import { useRouter } from 'next/router'
import Textarea from '@components/ui/Textarea'
import { useSession } from '../../common/Layout/context'
import { GoMarkGithub } from 'react-icons/go'
import Button from '@components/ui/Button'

type Form = {
  email: string
  // profile_url: string
  nickname?: string
  github_nickname?: string
  // blog_url?: string
  // notion_email?: string
  bio?: string
  // phone?: string
}

const ProfileView: FC = () => {
  const schema = yup.object({
    email: yup.string(),
    // profile_url: yup.string(),
    nickname: yup.string(),
    github_nickname: yup.string(),
    // blog_url: yup.string(),
    // notion_email: yup.string(),
    bio: yup.string(),
    // phone: yup.string(),
  })

  const defaultValues = {
    email: '',
    // profile_url: '',
    nickname: '',
    github_nickname: '',
    // blog_url: '',
    // notion_email: '',
    bio: '',
    // phone: '',
  } as const

  const { user } = useSession()
  const {
    control,
    setFocus,
    watch,
    setError,
    formState: { isValid, errors },
    setValue,
  } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const [disabled, setDisabled] = useState(false)
  const router = useRouter()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const values = watch()
  const data = {
    nickname: user?.nickname || '',
    email: user?.email || '',
    github_nickname: user?.github_nickname || '',
  } as const

  useEffect(() => {
    if (user) {
      Object.keys(data).forEach((key) =>
        setValue(key as keyof typeof data, data[key as keyof typeof data])
      )
    }
  }, [user])

  useEffect(() => {
    const { target } = router.query
    if (target === 'github' && buttonRef.current) {
      buttonRef.current.focus()
    } else {
      setFocus('nickname')
    }
  }, [])

  useEffect(() => {
    const disabled = Object.keys(data).every(
      (key) => values[key as keyof typeof data] === ''
    )

    console.log('<<<', disabled)
    setDisabled(disabled)
  }, [values, setDisabled])

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1>내 프로필</h1>
      </div>
      <form onSubmit={() => {}} className={s.form}>
        <div className={s.form_inner}>
          <div className={s.left_section}>
            <label className={s.input_container}>
              <span className={s.label}>닉네임</span>
              <Input control={control} name="nickname" />
            </label>
            <label className={s.input_container}>
              <span className={s.label}>이메일</span>
              <Input control={control} name="email" />
            </label>
            <label className={s.input_container}>
              <span className={s.label}>소개</span>
              <Textarea
                control={control}
                name="bio"
                placeholder="자신을 소개해보세요."
              />
            </label>
            <label className={s.input_container}>
              <span className={s.label}>Github 계정</span>
              <button
                type="button"
                className={s.github}
                ref={buttonRef}
                onClick={() => {}}
              >
                <div className={s.icon}>
                  <GoMarkGithub />
                </div>
                <Input
                  control={control}
                  name="github_nickname"
                  placeholder="닉네임"
                />
              </button>
            </label>
          </div>
          <div className={s.right_section}>
            <label className={s.file_preview}>
              <Input type="file" control={control} name="media_url" />
            </label>
          </div>
        </div>
        <Button className={s.save} disabled={disabled}>
          저장하기
        </Button>
      </form>
    </div>
  )
}

export default ProfileView
