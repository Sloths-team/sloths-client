import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import s from './EachProfileView.module.css'
import { useRouter } from 'next/router'
import { GoMarkGithub } from 'react-icons/go'
import { getUserApi } from '@lib/apis/user'
import { SiNotion } from 'react-icons/si'
import { SlNote } from 'react-icons/sl'
import { HiOutlinePhone, HiOutlineMail, HiDotsHorizontal } from 'react-icons/hi'
import { GITHUB_HTML_URL } from '@lib/constants'
import { IconType } from 'react-icons'
import { useUI } from '@components/ui/context'

const user = {
  id: 1,
  nickname: 'user_1',
  email: 'user_1@gmail.com',
  profile_url: '/',
  github_nickname: 'user',
  blog_url: '/',
  notion_email: '/',
  bio: 'hello',
  phone: '010.xxxx.xxxx',
}

type Props = {
  label: string
  url: string
  Icon: IconType
}

const CopyButton: FC<Props> = ({ label, url, Icon }) => {
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
    <div key={url} className={s.icon} onClick={() => handleClip(url)}>
      <div className={s.icon}>
        <Icon />
      </div>
      <span className={s.label}>{isCopyReady ? label : '복사 완료!'}</span>
    </div>
  )
}

const EachProfileView: FC = () => {
  const { data } = getUserApi()

  const router = useRouter()
  const githubRef = useRef<HTMLButtonElement>(null)
  const { setModalView, openModal } = useUI()

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
      <div className={s.header}>
        <div className={s.header__left}>
          <div className={s.profile_img}>
            {/* <Image src={user.profile_url} width={100} height={100}/> */}
          </div>
        </div>
        <div className={s.header__right}>
          <h1>{user.nickname}</h1>
          <div className={s.icons}>
            {actions.map((props) => (
              <CopyButton {...props} />
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
      </div>
    </div>
  )
}

export default EachProfileView
