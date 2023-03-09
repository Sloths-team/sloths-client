import { FC, useEffect, useState } from 'react'
import Input from '@components/ui/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import s from './ProfileView.module.css'
import { useRouter } from 'next/router'
import Textarea from '@components/ui/Textarea'
import { useSession } from '../../common/Layout/context'
import { MdNotificationImportant } from 'react-icons/md'
import Link from 'next/link'

type Form = {
  name: string
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
    name: yup.string(),
    email: yup.string(),
    profile_url: yup.string(),
    nickname: yup.string(),
    github_nickname: yup.string(),
    blog_url: yup.string(),
    notion_email: yup.string(),
    bio: yup.string(),
    phone: yup.string(),
  })

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
    defaultValues: {
      name: '',
      email: '',
      profile_url: '',
      nickname: '',
      github_nickname: '',
      blog_url: '',
      notion_email: '',
      bio: '',
      phone: '',
    },
  })

  const { name } = watch()
  const [disabled, setDisabled] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setFocus('name')
  }, [])

  useEffect(() => {
    if (user) {
      const { nickname, email, github_nickname } = user
      setValue('email', email)
      setValue('nickname', nickname)
      setValue('github_nickname', github_nickname)
    }
  }, [user])

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1>내 프로필</h1>
      </div>
      <form onSubmit={() => {}} className={s.form}>
        <div className={s.left_section}>
          <label className={s.input_container}>
            <span className={s.label}>이름</span>
            <Input control={control} name="name" />
          </label>
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
            <Textarea control={control} name="bio" />
          </label>
          <label className={s.input_container}>
            <span className={s.label}>Github 레포명</span>
            {user?.github_nickname ? (
              <Input type="email" control={control} name="repo_url" />
            ) : (
              <button className={s.github}>
                <MdNotificationImportant />
                아직 깃헙 계정이 등록되어 있지 않습니다.{' '}
                <Link href={`/${user?.nickname}`}>등록하러 가기</Link>
              </button>
            )}
          </label>
        </div>
        <div className={s.right_section}>
          <label className={s.file_preview}>
            <Input type="file" control={control} name="media_url" />
          </label>
        </div>
      </form>
    </div>
  )
}

export default ProfileView
