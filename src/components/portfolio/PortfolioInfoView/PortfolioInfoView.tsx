import { FC, useEffect, useMemo, useRef, useState } from 'react'
import Input from '@components/ui/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import s from './PortfolioInfoView.module.css'
import { useRouter } from 'next/router'
import Textarea from '@components/ui/Textarea'
import Button from '@components/ui/Button'
import { getUserApi } from '@lib/apis/user'

type Form = {
  title: string
  description: string
}

const PortfolioInfoView: FC = () => {
  const schema = yup.object({
    title: yup.string(),
    description: yup.string(),
  })

  const defaultValues = {
    title: '',
    description: '',
  } as const

  const { data } = getUserApi()

  console.log(data?.result)

  const user = useMemo(() => {
    const {
      profileUrl,
      githubNickname,
      blogUrl,
      notionEmail,
      bio,
      phone,
      regisToken,
      ...rest
    } = data?.result || {}

    return {
      profile_url: profileUrl || '',
      github_nickname: githubNickname || '',
      blog_url: blogUrl || '',
      notion_email: notionEmail || '',
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
    setFocus('title')
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
        <h1>내 포트폴리오</h1>
      </div>
      <form onSubmit={handleSubmit(() => {})} className={s.form}>
        <div className={s.form_inner}>
          <div className={s.left_section}>
            <label className={s.input_container}>
              <span className={s.label}>제목</span>
              <Input control={control} name="title" />
            </label>

            <label className={s.input_container}>
              <span className={s.label}>설명</span>
              <Textarea
                control={control}
                name="description"
                placeholder="프로젝트를 간단히 소개해보세요."
              />
            </label>
          </div>
          <div className={s.right_section}>포트폴리오 시연 나오는 곳</div>
        </div>
        <Button className={s.save} disabled={disabled}>
          저장하기
        </Button>
      </form>
    </div>
  )
}

export default PortfolioInfoView
