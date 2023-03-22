import { FC, useEffect, useState, useRef } from 'react'
import s from './CreateSectionView.module.css'
import { useForm } from 'react-hook-form'
import { useUI } from '@components/ui/context'
import CreateEachSectionView from '../CreateEachSectionView'
import { createSectionApi } from '@lib/apis/project'
import Button from '@components/ui/Button'
import { useSections } from '../context'

export type Section = {
  id: number
  title: string
  content: string
  images: FileList | File[] | []
  codes?: []
  previews: (string | ArrayBuffer | null)[]
}

type Form = {
  sections: Section[]
}

const CreateSectionView: FC = () => {
  const methods = useForm<Form>({
    defaultValues: {
      sections: [
        {
          id: 0,
          title: '연습_1',
          content: '',
          images: [],
          codes: [],
          previews: [],
        },
      ],
    },
  })

  const nextId =
    Math.max(...methods.watch().sections.map((section) => section.id)) + 1

  const { setModalView, openModal } = useUI()
  const [disabled, setDisabled] = useState(true)
  const endRef = useRef<HTMLDivElement>(null)
  const createSection = createSectionApi()
  const projectId = 1
  const { saveLocal } = useSections()
  const { sections } = methods.watch()

  const onSubmit = ({ sections }: Form) => {
    console.log(sections)

    // const arr = sections.map((section) => {
    //   const { images: formData, previews, ...rest } = section
    //   formData.append('data', JSON.stringify(rest))

    //   return formData
    // })

    // console.log(arr)
    // arr.forEach((section) => {
    //   createSection.mutateAsync(
    //     {
    //       params: { id: projectId },
    //       formData: section,
    //     },
    //     {
    //       onSuccess: (data) => {
    //         if (data.isSuccess) {
    //           // router.push({
    //           //   pathname: `/projects`,
    //           // })
    //         }
    //       },
    //     }
    //   )
    // })
  }

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

  const addSection = () => {
    methods.setValue('sections', [
      ...sections,
      {
        id: nextId,
        title: '',
        content: '',
        images: [],
        previews: [],
        codes: [],
      },
    ])
  }

  useEffect(() => {
    const bottom = endRef.current

    if (bottom) {
      bottom.scrollIntoView({ behavior: 'smooth' })
    }
  }, [sections.length])

  useEffect(() => {
    if (!sections.length) {
      addSection()
    }
  }, [sections])

  // TODO
  // 만약에 p에 존재하지 않는 프로젝트 아이디가 들어온다면, 처리
  // 로그인 사용자만 접근 가능

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
          {sections.map((section, i) => {
            return (
              <CreateEachSectionView
                key={section.id}
                index={i}
                methods={methods}
              />
            )
          })}
        </ul>
        <div className={s.button_container}>
          <Button type="button" className={s.button} onClick={addSection}>
            추가하기
          </Button>
          <Button
            type="button"
            className={s.button}
            onClick={() => {
              setModalView('DRAG_DROP_SECTION_VIEW', { methods })
              openModal()
            }}
          >
            비교하기
          </Button>
          <Button
            id={s.save}
            type="button"
            onClick={() => {
              saveLocal({ ...methods.getValues(), saved: true })
            }}
          >
            임시 저장
          </Button>
          <Button type="submit" className={s.button}>
            만들기
          </Button>
        </div>
      </form>
      <div ref={endRef}></div>
    </div>
  )
}

export default CreateSectionView
