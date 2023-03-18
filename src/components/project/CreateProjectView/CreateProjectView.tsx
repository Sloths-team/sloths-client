import {
  FC,
  useEffect,
  ChangeEvent,
  useCallback,
  useState,
  useMemo,
} from 'react'
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
import { GITHUB_HTML_URL, NEW_PROJECT } from '@lib/constants'
import Button from '@components/ui/Button'
import { createProjectApi } from '@lib/apis/project'
import { usePreviews } from '@lib/hooks/usePreviews'
import useFiles from '@lib/hooks/useFiles'
import { useRouter } from 'next/router'
import useLocalStorage from '@lib/hooks/useLocalStorage'
import File from '@components/ui/File'

type Form = {
  title: string
  description: string
  repo_url: string
  root: null | number
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
  } as const

  const { user } = useSession()

  const { control, setFocus, handleSubmit, watch, getValues } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const { setModalView, openModal } = useUI()
  const { repo_url, set } = useProject()
  const { previews, handlePreviews } = usePreviews()
  const { onChangeFiles, formatFormData } = useFiles()
  const [disabled, setDisabled] = useState(true)
  const createProject = createProjectApi()
  const values = watch()
  const router = useRouter()
  const { storage } = useLocalStorage(NEW_PROJECT)

  const project = useMemo(() => {
    const { repo_url: repoUrl, ...rest } = values

    return {
      repoUrl: repo_url,
      ...rest,
    }
  }, [values])

  const onSubmit = () => {
    const formData = formatFormData()

    const { repo_url, ...rest } = getValues()
    const data = { repoUrl: `${GITHUB_HTML_URL}/${repo_url}`, ...rest }

    formData.append('data', JSON.stringify(data))

    createProject.mutateAsync(
      {
        params: { id: user?.portfolio_id || 9 },
        formData,
      },
      {
        onSuccess: (data) => {
          if (data.isSuccess) {
            router.push({
              pathname: `/projects`,
            })
          }
        },
      }
    )
  }

  const handleProfile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handlePreviews(e)
      onChangeFiles(e)
    },
    [handlePreviews, onChangeFiles]
  )

  useEffect(() => {
    setFocus('title')
  }, [])

  useEffect(() => {
    const { title, repo_url } = values
    setDisabled(!title || !repo_url)
  }, [values])

  useEffect(() => {
    if (storage) {
      setModalView('CONTINUE_WRITE_VIEW')
      openModal()
    }
  }, [])

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1>프로젝트 만들기</h1>
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.left_section}>
          <label className={s.file_preview}>
            <File hidden name="image" onChange={handleProfile} />
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
                set(project)
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
