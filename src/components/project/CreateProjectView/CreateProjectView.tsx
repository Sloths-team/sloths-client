import { FC, useEffect, useState, ChangeEvent } from 'react'
import Input from '@components/ui/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import s from './CreateProjectView.module.css'
import Textarea from '@components/ui/Textarea'
import { useSession } from '../../common/Layout/context'
import { MdNotificationImportant } from 'react-icons/md'
import Link from 'next/link'
import { FaCaretDown } from 'react-icons/fa'
import { useUI } from '@components/ui/context'
import { useProject } from '../context'
import { GITHUB_HTML_URL } from '@lib/constants'
import Button from '@components/ui/Button'
import { createProjectApi } from '@lib/apis/project'

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

  const { user } = useSession()

  const { control, setFocus, setValue, handleSubmit, watch } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: { title: '', description: '', media_url: '', repo_url: '' },
  })

  const { setModalView, openModal } = useUI()
  const { repo_url } = useProject()
  const [media, setMedia] = useState<string | ArrayBuffer>('')
  const { media_url } = watch()

  // const createProject = createProjectApi()

  const onSubmit = (data: Form) => {}

  const handleMedia = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const files = e.target.files ?? []
    reader.readAsDataURL(files[0])
    reader.onload = () => setMedia(reader.result ?? '')
  }

  useEffect(() => {
    setFocus('title')
  }, [])

  useEffect(() => {
    setValue('repo_url', `${GITHUB_HTML_URL}/${repo_url}`)
  }, [user, repo_url])

  useEffect(() => {}, [])

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1>프로젝트 만들기</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.left_section}>
          <label className={s.file_preview}>
            <Input
              hidden
              type="file"
              control={control}
              name="media_url"
              onChange={handleMedia}
            />
            {media && <img src={media.toString()} alt={media_url} />}
          </label>
        </div>
        <div className={s.right_section}>
          <label className={s.input_container}>
            <span className={s.label}>프로젝트명</span>
            <Input
              control={control}
              name="title"
              placeholder="공유할 프로젝트 이름을 입력해 주세요."
            />
          </label>
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
            {user?.github_nickname ? (
              <div
                className={s.find}
                onClick={() => {
                  setModalView('FIND_REPO_VIEW')
                  openModal()
                }}
              >
                {repo_url || '레포 찾기'}
                <FaCaretDown />
              </div>
            ) : (
              <button className={s.github}>
                <MdNotificationImportant />
                아직 깃헙 계정이 등록되어 있지 않습니다.{' '}
                <Link
                  href={{
                    pathname: `/${user?.nickname}`,
                    query: { target: 'github' },
                  }}
                  as={`/${user?.nickname}`}
                >
                  등록하러 가기
                </Link>
              </button>
            )}
          </label>
          <div className={s.button_container}>
            <Button type="submit" className={s.button}>
              만들기
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateProjectView
