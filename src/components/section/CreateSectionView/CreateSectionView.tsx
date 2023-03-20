import { FC, useEffect, useCallback, useState, useRef } from 'react'
import s from './CreateSectionView.module.css'
import { FormProvider, useForm } from 'react-hook-form'
import { useSession } from '../../common/Layout/context'
import { useUI } from '@components/ui/context'
import { useProject } from '@components/project/context'
import { BsPlusCircleDotted } from 'react-icons/bs'
import CreateEachSectionView from '../CreateEachSectionView'

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
      sections: [{ title: '', content: '', images: [], codes: [] }],
    },
  })

  const { setModalView, openModal } = useUI()
  const { project } = useProject()
  const [, setDisabled] = useState(true)
  const endRef = useRef<HTMLDivElement>(null)

  const onSubmit = ({ sections }: Form) => {
    const data = sections.map((section) => {
      const { images: formData, ...rest } = section
      formData.append('data', JSON.stringify(rest))

      return formData
    })

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

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [endRef.current])
  // useEffect(() => {
  //   setFocus('title')
  // }, [])

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
            <h2>{"'첫번째_프로젝트_xx"}</h2>
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
        <FormProvider {...methods}>
          {Array.from({ length: count }).map((section, i) => (
            <CreateEachSectionView key={i} index={i} />
          ))}
        </FormProvider>
        <button>완료</button>
      </form>
      <div ref={endRef}></div>
      <div className={s.add} onClick={() => setCount((p) => p + 1)}>
        <BsPlusCircleDotted />
      </div>
    </div>
  )
}

export default CreateSectionView
