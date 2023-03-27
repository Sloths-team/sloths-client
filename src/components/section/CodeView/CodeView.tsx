import { createRef, FC, useState } from 'react'
import s from './CodeView.module.css'
import { IoCloseOutline } from 'react-icons/io5'
import { useUI } from '@components/ui/context'
import { useSession } from '@components/common/Layout/context'
import { getAllGithubReposApi, getRepoAllContentsApi } from '@lib/apis/github'
import { useRouter } from 'next/router'
import { getProjectByIdApi } from '@lib/apis/project'
import cn from 'clsx'

const CodeView: FC<any> = (props) => {
  const { style } = props
  const {
    query: { p },
  } = useRouter()

  const { data: repos } = getAllGithubReposApi()
  const { data: project } = getProjectByIdApi(Number(p))
  const [search, setSearch] = useState('')
  const repoRefs = Array.from({ length: repos?.length }).map((repo) =>
    createRef<HTMLLIElement>()
  )
  // const { data } = getRepoAllContentsApi({
  //   repo: '',
  //   path: '',
  //   branchName: '',
  // })

  const { closeModal } = useUI()
  const { user } = useSession()

  return (
    <div className={s.root} style={style}>
      <div className={s.header}>
        <div className={s.group}>
          <h2>MD</h2>
        </div>
        <div className={s.group}>
          <button onClick={closeModal}>
            <IoCloseOutline />
          </button>
        </div>
      </div>
      <main className={s.main}>
        <div className={cn(s.group, { [s.left]: true })}>
          <input className={s.search} value={search} onChange={() => {}} />
          <ul>
            {!repos && <div>로딩중</div>}
            {repos?.map((repo, i) => (
              <li
                key={i}
                className={cn(s.repo, { [s.selected]: i === 0 })}
                ref={repoRefs[i]}
              >
                {repo.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(s.group, { [s.right]: true })}>
          마크다운 나오는 곳
        </div>
      </main>
    </div>
  )
}

export default CodeView
