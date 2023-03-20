import {
  FC,
  useEffect,
  ChangeEvent,
  useCallback,
  useState,
  useRef,
} from 'react'
import s from './CreateSectionView.module.css'
import cn from 'clsx'
import File from '@components/ui/File'
import Input from '@components/ui/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Textarea from '@components/ui/Textarea'
import { useSession } from '../../common/Layout/context'
import { MdNotificationImportant } from 'react-icons/md'
import Link from 'next/link'
import { FaCaretDown } from 'react-icons/fa'
import { useUI } from '@components/ui/context'
import { GITHUB_HTML_URL, NEW_PROJECT } from '@lib/constants'
import { createProjectApi } from '@lib/apis/project'
import { usePreviews } from '@lib/hooks/usePreviews'
import useFiles from '@lib/hooks/useFiles'
import { useRouter } from 'next/router'
import useLocalStorage from '@lib/hooks/useLocalStorage'
import { useProject } from '@components/project/context'
import { BsPlusCircleDotted, BsFullscreen } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'

const title = '첫번째_프로젝트_xx'
const description = '프로젝트에 대한 설명이 들어갈 곳입니다.'

type Form = {
  title: string
  content: string
  repo_url: string
  root: null | number
}

const CreateSectionView: FC = () => {
  const [count, setCount] = useState(1)
  const schema = yup.object({
    title: yup.string(),
    content: yup.string(),
    repo_url: yup.string(),
    root: yup.number(),
  })

  const defaultValues = {
    title: '',
    content: '',
    repo_url: '',
    root: null,
  } as const

  const { user } = useSession()

  const { control, setFocus, handleSubmit, watch, getValues, setValue } =
    useForm<Form>({
      resolver: yupResolver(schema),
      defaultValues,
    })

  const { setModalView, openModal } = useUI()
  const { project } = useProject()
  const { previews, handlePreviews } = usePreviews('stack')
  const { onChangeFiles, formatFormData } = useFiles()
  const [, setDisabled] = useState(true)
  const createProject = createProjectApi()
  const values = watch()
  const router = useRouter()
  const { storage } = useLocalStorage(NEW_PROJECT)
  const endRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>()

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

  const handleAdd = () => {
    setCount((p) => p + 1)
  }

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [endRef.current])

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
    if (project.repo_url) {
      setValue('repo_url', project.repo_url)
    }
  }, [project.repo_url])

  useEffect(() => {
    scrollToBottom()
  }, [count])

  return (
    <div className={s.root}>
      <div className={s.header}>
        <div className={s.header__inner}>
          <div className={s.inner_item}>
            <div className={s.image}></div>
            <h2>{title}</h2>
          </div>
          <div className={s.inner_item}>
            <button
              onClick={() => {
                setModalView('SECTION_PROJECT_SETTINGS_VIEW')
                openModal()
              }}
            >
              설정
            </button>
          </div>
        </div>
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        {Array.from({ length: count }).map((section, i) => (
          <div key={i} className={s.section_container}>
            <div className={cn(s.section, { [s.left]: true })}>
              <div className={s.file_dropper}>
                <label
                  className={cn(s.file, { [s.hidden]: !!previews.length })}
                  htmlFor="image"
                >
                  이미지
                </label>
                <File
                  ref={fileRef}
                  id="image"
                  name="image"
                  onChange={handleProfile}
                  multiple
                />
                <ul className={s.previews}>
                  {previews.length
                    ? previews.map((preview, i) => (
                        <li key={preview + ''} className={s.image_wrapper}>
                          <img src={preview?.toString()} alt={''} />
                        </li>
                      ))
                    : null}
                </ul>
                <div className={s.actions}>
                  <div
                    className={s.action}
                    onClick={() => fileRef?.current?.click() || null}
                  >
                    <AiOutlinePlus />
                  </div>
                  <div className={s.action}>
                    <BsFullscreen />
                  </div>
                </div>
              </div>
            </div>
            <div className={cn(s.section, { [s.right]: true })}>
              <div className={s.main}>
                <label className={s.input_container}>
                  <span className={s.label}>색션 제목</span>
                  <Input
                    control={control}
                    name="title"
                    placeholder="프로젝트의 색션 제목을 적어주세요"
                  />
                </label>
                <label className={s.input_container}>
                  <span className={s.label}>색션 내용</span>
                  <Textarea
                    control={control}
                    name="content"
                    placeholder="프로젝트의 색션 내용을 적어주세요"
                  />
                </label>
                <label className={s.input_container}>
                  <span className={s.label}>Github 코드 추가하기</span>
                  <Input hidden control={control} name="repo_url" />
                  {user?.github_nickname ? (
                    <div
                      className={s.find}
                      onClick={() => {
                        setModalView('FIND_REPO_VIEW')
                        openModal()
                      }}
                    >
                      {project.repo_url || '레포 찾기'}
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
              </div>
            </div>
            <div ref={endRef}></div>
          </div>
        ))}
      </form>
      <div className={s.add} onClick={handleAdd}>
        <BsPlusCircleDotted />
      </div>
    </div>
  )
}

export default CreateSectionView
