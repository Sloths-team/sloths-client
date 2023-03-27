import { FC, useEffect, ChangeEvent, useCallback, useRef } from 'react'
import s from './CreateEachSectionView.module.css'
import cn from 'clsx'
import File from '@components/ui/File'
import Input from '@components/ui/Input'
import { UseFormReturn } from 'react-hook-form'
import Textarea from '@components/ui/Textarea'
import useFiles from '@lib/hooks/useFiles'
import { BsFullscreen, BsImages } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { Section } from '../CreateSectionView/CreateSectionView'
import { useSession } from '@components/common/Layout/context'
import { MdNotificationImportant } from 'react-icons/md'
import { useUI } from '@components/ui/context'
import Button from '@components/ui/Button'

type Props = {
  index: number
  methods: UseFormReturn<{ sections: Section[] }, any>
}

const CreateEachSectionView: FC<Props> = ({ index, methods }) => {
  const { user } = useSession()
  const { control, setFocus, setValue, watch } = methods
  const { files, previews, onChangeFiles, updateFiles } = useFiles()

  const fileRef = useRef<HTMLInputElement>()
  const { sections } = watch()
  const section = sections[index]
  const { setModalView, openModal } = useUI()

  const onDelete = (index: number) => {
    setValue(
      'sections',
      sections.filter((s, i) => i !== index)
    )
  }

  const handleProfile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChangeFiles(e)
    },
    [onChangeFiles]
  )

  useEffect(() => {
    setFocus(`sections.${index}.title`)
  }, [])

  useEffect(() => {
    setValue(`sections.${index}.images`, files.images)
    setValue(`sections.${index}.previews`, previews)
  }, [files, previews])

  useEffect(() => {
    setValue(`sections.${index}.title`, section.title)
    setValue(`sections.${index}.content`, section.content)
    setValue(`sections.${index}.previews`, section.previews)
    setValue(`sections.${index}.images`, section.images)
    setValue(`sections.${index}.codes`, section.codes)
  }, [section])

  return (
    <li className={s.section_container}>
      <div className={cn(s.section, { [s.left]: true })}>
        <div className={s.file_dropper}>
          <label
            className={cn(s.file, { [s.hidden]: !!previews.length })}
            htmlFor="images"
          >
            <p className={s.text}>
              <BsImages />
              <span>프로젝트 사진 및 동영상을 업로드 해보세요.</span>
            </p>
          </label>
          <File
            ref={fileRef}
            id="images"
            name="images"
            onChange={handleProfile}
            multiple
          />
          <Input hidden control={control} name={`sections.${index}.previews`} />
          <ul className={s.previews}>
            {previews.length
              ? previews.map((preview, i) => (
                  <li key={preview?.toString()} className={s.image_wrapper}>
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
            <div
              className={s.action}
              onClick={() => {
                setModalView('DRAG_DROP_IMAGE_VIEW', {
                  methods,
                  index,
                  updateFiles,
                })
                openModal()
              }}
            >
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
              name={`sections.${index}.title`}
              placeholder="프로젝트의 색션 제목을 적어주세요"
            />
          </label>
          <label className={s.input_container}>
            <span className={s.label}>색션 내용</span>
            <Textarea
              control={control}
              name={`sections.${index}.content`}
              placeholder="프로젝트의 색션 내용을 적어주세요"
              value={section.content}
            />
          </label>
          {/* <label className={s.input_container}>
            <span className={s.label}>Github 코드 추가하기</span>
            <Input hidden control={control} name={`sections.${index}.codes`} />
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
          </label> */}
          {
            <div
              className={s.tags}
              onClick={() => {
                setModalView('CODE_VIEW')
                openModal()
              }}
            >
              <MdNotificationImportant />
              코드를 태그해보세요
            </div>
          }

          <Button onClick={() => onDelete(index)} className={s.delete}>
            삭제
          </Button>
        </div>
      </div>
    </li>
  )
}

export default CreateEachSectionView
