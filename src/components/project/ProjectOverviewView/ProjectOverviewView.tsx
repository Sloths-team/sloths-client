import Link from 'next/link'
import { FC } from 'react'
import s from './ProjectOverviewView.module.css'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { useRouter } from 'next/router'
import { HiDotsVertical } from 'react-icons/hi'
import { useUI } from '@components/ui/context'

const projects = [
  {
    id: 1,
    title: '프로젝트_1',
    description: '프로젝트_1에 대한 설명',
    media_url: '/image',
    repo_url: '..',
    root: null,
  },
  {
    id: 2,
    title: '프로젝트_2',
    description: '프로젝트_2에 대한 설명',
    media_url: '/image',
    repo_url: '..',
    root: null,
  },
  {
    id: 3,
    title: '프로젝트_3',
    description: '프로젝트_3에 대한 설명',
    media_url: '/image',
    repo_url: '..',
    root: null,
  },
] as const

const ProjectOverviewView: FC = () => {
  const router = useRouter()

  const { setModalView, openModal } = useUI()

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1>내 프로젝트</h1>
        <div>
          <input className={s.search} placeholder="검색" />
        </div>
      </div>
      <div className={s.main}>
        <ul>
          <button
            className={s.add}
            onClick={() => router.push('/projects/new')}
          >
            <MdOutlineAddCircleOutline /> {` `} 새 프로젝트 추가하기
          </button>
          {projects.map((project) => (
            <li key={project.id} className={s.card}>
              <div className={s.project__thumbnail}>
                {/* <Image
                  src={project.media_url}
                  width={120}
                  height={120}
                  alt={project.media_url}
                /> */}
              </div>
              <div className={s.card__content}>
                <div className={s.card__content__left}>
                  <Link href={`/projects/${project.id}`}>
                    <h3 className={s.card__title}>{project.title}</h3>
                    <p className={s.card__description}>{project.description}</p>
                  </Link>
                </div>
                <div className={s.card__content__right}>
                  <div
                    onClick={() => {
                      setModalView('MYPROJECT_SETTINGS_VIEW', {
                        project,
                      })
                      openModal()
                    }}
                    className={s.settings}
                  >
                    <HiDotsVertical />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProjectOverviewView
