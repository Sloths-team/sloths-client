import RoundButton from '@components/ui/RoundButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import s from './SideUserNav.module.css'

const SideUserNav = () => {
  const router = useRouter()

  return (
    <div className={s.root}>
      <div className={s.header}>
        <div className={s.alarm}>알림</div>
        <div className={s.container}>
          <div className={s.user}>
            <div className={s.user__profile}></div>
            <p className={s.user__nickname}>박미주</p>
            <Link className={s.user__portfolio_url} href="/">
              portfolio_url
            </Link>
          </div>
          <div className={s.actions}>
            <RoundButton colored onClick={() => {}}>
              프로젝트 추가하기
            </RoundButton>
          </div>
        </div>
      </div>
      <div className={s.main}>
        <div></div>
      </div>
      <div className={s.footer}>
        <div className={s.actions}>
          <RoundButton onClick={() => router.push('/me/settings')}>
            설정
          </RoundButton>
          <RoundButton onClick={() => router.push('/me/logout')}>
            로그아웃
          </RoundButton>
        </div>
      </div>
    </div>
  )
}

export default SideUserNav
