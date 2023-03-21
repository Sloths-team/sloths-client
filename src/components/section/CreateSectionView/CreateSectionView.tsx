import { FC, useEffect, useCallback, useState, useRef } from 'react'
import s from './CreateSectionView.module.css'
import { FormProvider, useForm } from 'react-hook-form'
import { useUI } from '@components/ui/context'
import { BsPlusCircleDotted } from 'react-icons/bs'
import CreateEachSectionView from '../CreateEachSectionView'
import { createSectionApi } from '@lib/apis/project'
import Button from '@components/ui/Button'

type Section = {
  title: string
  content: string
  images: FormData
  codes: []
}
type Form = {
  sections: Section[]
}

const CreateSectionView: FC = () => {
  const [count, setCount] = useState(1)

  const methods = useForm<Form>({
    defaultValues: {
      sections: [{ title: '', content: '', images: {}, codes: [] }],
    },
  })

  const { setModalView, openModal } = useUI()
  const [disabled, setDisabled] = useState(true)
  const endRef = useRef<HTMLDivElement>(null)

  const createSection = createSectionApi()
  const projectId = 1

  const onSubmit = ({ sections }: Form) => {
    const arr = sections.map((section) => {
      const { images: formData, ...rest } = section
      formData.append('data', JSON.stringify(rest))

      return formData
    })

    arr.forEach((section) => {
      createSection.mutateAsync(
        {
          params: { id: projectId },
          formData: section,
        },
        {
          onSuccess: (data) => {
            if (data.isSuccess) {
              // router.push({
              //   pathname: `/projects`,
              // })
            }
          },
        }
      )
    })
  }

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [endRef.current])

  // useEffect(() => {
  //   const { title } = values
  //   setDisabled(!title)
  // }, [values.title])

  // useEffect(() => {
  //   if (saved) {
  //     setModalView('CONTINUE_WRITE_VIEW')
  //     openModal()
  //   }
  // }, [saved])

  // useEffect(() => {
  //   if (project.repo_url) {
  //     setValue('repo_url', project.repo_url)
  //   }
  // }, [project.repo_url])

  useEffect(() => {
    scrollToBottom()
  }, [count])

  return (
    <div className={s.root}>
      <div className={s.header}>
        <div className={s.header__inner}>
          <div className={s.inner_item}>
            <div className={s.image}></div>
            <h3>{'첫번째_프로젝트_xx'}</h3>
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
      <form className={s.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <ul className={s.ul}>
          <FormProvider {...methods}>
            {Array.from({ length: count }).map((section, i) => (
              <CreateEachSectionView key={i} index={i} />
            ))}
          </FormProvider>
        </ul>
        <div className={s.button_container}>
          <Button
            type="button"
            className={s.button}
            onClick={() => setCount((p) => p + 1)}
          >
            추가하기
          </Button>
          <Button type="button" className={s.button}>
            미리보기
          </Button>
          <Button type="submit" className={s.button} disabled={disabled}>
            (총 {count} 색션)만들기
          </Button>
        </div>
      </form>
      <div ref={endRef}></div>
    </div>
  )
}

export default CreateSectionView
