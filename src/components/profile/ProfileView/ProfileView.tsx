import { FC, useEffect, useMemo, useRef, useState } from 'react'
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
import { getUserApi } from '@lib/apis/user'
import { SiNotion } from 'react-icons/si'
import { SlNote } from 'react-icons/sl'
import { HiOutlinePhone } from 'react-icons/hi'

type Form = {
  email: string
  profile_url: string
  nickname?: string
  github_nickname?: string
  blog_url?: string
  notion_email?: string
  bio?: string
  phone?: string
}

const ProfileView: FC = () => {
  const schema = yup.object({
    email: yup.string(),
    profile_url: yup.string(),
    nickname: yup.string(),
    github_nickname: yup.string(),
    blog_url: yup.string(),
    notion_email: yup.string(),
    bio: yup.string(),
    phone: yup.string(),
  })

  const defaultValues = {
    email: '',
    profile_url: '',
    nickname: '',
    github_nickname: '',
    blog_url: '',
    notion_email: '',
    bio: '',
    phone: '',
  } as const

  const { data } = getUserApi()
  const user = useMemo(() => {
    const {
      profileUrl: profile_url,
      githubNickname: github_nickname,
      blogUrl: blog_url,
      notionEmail: notion_email,
      bio,
      phone,
      regisToken,
      ...rest
    } = data?.result || {}

    return {
      profile_url: profile_url || '',
      github_nickname: github_nickname || '',
      blog_url: blog_url || '',
      notion_email: notion_email || '',
      bio: bio || '',
      phone: phone || '',
      ...rest,
    }
  }, [data?.result])

  const { control, setFocus, watch, setValue, handleSubmit } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const [disabled, setDisabled] = useState(false)
  const router = useRouter()
  const githubRef = useRef<HTMLButtonElement>(null)
  const values = watch()

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) =>
        setValue(
          key as keyof typeof defaultValues,
          user[key as keyof typeof defaultValues]
        )
      )
    }
  }, [user])

  useEffect(() => {
    const { target } = router.query
    if (target === 'github' && githubRef.current) {
      githubRef.current.focus()
    } else {
      setFocus('nickname')
    }
  }, [])

  useEffect(() => {
    if (user) {
      const disabled = Object.keys(values).every(
        (key) => values[key as keyof typeof defaultValues] === ''
      )

      setDisabled(disabled)
    }
  }, [setDisabled, user])

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1>내 프로필</h1>
      </div>
      <form onSubmit={handleSubmit(() => {})} className={s.form}>
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
                ref={githubRef}
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
            <label className={s.input_container}>
              <span className={s.label}>블로그 주소</span>
              <button type="button" className={s.github} onClick={() => {}}>
                <div className={s.icon}>
                  <SlNote />
                </div>
                <Input control={control} name="blog_url" />
              </button>
            </label>
            <label className={s.input_container}>
              <span className={s.label}>Notion 이메일</span>
              <button type="button" className={s.github} onClick={() => {}}>
                <div className={s.icon}>
                  <SiNotion />
                </div>
                <Input control={control} name="notion_email" />
              </button>
            </label>
            <label className={s.input_container}>
              <span className={s.label}>전화번호</span>
              <button type="button" className={s.github} onClick={() => {}}>
                <div className={s.icon}>
                  <HiOutlinePhone />
                </div>
                <Input control={control} name="phone" />
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
