import { FC, useEffect, ChangeEvent, useCallback, useState } from 'react'
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
import useFiles from '@lib/hooks/useFiles'
import { useRouter } from 'next/router'
import File from '@components/ui/File'
import { formatFormData } from '@lib/hooks/useFiles'

type Form = {
  title: string
  description: string
  repo_url: string
  root: null | number
  image: File
}

const CreateProjectView: FC = () => {
  const schema = yup.object({
    title: yup.string(),
    description: yup.string(),
    repo_url: yup.string(),
    root: yup.number(),
  })

  const defaultValues = {
    title: '',
    description: '',
    repo_url: '',
    root: null,
    image: undefined,
  } as const

  const { user } = useSession()

  const { control, setFocus, handleSubmit, watch, getValues, setValue } =
    useForm<Form>({
      resolver: yupResolver(schema),
      defaultValues,
    })

  const { setModalView, openModal } = useUI()
  const { project, saveLocal } = useProject()
  const { files, previews, onChangeFiles } = useFiles()
  const [disabled, setDisabled] = useState(true)
  const createProject = createProjectApi()
  const values = watch()
  const router = useRouter()

  const onSubmit = () => {
    const { repo_url, image, ...rest } = getValues()
    const data = { repoUrl: `${GITHUB_HTML_URL}/${repo_url}`, ...rest }

    const formData = formatFormData({ image, data: JSON.stringify(data) })

    createProject.mutateAsync(
      {
        params: { id: user?.portfolio_id || 9 },
        formData,
      },
      {
        onSuccess: (data) => {
          if (data.isSuccess) {
            router.push({
              pathname: `/sections/new`,
              query: { p: data.result.id },
            })
          }
        },
      }
    )
  }

  const handleFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChangeFiles(e)
    },
    [onChangeFiles]
  )

  useEffect(() => {
    setFocus('title')
  }, [])

  useEffect(() => {
    const { title, repo_url } = values
    setDisabled(!title || !repo_url)
  }, [values.title, values.repo_url])

  // useEffect(() => {
  //   if (saved) {
  //     setModalView('CONTINUE_WRITE_VIEW')
  //     openModal()
  //   }
  // }, [saved])

  useEffect(() => {
    if (project?.repo_url) {
      setValue('repo_url', project?.repo_url)
    }
  }, [project?.repo_url])

  useEffect(() => {
    setValue('image', files.image?.[0])
  }, [files])

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1>프로젝트 만들기</h1>
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.left_section}>
          <label className={s.file_preview}>
            <File hidden name="image" onChange={handleFiles} />
            {previews[0] && <img src={previews[0].toString()} alt={''} />}
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
            <Input hidden control={control} name="repo_url" />
            {user?.github_nickname ? (
              <div
                className={s.find}
                onClick={() => {
                  setModalView('FIND_REPO_VIEW')
                  openModal()
                }}
              >
                {project?.repo_url || '레포 찾기'}
                <FaCaretDown />
              </div>
            ) : (
              <button className={s.github} type="button">
                <MdNotificationImportant />
                아직 깃헙 계정이 등록되어 있지 않습니다.{' '}
                <Link
                  href={{
                    pathname: `/profile`,
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
            <Button
              id={s.save}
              type="button"
              onClick={() => {
                saveLocal({ project: { ...values }, saved: true })
              }}
            >
              임시 저장
            </Button>
            <Button type="submit" className={s.button} disabled={disabled}>
              만들기
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateProjectView
