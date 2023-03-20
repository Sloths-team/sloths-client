import {
  FC,
  useEffect,
  ChangeEvent,
  useCallback,
  useState,
  useRef,
} from 'react'
import s from './CreateEachSectionView.module.css'
import cn from 'clsx'
import File from '@components/ui/File'
import Input from '@components/ui/Input'
import { useFieldArray, useFormContext } from 'react-hook-form'
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
import { BsFullscreen, BsImages } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { formatFormData } from '@lib/hooks/useFiles'

type Form = {
  title: string
  content: string
  repo_url: string
  root: null | number
}

type Props = {
  index: number
}
const CreateSectionView: FC<Props> = ({ index }) => {
  const { user } = useSession()

  const { control, setFocus, watch, setValue } = useFormContext()

  const { setModalView, openModal } = useUI()
  const { project } = useProject()
  const { previews, handlePreviews } = usePreviews('stack')
  const { files, onChangeFiles } = useFiles()
  const [, setDisabled] = useState(true)
  const values = watch()
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>()

  const onSubmit = () => {
    // const formData = formatFormData()
    // const { repo_url, ...rest } = getValues()
    // const data = { repoUrl: `${GITHUB_HTML_URL}/${repo_url}`, ...rest }
    // formData.append('data', JSON.stringify(data))
    // createProject.mutateAsync(
    //   {
    //     params: { id: user?.portfolio_id || 9 },
    //     formData,
    //   },
    //   {
    //     onSuccess: (data) => {
    //       if (data.isSuccess) {
    //         router.push({
    //           pathname: `/projects`,
    //         })
    //       }
    //     },
    //   }
    // )
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
  }, [values.title, values.repo_url])

  useEffect(() => {
    if (project.repo_url) {
      setValue('repo_url', project.repo_url)
    }
  }, [project.repo_url])

  useEffect(() => {
    setValue(`sections.${index}.images`, formatFormData(files))
  }, [files])

  return (
    <div className={s.section_container}>
      <div className={cn(s.section, { [s.left]: true })}>
        <div className={s.file_dropper}>
          <label
            className={cn(s.file, { [s.hidden]: !!previews.length })}
            htmlFor="image"
          >
            <p className={s.text}>
              <BsImages />
              <span>프로젝트 사진 및 동영상을 업로드 해보세요.</span>
            </p>
          </label>
          <File
            ref={fileRef}
            id="image"
            name={`sections.${index}.images`}
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
            <span className={s.label}>섹션 제목</span>
            <Input
              control={control}
              name={`sections.${index}.title`}
              placeholder="프로젝트의 섹션 제목을 적어주세요"
            />
          </label>
          <label className={s.input_container}>
            <span className={s.label}>섹션 내용</span>
            <Textarea
              control={control}
              name={`sections.${index}.content`}
              placeholder="프로젝트의 섹션 내용을 적어주세요"
            />
          </label>
          {/* <label className={s.input_container}>
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
          </label> */}
        </div>
      </div>
    </div>
  )
}

export default CreateSectionView
