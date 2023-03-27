import {
  ChangeEvent,
  createRef,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import s from './MarkdownView.module.css'
import { IoCloseOutline } from 'react-icons/io5'
import { useUI } from '@components/ui/context'
import { useSession } from '@components/common/Layout/context'
import { getAllGithubReposApi, getRepoAllContentsApi } from '@lib/apis/github'
import { useRouter } from 'next/router'
import { getProjectByIdApi } from '@lib/apis/project'
import cn from 'clsx'
import debounce from '@lib/debounce'
import { BsFolder2Open, BsFileCode } from 'react-icons/bs'

const CodeView: FC<any> = (props) => {
  const { style } = props
  const {
    query: { p },
  } = useRouter()

  const { data: _repos } = getAllGithubReposApi()
  const { data: _folders } = getRepoAllContentsApi({
    repo: 'uniswap',
    path: '',
    branchName: '',
  })
  const [repos, setRepos] = useState(_repos)
  const [folders, setFolders] = useState(_repos)

  const { data: project } = getProjectByIdApi(Number(p))

  const [repo, setRepo] = useState('')

  const folderRef = useRef<HTMLInputElement>(null)
  const folderInput = folderRef?.current?.value

  const [folder, setFolder] = useState()
  const folderRefs = Array.from({ length: _repos?.length }).map((repo) =>
    createRef<HTMLLIElement>()
  )
  const { closeModal } = useUI()
  const { user } = useSession()

  const onSearch = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setFolders(() =>
        _repos.filter((repo: any) => repo.name.indexOf(e.target.value) > -1)
      )
    }, 500),
    [_repos]
  )

  useEffect(() => {
    if (_repos) {
      setFolders(_repos)
      setFolder(_repos[0].name)
    }
  }, [_repos])

  useEffect(() => {
    if (folderRef.current && _repos) {
      setFolders(() =>
        _repos.filter(
          (repo: any) => repo.name.indexOf(folderRef?.current?.value) > -1
        )
      )
    }
  }, [folderRef, _repos])

  useEffect(() => {
    folderRef.current?.focus()
  }, [])

  useEffect(() => {
    if (_repos) {
      // 선택된 저장소로 초기화
      setRepo(_repos[0].name)
    }
  }, [_repos])

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
          <label className={s.label}>
            <span className={s.icon}>
              <BsFolder2Open />
            </span>
            <select
              className={s.select_repo}
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
            >
              {_repos?.map((repo: any, i) => (
                <option key={repo.name} value={repo.name}>
                  {repo.name}
                </option>
              ))}
            </select>
          </label>
          <label className={s.label}>
            <span className={s.icon}>
              <BsFileCode />
            </span>
            <input
              ref={folderRef}
              className={s.search}
              onChange={onSearch}
              placeholder="폴더/파일 찾기"
            />
          </label>
          <ul>
            {!folders && <div>로딩중</div>}
            {folders?.map((repo: any, i: number) => (
              <li
                key={i}
                className={cn(s.repo, {
                  [s.selected]: repo.name === folder,
                })}
                onClick={() => setFolder(repo.name)}
                ref={folderRefs[i]}
              >
                {repo.name
                  .replace(folderRef?.current?.value, '!')
                  .split('')
                  .map((char: string, j: number) => {
                    return (
                      <span
                        key={`name.${i}.char.${j}`}
                        className={cn(s.char, {
                          [s.dup]: char === '!',
                        })}
                      >
                        {char === '!' ? folderRef?.current?.value : char}
                      </span>
                    )
                  })}
              </li>
            ))}
            {folders?.length === 0 && (
              <p className={s.empty}>
                '
                {folderInput && folderInput.length > 10
                  ? folderInput.slice(0, 10) + '...'
                  : folderInput}
                '란 폴더/파일이 없어요
              </p>
            )}
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
