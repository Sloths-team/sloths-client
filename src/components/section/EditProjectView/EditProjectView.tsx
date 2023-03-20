import { FC, useEffect, useReducer, useState } from 'react'
import { TbEdit } from 'react-icons/tb'
import s from './EditProjectView.module.css'
import * as yup from 'yup'
import cn from 'clsx'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Input, Textarea } from '@components/ui'

type Form = {
  title: string
  content: string
}

type Props = {
  title: string
  content: string
}
const EditProjectView: FC<Props> = (props) => {
  const { title, content } = props
  const [showDetail, toggleDetail] = useReducer((prev) => !prev, true)
  const [openTitleInput, toggleTitleInput] = useReducer((p) => !p, false)
  const [openDescInput, toggleDescInput] = useReducer((p) => !p, false)

  const schema = yup.object({
    title: yup.string(),
    content: yup.string(),
  })

  const defaultValues = {
    title: '',
    content: '',
  } as const

  const { control, setFocus, handleSubmit, watch, getValues, setValue } =
    useForm<Form>({
      resolver: yupResolver(schema),
      defaultValues,
    })

  useEffect(() => {
    setValue('title', title)
  }, [title])

  useEffect(() => {
    setValue('content', content)
  }, [content])

  // const updateProject = updateProjectApi()

  return (
    <>
      <div className={s.wrapper}>
        <h2
          className={cn(s.content, { [s.smaller_content]: !showDetail })}
          onClick={toggleTitleInput}
        >
          {!openTitleInput && <span>{title}</span>}
          {openTitleInput && (
            <Input
              control={control}
              name={'title'}
              onBlur={toggleTitleInput}
              onClick={(e) => e.stopPropagation()}
              style={{ fontSize: '24px', fontWeight: 700 }}
              placeholder="프로젝트명"
              autoFocus
            />
          )}
          <span className={s.icon}>
            <TbEdit />
          </span>
        </h2>
        <div className={s.buttons}>
          <button type="button" className={s.toggle} onClick={toggleDetail}>
            {showDetail ? ' 숨기기' : '보기'}
          </button>
          <button type="button" className={s.settings} onClick={() => {}}>
            설정
          </button>
        </div>
      </div>
      {showDetail && (
        <div className={s.wrapper}>
          <p className={s.content} onClick={toggleDescInput}>
            {!openDescInput && <span>{content}</span>}
            {openDescInput && (
              <Input
                control={control}
                name={'content'}
                onBlur={toggleDescInput}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            )}
            <span className={s.icon}>
              <TbEdit />
            </span>
          </p>
        </div>
      )}
    </>
  )
}

export default EditProjectView
