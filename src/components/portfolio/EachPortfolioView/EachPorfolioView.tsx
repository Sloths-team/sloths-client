import { FC, useEffect, useMemo, useState } from 'react'
import s from './EachPortfolioView.module.css'
import { GoMarkGithub } from 'react-icons/go'
import { SiNotion } from 'react-icons/si'
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiDotsHorizontal,
  HiOutlinePencilAlt,
} from 'react-icons/hi'
import { getAllPortfoliosApi } from '@lib/apis/portfolio'
import { GITHUB_HTML_URL } from '@lib/constants'
import { IconType } from 'react-icons'
import { useUI } from '@components/ui/context'
import cn from 'clsx'
import Link from 'next/link'
import { MdNotificationImportant } from 'react-icons/md'
import Calendar from '../Calendar/Calendar'

const user = {
  id: 1,
  nickname: 'user_1',
  email: 'user_1@gmail.com',
  profile_url: 'user_1_profile_image',
  github_nickname: 'user',
  blog_url: 'https://tisto',
  notion_email: 'user_1@gmail.com',
  bio: '신입 개발자에요! 현재 포트폴리오를 제작하고 있는 중입니다.',
  phone: '010.xxxx.xxxx',
  projects: [
    {
      id: 7,
      title: '여섯번째_프로젝트',
      description: '나의 여섯번째 프로젝트',
      root: 1,
    },
    {
      id: 6,
      title: '다섯번째_프로젝트',
      description: '나의 다섯번째 프로젝트',
      root: 1,
    },
    {
      id: 5,
      title: '네번째_프로젝트',
      description: '나의 네번째 프로젝트',
      root: 1,
    },
    {
      id: 4,
      title: '세번째_프로젝트',
      description: '나의 세번째 프로젝트',
      root: 1,
    },
    {
      id: 3,
      title: '두번째_프로젝트',
      description: '나의 두번째 프로젝트',
      root: 1,
    },
    {
      id: 2,
      title: '첫번째_프로젝트',
      description: '나의 첫번째 프로젝트',
      root: null,
    },
  ],
}

type CopyButtonProps = {
  label: string
  url: string
  Icon: IconType
}

const CopyButton: FC<CopyButtonProps> = ({ label, url, Icon }) => {
  const [isCopyReady, setCopyReady] = useState(true)

  const handleCopy = () => {
    setCopyReady(true)

    const timerId = setTimeout(() => {
      setCopyReady(false)
      return () => clearTimeout(timerId)
    }, 100)
  }

  const handleClip = (url: string) => {
    navigator.clipboard.writeText(url)
    handleCopy()
  }

  useEffect(() => {
    if (!isCopyReady) {
      const id = setTimeout(() => {
        setCopyReady(true)

        return () => {
          clearTimeout(id)
        }
      }, 800)
    }
  }, [isCopyReady])

  return (
    <div className={s.icon} onClick={() => handleClip(url)}>
      <div className={s.icon}>
        <Icon />
      </div>
      <span className={s.label}>{isCopyReady ? label : '복사 완료!'}</span>
    </div>
  )
}

type ProjectCardProps = {
  id: number
  title: string
  description: string
}

const ProjectCard: FC<ProjectCardProps> = (props) => {
  const { id, title, description } = props

  return (
    <li className={s.project_card}>
      <Link href={`/projects/${id}`}>
        <p className={s.project__title}>{title}</p>
        <p className={s.project__description}>{description}</p>
      </Link>
    </li>
  )
}

const EachPortofolioView: FC = () => {
  const getPortfolios = getAllPortfoliosApi()
  const { setModalView, openModal } = useUI()
  const [side, setSide] = useState<'info' | 'personal' | 'team'>('personal')
  const actions = useMemo(() => {
    return [
      { label: '이메일', url: user.email, Icon: HiOutlineMail },
      {
        label: '깃헙',
        url: `${GITHUB_HTML_URL}/${user.github_nickname}`,
        Icon: GoMarkGithub,
      },
      { label: '블로그', url: user.blog_url, Icon: HiOutlinePencilAlt },
      { label: '노션', url: user.blog_url, Icon: SiNotion },
      { label: '전화번호', url: user.phone, Icon: HiOutlinePhone },
    ]
  }, [user])

  return (
    <div className={s.root}>
      <div className={s.nav}>
        <div className={s.profile}>
          {/* <Image src={user.profile_url} width={100} height={100}/> */}
        </div>
        <div className={s.content}>
          <h1>{user.nickname}</h1>
          <div className={s.actions}>
            {actions.map((props) => (
              <CopyButton key={props.label} {...props} />
            ))}
            <div
              className={s.icon}
              onClick={() => {
                setModalView('PORTFOLIO_SETTINGS_VIEW')
                openModal()
              }}
            >
              <HiDotsHorizontal />
              <span className={s.label}>기타</span>
            </div>
          </div>
          <p className={s.bio}>{user.bio}</p>
          <div className={s.bottom}>
            <Calendar />
          </div>
        </div>
      </div>
      <main className={s.main}>
        <div className={s.index}>
          <div
            className={cn(s.index_item, {
              [s.active]: side === 'personal',
            })}
            onClick={() => setSide('personal')}
          >
            개인 프로젝트
          </div>
          <div
            className={cn(s.index_item, { [s.active]: side === 'team' })}
            onClick={() => setSide('team')}
          >
            팀 프로젝트
          </div>
          <div
            className={cn(s.index_item, {
              [s.active]: side === 'info',
            })}
            onClick={() => setSide('info')}
          >
            정보
          </div>
        </div>
        <div
          className={cn(s.container, {
            [s.info]: side === 'info',
            [s.projects]: side === 'personal' || side === 'team',
          })}
        >
          {side === 'personal' &&
            user.projects.map((props) => (
              <ProjectCard key={props.id} {...props} />
            ))}
          {side === 'team' &&
            user.projects.map((props) => (
              <ProjectCard key={props.id} {...props} />
            ))}
          {side === 'info' && (
            <div className={s.info}>
              <div className={s.wrapper}>
                <span className={s.label}>포트폴리오_이름</span>
                <p className={s.content}>포트폴리오_이름</p>
              </div>
              <div className={s.wrapper}>
                <span className={s.label}>포트폴리오_설명</span>
                <p className={s.content}>포트폴리오_설명</p>
              </div>
              <div className={s.wrapper}>
                <span className={s.label}>개발자</span>
                <p className={s.content}>개발자_이름</p>
              </div>
              <div className={s.wrapper}>
                <span className={s.label}>포트폴리오_마지막_수정일</span>
                <p className={s.content}>포트폴리오_마지막_수정일</p>
              </div>
              <button className={s.edit}>
                <MdNotificationImportant />내 포트폴리오 정보를 수정하고 싶다면
                <Link href={'/portfolios/info'}>수정하기</Link>로 이동해주세요.
              </button>
              <div></div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default EachPortofolioView
