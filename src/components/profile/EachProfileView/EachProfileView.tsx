import { FC, useEffect, useMemo, useRef, useState } from 'react'
import s from './EachProfileView.module.css'
import { GoMarkGithub } from 'react-icons/go'
import { SiNotion } from 'react-icons/si'
import { SlNote } from 'react-icons/sl'
import { HiOutlinePhone, HiOutlineMail, HiDotsHorizontal } from 'react-icons/hi'
import { GITHUB_HTML_URL } from '@lib/constants'
import { IconType } from 'react-icons'
import { useUI } from '@components/ui/context'
import cn from 'clsx'

const user = {
  id: 1,
  nickname: 'user_1',
  email: 'user_1@gmail.com',
  profile_url: 'user_1_profile_image',
  github_nickname: 'user',
  blog_url: 'https://tisto',
  notion_email: 'user_1@gmail.com',
  bio: '안녕, 나는 박미주구요.. 프론트앤드 개발자를 꿈꾸고 있는 신입입니다.',
  phone: '010.xxxx.xxxx',
  projects: [
    {
      id: 2,
      title: '첫번째_프로젝트',
      description: '나의 첫번째 프로젝트',
      root: null,
    },
    {
      id: 3,
      title: '두번째_프로젝트',
      description: '나의 두번째 프로젝트',
      root: 1,
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

    const id = setTimeout(() => {
      setCopyReady(false)

      return () => {
        clearTimeout(id)
        setCopyReady(true)
      }
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
  title: string
  description: string
}

const ProjectCard: FC<ProjectCardProps> = (props) => {
  const { title, description } = props

  return <li className={s.project}>{title}</li>
}

const EachProfileView: FC = () => {
  const { setModalView, openModal } = useUI()
  const [side, setSide] = useState<'personal' | 'team'>('personal')
  const actions = useMemo(() => {
    return [
      { label: '이메일', url: user.email, Icon: HiOutlineMail },
      {
        label: '깃헙',
        url: `${GITHUB_HTML_URL}/${user.github_nickname}`,
        Icon: GoMarkGithub,
      },
      { label: '블로그', url: user.blog_url, Icon: SlNote },
      { label: '노션', url: user.blog_url, Icon: SiNotion },
      { label: '전화번호', url: user.phone, Icon: HiOutlinePhone },
    ]
  }, [user])

  return (
    <div className={s.root}>
      <header className={s.header}>
        <div className={s.header__left}>
          <div className={s.profile_img}>
            {/* <Image src={user.profile_url} width={100} height={100}/> */}
          </div>
        </div>
        <div className={s.header__right}>
          <div className={s.header__right__top}>
            <h1>{user.nickname}</h1>
            <div className={s.icons}>
              {actions.map((props) => (
                <CopyButton key={props.label} {...props} />
              ))}
              <div
                className={s.icon}
                onClick={() => {
                  setModalView('PROFILE_SETTINGS_VIEW')
                  openModal()
                }}
              >
                <HiDotsHorizontal />
                <span className={s.label}>기타</span>
              </div>
            </div>
          </div>
          <div className={s.header__right__bottom}>
            <p className={s.bio}>{user.bio}</p>
          </div>
        </div>
      </header>
      <main className={s.main}>
        <div className={s.index}>
          <div
            className={cn(s.index__detail, { [s.active]: side === 'personal' })}
            onClick={() => setSide('personal')}
          >
            개인 프로젝트
          </div>
          <div
            className={cn(s.index__detail, { [s.active]: side === 'team' })}
            onClick={() => setSide('team')}
          >
            팀 프로젝트
          </div>
        </div>
        <ul className={s.projects}>
          {user.projects.map((props) => (
            <ProjectCard key={props.id} {...props} />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default EachProfileView
