import { FC, useCallback, useEffect, useRef, useState } from 'react'
import s from './FindRepoView.module.css'
import { useRouter } from 'next/router'
import { useUI } from '@components/ui/context'
import { SlClose } from 'react-icons/sl'
import { useProject } from '../context'
import Input from '@components/ui/Input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { CiSearch } from 'react-icons/ci'
import { getAllReposApi } from '@lib/apis/github'

type Form = {
  search: string
}

const FindRepoView: FC<any> = (props) => {
  const { inner } = props
  const { data } = getAllReposApi()

  const schema = yup.object({
    search: yup.string(),
  })

  const { control, setFocus, watch, setValue, handleSubmit } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: { search: '' },
  })

  const { closeModal } = useUI()
  const { repo_url, setRepoUrl } = useProject()
  const router = useRouter()

  const [results, setResults] = useState<string[]>([])
  const handleResults = useCallback(
    (val: string) =>
      setResults((res) => res.filter((item) => item.indexOf(val) > -1)),
    [setResults]
  )

  useEffect(() => {
    setFocus('search')
  }, [])

  return (
    <div className={s.modal} {...inner}>
      <div className={s.header}>
        <button className={s.close} onClick={closeModal}>
          <SlClose />
        </button>
        <h2>레포 찾기</h2>
      </div>
      <div className={s.main}>
        <label className={s.input_container}>
          <span className={s.icon}>
            <CiSearch />
          </span>
          <Input control={control} name="search" placeholder="찾기" />
        </label>
        <div className={s.section}>
          <ul className={s.items}>
            {data?.map((repo: any) => (
              <li
                className={s.item}
                key={repo.id}
                onClick={() => {
                  setRepoUrl(repo.full_name)
                  closeModal()
                }}
              >
                {repo.full_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FindRepoView
