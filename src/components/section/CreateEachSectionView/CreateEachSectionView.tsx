import { FC, useEffect, ChangeEvent, useCallback, useRef } from 'react'
import s from './CreateEachSectionView.module.css'
import cn from 'clsx'
import File from '@components/ui/File'
import Input from '@components/ui/Input'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Textarea from '@components/ui/Textarea'
import { usePreviews } from '@lib/hooks/usePreviews'
import useFiles from '@lib/hooks/useFiles'
import { BsFullscreen, BsImages } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { formatFormData } from '@lib/hooks/useFiles'

const CreateEachSectionView: FC<{ index: number }> = ({ index }) => {
  const { control, setFocus, setValue } = useFormContext()
  const { previews, handlePreviews } = usePreviews('stack')
  const { files, onChangeFiles } = useFiles()
  const fileRef = useRef<HTMLInputElement>()

  const handleProfile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handlePreviews(e)
      onChangeFiles(e)
    },
    [handlePreviews, onChangeFiles]
  )

  useEffect(() => {
    setFocus(`sections.${index}.title`)
  }, [])

  useEffect(() => {
    setValue(`sections.${index}.images`, formatFormData(files))
  }, [files])

  useEffect(() => {
    setValue(`sections.${index}.previews`, previews)
  }, [previews])

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
            />
          </label>
          <label className={s.input_container}>
            <span className={s.label}>Github 코드 추가하기</span>
            <Input hidden control={control} name={`sections.${index}.codes`} />
            {/* {user?.github_nickname ? (
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
            )} */}
          </label>
        </div>
      </div>
    </li>
  )
}

export default CreateEachSectionView
