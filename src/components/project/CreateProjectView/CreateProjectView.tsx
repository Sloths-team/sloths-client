import { FC, useEffect, useState } from 'react'
import Input from '@components/ui/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import s from './CreateProjectView.module.css'
import { useRouter } from 'next/router'
import Textarea from '@components/ui/Textarea'

type Form = {
  title: string
  description: string
  media_url: string
  repo_url: string
  root: null | number
}

const CreateProjectView: FC = () => {
  const schema = yup.object({
    title: yup.string(),
    description: yup.string(),
    media_url: yup.string(),
    repo_url: yup.string(),
    root: yup.number(),
  })

  const {
    control,
    setFocus,
    watch,
    setError,
    formState: { isValid, errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: { title: '', description: '', media_url: '', repo_url: '' },
  })

  const { title } = watch()
  const [disabled, setDisabled] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setFocus('title')
  }, [])

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1>프로젝트 만들기</h1>
      </div>
      <form onSubmit={() => {}} className={s.form}>
        <div className={s.left_section}>
          <div className={s.input_container}>
            <span className={s.label}>프로젝트명</span>
            <Input
              control={control}
              name="title"
              placeholder="열심히 만든 이번 프로젝트, 뭐라 불리면 좋을까요?"
            />
          </div>
          <label className={s.input_container}>
            <span className={s.label}>설명</span>
            <Textarea
              control={control}
              name="description"
              placeholder="간단한 설명을 덧붙여 보세요."
            />
          </label>
          <label className={s.input_container}>
            <span className={s.label}>Github 레포명</span>
            <Input type="email" control={control} name="repo_url" />
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

export default CreateProjectView
