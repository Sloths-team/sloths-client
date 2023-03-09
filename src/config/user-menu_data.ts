<li
              className={s.item}
              onClick={() => {
                router.push('/username')
                closeModal()
              }}
            >
              내 프로필
            </li>
            <li
              className={s.item}
              onClick={() => {
                router.push('/projects/new')
                closeModal()
              }}
            >
              프로젝트 관리하기
            </li>
            <li
              className={s.item}
              onClick={() => {
                logout()
                setModalView('LOGOUT_ANNOUNCE_VIEW')
                openModal()
              }}
            >
              로그아웃
            </li>

const UserMenuData = [{ title: '내 프로필', href: '/username' }] as const

export default UserMenuData
